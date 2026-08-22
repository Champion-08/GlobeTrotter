import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  activities,
  cities,
  expenses,
  InsertUser,
  itineraryActivities,
  savedDestinations,
  sharedTrips,
  tripStops,
  trips,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) {
      console.warn("[Database] Failed to connect:", error);
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { ...user, lastSignedIn: user.lastSignedIn ?? new Date() };
  if (!values.role && user.openId === ENV.ownerOpenId) values.role = "admin";
  await db.insert(users).values(values).onDuplicateKeyUpdate({
    set: { name: values.name ?? null, email: values.email ?? null, loginMethod: values.loginMethod ?? null, lastSignedIn: new Date() },
  });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

const citySeed = [
  ["paris", "Paris", "France", "Europe", 48.8566, 2.3522, 3, 4.8, "/manus-storage/paris-rome-corridor_fef25fc1.png"],
  ["rome", "Rome", "Italy", "Europe", 41.9028, 12.4964, 2, 4.9, "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"],
  ["florence", "Florence", "Italy", "Europe", 43.7696, 11.2558, 2, 4.7, "/manus-storage/florence-discovery_2cb08a47.png"],
  ["tokyo", "Tokyo", "Japan", "Asia", 35.6762, 139.6503, 3, 4.9, "/manus-storage/tokyo-discovery_4628bc6b.png"],
  ["mumbai", "Mumbai", "India", "Asia", 19.0760, 72.8777, 2, 4.6, "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80"],
  ["dubai", "Dubai", "United Arab Emirates", "Middle East", 25.2048, 55.2708, 3, 4.7, "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"],
  ["barcelona", "Barcelona", "Spain", "Europe", 41.3874, 2.1686, 2, 4.8, "https://images.unsplash.com/photo-1583422409516-2915074ebd21?auto=format&fit=crop&w=800&q=80"],
] as const;

const activitySeed = [
  ["act_eiffel", "paris", "Eiffel Tower Climb", "Culture", 1500, 120, 4.8], ["act_louvre", "paris", "Louvre Guided Tour", "Culture", 2000, 180, 4.7], ["act_seine", "paris", "Seine River Cruise", "Culture", 1800, 90, 4.6], ["act_pastry", "paris", "French Pastry Walk", "Food", 1200, 120, 4.8],
  ["act_colosseum", "rome", "Colosseum & Forum", "Culture", 2200, 180, 4.9], ["act_vatican", "rome", "Vatican Museums", "Culture", 2500, 240, 4.8], ["act_trastevere", "rome", "Trastevere Food Tour", "Food", 4000, 180, 4.9], ["act_trevi", "rome", "Trevi & Pantheon Walk", "Culture", 0, 120, 4.8],
  ["act_uffizi", "florence", "Uffizi Gallery", "Culture", 2400, 180, 4.8], ["act_duomo", "florence", "Duomo Dome Climb", "Adventure", 1800, 120, 4.9],
  ["act_shibuya", "tokyo", "Shibuya Crossing Walk", "Culture", 0, 90, 4.7], ["act_skytree", "tokyo", "Tokyo Skytree", "Sightseeing", 2100, 120, 4.8], ["act_sensoji", "tokyo", "Senso-ji Temple", "Culture", 0, 120, 4.8], ["act_tsukiji", "tokyo", "Tsukiji Market Tour", "Food", 1800, 150, 4.8],
  ["act_gateway", "mumbai", "Gateway of India Walk", "Culture", 0, 90, 4.6], ["act_bandra", "mumbai", "Bandra Food Trail", "Food", 1300, 150, 4.7],
  ["act_burj", "dubai", "Burj Khalifa Observation", "Sightseeing", 4200, 120, 4.8], ["act_desert", "dubai", "Desert Safari", "Adventure", 5500, 300, 4.8],
] as const;

export async function ensureCatalogSeed() {
  const db = await getDb();
  if (!db) return;
  for (const [id, name, country, region, latitude, longitude, costIndex, popularity, image] of citySeed) {
    await db.insert(cities).values({ id, name, country, region, latitude: String(latitude), longitude: String(longitude), costIndex, popularity: String(popularity), description: `${name} travel essentials curated by GlobeTrotter.`, image }).onDuplicateKeyUpdate({ set: { name, country, region, costIndex, popularity: String(popularity), image } });
  }
  for (const [id, cityId, name, category, estimatedCost, durationMinutes, popularity] of activitySeed) {
    await db.insert(activities).values({ id, cityId, name, category, estimatedCost: String(estimatedCost), durationMinutes, popularity: String(popularity), description: `A curated ${category.toLowerCase()} experience in ${cityId}.`, image: null }).onDuplicateKeyUpdate({ set: { name, category, estimatedCost: String(estimatedCost), durationMinutes, popularity: String(popularity) } });
  }
}

async function ensureUserDemoTrip(userId: number) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select({ id: trips.id }).from(trips).where(eq(trips.userId, userId)).limit(1);
  if (existing.length) return;
  const tripId = `demo_europe_${userId}`;
  const parisStop = `demo_paris_${userId}`;
  const romeStop = `demo_rome_${userId}`;
  await db.transaction(async tx => {
    await tx.insert(trips).values({ id: tripId, userId, name: "Europe Adventure", description: "An editable six-day food and culture journey through Paris and Rome.", startDate: "2026-09-10", endDate: "2026-09-15", budget: "60000", coverPhoto: "/manus-storage/paris-rome-corridor_fef25fc1.png", status: "upcoming", travelStyle: "Balanced", interests: JSON.stringify(["Culture", "Food", "Adventure"]), transportCost: "15000", accommodationCost: "25000", foodCost: "12000", isPublic: true, publicSlug: `europe-adventure-${userId}` });
    await tx.insert(tripStops).values([
      { id: parisStop, tripId, cityId: "paris", arrivalDate: "2026-09-10", departureDate: "2026-09-11", stopOrder: 0 },
      { id: romeStop, tripId, cityId: "rome", arrivalDate: "2026-09-12", departureDate: "2026-09-15", stopOrder: 1 },
    ]);
    await tx.insert(itineraryActivities).values([
      { id: `demo_eiffel_${userId}`, tripStopId: parisStop, activityId: "act_eiffel", date: "2026-09-10", startTime: "10:00", activityOrder: 0 },
      { id: `demo_louvre_${userId}`, tripStopId: parisStop, activityId: "act_louvre", date: "2026-09-10", startTime: "14:00", activityOrder: 1 },
      { id: `demo_colosseum_${userId}`, tripStopId: romeStop, activityId: "act_colosseum", date: "2026-09-12", startTime: "14:00", activityOrder: 0 },
      { id: `demo_vatican_${userId}`, tripStopId: romeStop, activityId: "act_vatican", date: "2026-09-13", startTime: "10:00", activityOrder: 0 },
    ]);
    await tx.insert(expenses).values([
      { id: `demo_hotel_${userId}`, tripId, category: "Stay", description: "Paris and Rome accommodation", amount: "25000", currency: "INR", expenseDate: "2026-09-10" },
      { id: `demo_transit_${userId}`, tripId, category: "Transport", description: "Flights and intercity transit", amount: "15000", currency: "INR", expenseDate: "2026-09-10" },
    ]);
    await tx.insert(savedDestinations).values([{ id: `saved_${userId}_paris`, userId, cityId: "paris" }, { id: `saved_${userId}_tokyo`, userId, cityId: "tokyo" }]);
  });
}

