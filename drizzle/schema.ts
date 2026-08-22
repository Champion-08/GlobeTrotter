import {
  boolean,
  date,
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * GlobeTrotter relational model. Authentication is supplied by the managed OAuth
 * session; personal and travel data is owned by this application database.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  profilePhoto: text("profilePhoto"),
  language: varchar("language", { length: 24 }).default("en"),
  travelStyle: varchar("travelStyle", { length: 64 }).default("Balanced"),
  interests: text("interests"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const cities = mysqlTable("cities", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  country: varchar("country", { length: 160 }).notNull(),
  region: varchar("region", { length: 120 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  costIndex: int("costIndex").notNull(),
  popularity: decimal("popularity", { precision: 4, scale: 1 }).notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [
  index("cities_country_idx").on(table.country),
  index("cities_region_idx").on(table.region),
  index("cities_popularity_idx").on(table.popularity),
]);

export const activities = mysqlTable("activities", {
  id: varchar("id", { length: 64 }).primaryKey(),
  cityId: varchar("cityId", { length: 64 }).notNull().references(() => cities.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 80 }).notNull(),
  estimatedCost: decimal("estimatedCost", { precision: 12, scale: 2 }).notNull(),
  durationMinutes: int("durationMinutes").notNull(),
  image: text("image"),
  popularity: decimal("popularity", { precision: 4, scale: 1 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [
  index("activities_city_idx").on(table.cityId),
  index("activities_category_idx").on(table.category),
]);

export const trips = mysqlTable("trips", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  startDate: date("startDate", { mode: "string" }).notNull(),
  endDate: date("endDate", { mode: "string" }).notNull(),
  budget: decimal("budget", { precision: 12, scale: 2 }).notNull(),
  coverPhoto: text("coverPhoto"),
  status: mysqlEnum("status", ["planning", "upcoming", "completed", "archived"]).default("planning").notNull(),
  travelStyle: varchar("travelStyle", { length: 64 }).default("Balanced"),
  interests: text("interests"),
  transportCost: decimal("transportCost", { precision: 12, scale: 2 }).default("0").notNull(),
  accommodationCost: decimal("accommodationCost", { precision: 12, scale: 2 }).default("0").notNull(),
  foodCost: decimal("foodCost", { precision: 12, scale: 2 }).default("0").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  publicSlug: varchar("publicSlug", { length: 96 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("trips_owner_idx").on(table.userId),
  index("trips_public_idx").on(table.isPublic),
]);

export const tripStops = mysqlTable("trip_stops", {
  id: varchar("id", { length: 64 }).primaryKey(),
  tripId: varchar("tripId", { length: 64 }).notNull().references(() => trips.id, { onDelete: "cascade" }),
  cityId: varchar("cityId", { length: 64 }).notNull().references(() => cities.id),
  arrivalDate: date("arrivalDate", { mode: "string" }).notNull(),
  departureDate: date("departureDate", { mode: "string" }).notNull(),
  stopOrder: int("stopOrder").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("trip_stops_trip_idx").on(table.tripId),
  uniqueIndex("trip_stops_order_uq").on(table.tripId, table.stopOrder),
]);

export const itineraryActivities = mysqlTable("itinerary_activities", {
  id: varchar("id", { length: 64 }).primaryKey(),
  tripStopId: varchar("tripStopId", { length: 64 }).notNull().references(() => tripStops.id, { onDelete: "cascade" }),
  activityId: varchar("activityId", { length: 64 }).notNull().references(() => activities.id),
  date: date("date", { mode: "string" }).notNull(),
  startTime: varchar("startTime", { length: 8 }).notNull(),
  endTime: varchar("endTime", { length: 8 }),
  customCost: decimal("customCost", { precision: 12, scale: 2 }),
  notes: text("notes"),
  activityOrder: int("activityOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [
  index("itinerary_stop_idx").on(table.tripStopId),
  index("itinerary_date_idx").on(table.date),
]);

export const expenses = mysqlTable("expenses", {
  id: varchar("id", { length: 64 }).primaryKey(),
  tripId: varchar("tripId", { length: 64 }).notNull().references(() => trips.id, { onDelete: "cascade" }),
  category: mysqlEnum("category", ["Transport", "Stay", "Food", "Activities", "Shopping", "Other"]).notNull(),
  description: varchar("description", { length: 280 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 8 }).default("INR").notNull(),
  expenseDate: date("expenseDate", { mode: "string" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [index("expenses_trip_idx").on(table.tripId)]);

export const savedDestinations = mysqlTable("saved_destinations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  cityId: varchar("cityId", { length: 64 }).notNull().references(() => cities.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [uniqueIndex("saved_destination_uq").on(table.userId, table.cityId)]);

export const sharedTrips = mysqlTable("shared_trips", {
  id: varchar("id", { length: 64 }).primaryKey(),
  tripId: varchar("tripId", { length: 64 }).notNull().references(() => trips.id, { onDelete: "cascade" }),
  sharedByUserId: int("sharedByUserId").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessType: mysqlEnum("accessType", ["public", "link"]).default("public").notNull(),
  shareToken: varchar("shareToken", { length: 96 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [uniqueIndex("shared_trip_one_per_trip").on(table.tripId)]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
