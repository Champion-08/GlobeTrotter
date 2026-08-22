import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const anonymousContext = {
  user: null,
  req: { protocol: "https", headers: {} },
  res: { clearCookie: () => undefined },
} as unknown as TrpcContext;

describe("travel authorization boundaries", () => {
  it("does not expose workspaces or copy operations without a managed session", async () => {
    const caller = appRouter.createCaller(anonymousContext);
    await expect(caller.travel.workspace()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.travel.copyPublicTrip({ slug: "europe-adventure-1" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("does not expose platform statistics to non-admin sessions", async () => {
    const caller = appRouter.createCaller(anonymousContext);
    await expect(caller.admin.statistics()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