const asNumber = (value: unknown) => Number(value ?? 0);
const dateOffset = (start: string, day: number) => {
  const d = new Date(`${start}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + Math.max(0, day - 1)); return d.toISOString().slice(0, 10);
};

export async function getWorkspace(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await ensureCatalogSeed();
  await ensureUserDemoTrip(userId);
  const [profile] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const catalogCities = await db.select().from(cities).orderBy(desc(cities.popularity));
  const catalogActivities = await db.select().from(activities).orderBy(desc(activities.popularity));
  const ownerTrips = await db.select().from(trips).where(eq(trips.userId, userId)).orderBy(asc(trips.startDate));
  const tripIds = ownerTrips.map(trip => trip.id);
  const stops = tripIds.length ? await db.select().from(tripStops).where(inArray(tripStops.tripId, tripIds)).orderBy(asc(tripStops.stopOrder)) : [];
  const stopIds = stops.map(stop => stop.id);
  const scheduled = stopIds.length ? await db.select().from(itineraryActivities).where(inArray(itineraryActivities.tripStopId, stopIds)).orderBy(asc(itineraryActivities.activityOrder)) : [];
  const costRows = tripIds.length ? await db.select().from(expenses).where(inArray(expenses.tripId, tripIds)) : [];
  const saved = await db.select().from(savedDestinations).where(eq(savedDestinations.userId, userId));
  const cityMap = Object.fromEntries(catalogCities.map(city => [city.id, { id: city.id, name: city.name, country: city.country, rating: asNumber(city.popularity), costIndex: city.costIndex, popularity: asNumber(city.popularity), img: city.image }]));
  const stopLookup = Object.fromEntries(stops.map(stop => [stop.id, stop]));
  const tripLookup = Object.fromEntries(ownerTrips.map(trip => [trip.id, trip]));
  return {
    profile: { name: profile?.name ?? "Traveler", email: profile?.email ?? "", avatar: profile?.profilePhoto ?? "", interests: JSON.parse(profile?.interests ?? "[]"), travelStyle: profile?.travelStyle ?? "Balanced", language: profile?.language ?? "en" },
    cities: cityMap,
    activities: catalogActivities.map(activity => ({ id: activity.id, cityId: activity.cityId, name: activity.name, category: activity.category, duration: activity.durationMinutes / 60, cost: asNumber(activity.estimatedCost), rating: asNumber(activity.popularity), img: activity.image, description: activity.description })),
    trips: ownerTrips.map(trip => ({ id: trip.id, name: trip.name, startDate: trip.startDate, endDate: trip.endDate, daysCount: Math.max(1, Math.round((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000) + 1), budget: asNumber(trip.budget), description: trip.description ?? "", coverImg: trip.coverPhoto ?? "", travelStyle: trip.travelStyle ?? "Balanced", interests: JSON.parse(trip.interests ?? "[]"), isPublic: trip.isPublic, stats: { views: 0, likes: 0 }, transportCost: asNumber(trip.transportCost), accommodationCost: asNumber(trip.accommodationCost), foodCost: asNumber(trip.foodCost), publicSlug: trip.publicSlug })),
    trip_stops: stops.map(stop => { const trip = tripLookup[stop.tripId]; const firstDay = Math.round((new Date(stop.arrivalDate).getTime() - new Date(trip.startDate).getTime()) / 86400000) + 1; const lastDay = Math.round((new Date(stop.departureDate).getTime() - new Date(trip.startDate).getTime()) / 86400000) + 1; return { id: stop.id, tripId: stop.tripId, cityId: stop.cityId, days: Array.from({ length: Math.max(1, lastDay - firstDay + 1) }, (_, index) => firstDay + index), notes: stop.notes ?? "" }; }),
    trip_activities: scheduled.map(item => { const stop = stopLookup[item.tripStopId]; const trip = tripLookup[stop.tripId]; const day = Math.round((new Date(item.date).getTime() - new Date(trip.startDate).getTime()) / 86400000) + 1; return { id: item.id, stopId: item.tripStopId, activityId: item.activityId, day, startTime: item.startTime, customCost: item.customCost ? asNumber(item.customCost) : undefined, notes: item.notes ?? "" }; }),
    expenses: costRows.map(row => ({ id: row.id, tripId: row.tripId, category: row.category.toLowerCase(), desc: row.description, amount: asNumber(row.amount), date: row.expenseDate })),
    savedDestinations: saved.map(item => item.cityId),
  };
}

export async function saveWorkspace(userId: number, state: any) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.transaction(async tx => {
    if (state.users) await tx.update(users).set({ name: state.users.name, email: state.users.email, profilePhoto: state.users.avatar ?? null, travelStyle: state.users.travelStyle ?? "Balanced", interests: JSON.stringify(state.users.interests ?? []), language: state.users.language ?? "en" }).where(eq(users.id, userId));
    await tx.delete(savedDestinations).where(eq(savedDestinations.userId, userId));
    await tx.delete(trips).where(eq(trips.userId, userId));
    for (const cityId of state.users?.savedDestinations ?? state.savedDestinations ?? []) await tx.insert(savedDestinations).values({ id: `saved_${userId}_${cityId}`, userId, cityId }).onDuplicateKeyUpdate({ set: { cityId } });
    for (const trip of state.trips ?? []) {
      const tripId = String(trip.id);
      await tx.insert(trips).values({ id: tripId, userId, name: trip.name, description: trip.description ?? null, startDate: trip.startDate, endDate: trip.endDate, budget: String(trip.budget ?? 0), coverPhoto: trip.coverImg ?? null, status: "planning", travelStyle: trip.travelStyle ?? "Balanced", interests: JSON.stringify(trip.interests ?? []), transportCost: String(trip.transportCost ?? 0), accommodationCost: String(trip.accommodationCost ?? 0), foodCost: String(trip.foodCost ?? 0), isPublic: Boolean(trip.isPublic), publicSlug: trip.isPublic ? (trip.publicSlug ?? `trip-${tripId}`) : null });
      const scopedStops = (state.trip_stops ?? []).filter((stop: any) => stop.tripId === tripId);
      for (const [order, stop] of scopedStops.entries()) {
        const days = [...(stop.days ?? [1])].sort((a, b) => a - b);
        await tx.insert(tripStops).values({ id: String(stop.id), tripId, cityId: stop.cityId, arrivalDate: dateOffset(trip.startDate, days[0] ?? 1), departureDate: dateOffset(trip.startDate, days.at(-1) ?? 1), stopOrder: order, notes: stop.notes ?? null });
      }
      for (const item of (state.trip_activities ?? [])) if (scopedStops.some((stop: any) => String(stop.id) === String(item.stopId))) await tx.insert(itineraryActivities).values({ id: String(item.id), tripStopId: String(item.stopId), activityId: item.activityId, date: dateOffset(trip.startDate, item.day ?? 1), startTime: item.startTime ?? "10:00", customCost: item.customCost !== undefined ? String(item.customCost) : null, notes: item.notes ?? null, activityOrder: item.activityOrder ?? 0 });
      for (const expense of (state.expenses ?? []).filter((entry: any) => entry.tripId === tripId)) await tx.insert(expenses).values({ id: String(expense.id), tripId, category: normalizeExpenseCategory(expense.category), description: expense.desc ?? expense.description ?? "Trip expense", amount: String(expense.amount ?? 0), currency: "INR", expenseDate: expense.date ?? null });
    }
  });
  return getWorkspace(userId);
}

function normalizeExpenseCategory(category: string) {
  const normalized = String(category ?? "Other").toLowerCase();
  if (normalized === "accommodation" || normalized === "stay") return "Stay" as const;
  if (normalized === "transport" || normalized === "transportation") return "Transport" as const;
  if (normalized === "food") return "Food" as const;
  if (normalized === "activities") return "Activities" as const;
  if (normalized === "shopping") return "Shopping" as const;
  return "Other" as const;
}

export async function getPublicTrip(slug: string) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const [trip] = await db.select().from(trips).where(and(eq(trips.publicSlug, slug), eq(trips.isPublic, true))).limit(1);
  if (!trip) return null;
  const owner = await db.select().from(users).where(eq(users.id, trip.userId)).limit(1);
  const stops = await db.select().from(tripStops).where(eq(tripStops.tripId, trip.id)).orderBy(asc(tripStops.stopOrder));
  const ids = stops.map(stop => stop.id);
  const entries = ids.length ? await db.select().from(itineraryActivities).where(inArray(itineraryActivities.tripStopId, ids)) : [];
  const cityIds = stops.map(stop => stop.cityId);
  const activityIds = entries.map(entry => entry.activityId);
  const publicCities = cityIds.length ? await db.select().from(cities).where(inArray(cities.id, cityIds)) : [];
  const publicActivities = activityIds.length ? await db.select().from(activities).where(inArray(activities.id, activityIds)) : [];
  return { trip, owner: owner[0], stops, entries, cities: publicCities, activities: publicActivities };
}

export async function copyPublicTrip(userId: number, slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const source = await getPublicTrip(slug);
  if (!source) throw new Error("Public trip not found");
  const sourceExpenses = await db.select().from(expenses).where(eq(expenses.tripId, source.trip.id));
  const copyId = `copy_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`;
  const stopIds = new Map(source.stops.map(stop => [stop.id, `stop_${crypto.randomUUID().replaceAll("-", "").slice(0, 18)}`]));
  await db.transaction(async tx => {
    await tx.insert(trips).values({
      id: copyId, userId, name: `${source.trip.name} (Copy)`, description: source.trip.description, startDate: source.trip.startDate, endDate: source.trip.endDate,
      budget: source.trip.budget, coverPhoto: source.trip.coverPhoto, status: "planning", travelStyle: source.trip.travelStyle, interests: source.trip.interests,
      transportCost: source.trip.transportCost, accommodationCost: source.trip.accommodationCost, foodCost: source.trip.foodCost, isPublic: false,
    });
    for (const stop of source.stops) await tx.insert(tripStops).values({ id: stopIds.get(stop.id)!, tripId: copyId, cityId: stop.cityId, arrivalDate: stop.arrivalDate, departureDate: stop.departureDate, stopOrder: stop.stopOrder, notes: stop.notes });
    for (const entry of source.entries) await tx.insert(itineraryActivities).values({ id: `entry_${crypto.randomUUID().replaceAll("-", "").slice(0, 18)}`, tripStopId: stopIds.get(entry.tripStopId)!, activityId: entry.activityId, date: entry.date, startTime: entry.startTime, endTime: entry.endTime, customCost: entry.customCost, notes: entry.notes, activityOrder: entry.activityOrder });
    for (const expense of sourceExpenses) await tx.insert(expenses).values({ id: `expense_${crypto.randomUUID().replaceAll("-", "").slice(0, 18)}`, tripId: copyId, category: expense.category, description: expense.description, amount: expense.amount, currency: expense.currency, expenseDate: expense.expenseDate });
  });
  return getWorkspace(userId);
}

export async function adminStatistics() {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const allUsers = await db.select().from(users); const allTrips = await db.select().from(trips); const catalog = await db.select().from(cities).orderBy(desc(cities.popularity)).limit(5);
  return { totalUsers: allUsers.length, totalTrips: allTrips.length, publicTrips: allTrips.filter(trip => trip.isPublic).length, topCities: catalog.map(city => ({ name: city.name, popularity: asNumber(city.popularity) })) };
}
