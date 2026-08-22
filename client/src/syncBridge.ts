/**
 * GlobeTrotter persistence bridge. The existing interaction-rich vanilla UI is
 * retained while this module delegates identity and durable travel state to the
 * protected tRPC backend rather than treating browser storage as the source of truth.
 */
import { startLogin } from "./const";

type TrpcEnvelope<T> = { result?: { data?: { json?: T } }; error?: { json?: { message?: string } } };

async function query<T>(path: string, input?: unknown): Promise<T> {
  const suffix = input === undefined ? "" : `?input=${encodeURIComponent(JSON.stringify({ json: input }))}`;
  const response = await fetch(`/api/trpc/${path}${suffix}`, { credentials: "include" });
  const body = await response.json() as TrpcEnvelope<T>;
  if (!response.ok || body.error) throw new Error(body.error?.json?.message ?? "Request failed");
  return body.result?.data?.json as T;
}

async function mutate<T>(path: string, input?: unknown): Promise<T> {
  const response = await fetch(`/api/trpc/${path}`, {
    method: "POST", credentials: "include", headers: { "content-type": "application/json" },
    body: JSON.stringify({ json: input ?? null }),
  });
  const body = await response.json() as TrpcEnvelope<T>;
  if (!response.ok || body.error) throw new Error(body.error?.json?.message ?? "Request failed");
  return body.result?.data?.json as T;
}

function applyWorkspace(workspace: any) {
  const existing = window.GlobeTrotterDB.get();
  const data = {
    ...existing,
    users: { ...existing.users, ...workspace.profile, savedDestinations: workspace.savedDestinations ?? [] },
    cities: workspace.cities,
    activities: workspace.activities,
    trips: workspace.trips,
    trip_stops: workspace.trip_stops,
    trip_activities: workspace.trip_activities,
    expenses: workspace.expenses ?? [],
  };
  window.GlobeTrotterDB.replace(data);
}

let pendingSave: ReturnType<typeof setTimeout> | undefined;

window.GlobeTrotterAuth = { start: startLogin };
window.GlobeTrotterSync = {
  persist(data: unknown) {
    if (pendingSave) clearTimeout(pendingSave);
    pendingSave = setTimeout(async () => {
      try { await mutate("travel.saveWorkspace", data); }
      catch (error) { console.error("[GlobeTrotter] Data was not saved to the server", error); window.showToast?.("Could not save your latest change. Please try again.", "error"); }
    }, 450);
  },
  async logout() {
    try { await mutate("auth.logout"); } finally { localStorage.removeItem("globetrotter_logged_in"); localStorage.removeItem("globetrotter_current_user"); }
  },
  publicTrip(slug: string) { return query("travel.publicTrip", { slug }); },
  async copyPublicTrip(slug: string) { const workspace = await mutate<any>("travel.copyPublicTrip", { slug }); applyWorkspace(workspace); return workspace; },
  adminStatistics() { return query("admin.statistics"); },
};

async function initializePersistentWorkspace() {
  try {
    const user = await query<any>("auth.me");
    if (!user) {
      localStorage.removeItem("globetrotter_logged_in");
      localStorage.removeItem("globetrotter_current_user");
      if (!window.location.hash.startsWith("#public/")) {
        window.location.hash = "#login";
        window.router?.resolve();
      }
      return;
    }
    localStorage.setItem("globetrotter_logged_in", "true");
    localStorage.setItem("globetrotter_current_user", JSON.stringify({ name: user.name, email: user.email }));
    const workspace = await query<any>("travel.workspace");
    applyWorkspace(workspace);
    if (window.location.hash === "#login" || window.location.hash === "#register" || !window.location.hash) window.location.hash = "#dashboard";
    else window.router?.resolve();
    const pendingPublicCopy = sessionStorage.getItem("globetrotter_pending_public_copy");
    if (pendingPublicCopy) {
      sessionStorage.removeItem("globetrotter_pending_public_copy");
      const copiedWorkspace = await mutate<any>("travel.copyPublicTrip", { slug: pendingPublicCopy });
      applyWorkspace(copiedWorkspace);
      window.location.hash = "#my-trips";
    }
  } catch (error) {
    // Anonymous visitors remain on the distinctive protected-entry screen.
    console.info("[GlobeTrotter] Awaiting secure sign in");
  }
}

initializePersistentWorkspace();

declare global {
  interface Window {
    GlobeTrotterDB: { get: () => any; replace: (data: any) => void };
    GlobeTrotterSync: { persist: (data: unknown) => void; logout: () => Promise<void>; publicTrip: (slug: string) => Promise<unknown>; copyPublicTrip: (slug: string) => Promise<any>; adminStatistics: () => Promise<any> };
    GlobeTrotterAuth: { start: () => void };
    router: { resolve: () => void };
    showToast?: (message: string, type?: string) => void;
  }
}
