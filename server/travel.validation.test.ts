import { describe, expect, it } from "vitest";
import { workspaceInput } from "./routers";

const validWorkspace = {
  users: { name: "Atlas Traveler", email: "atlas@example.com", interests: ["Culture"], travelStyle: "Balanced", savedDestinations: ["paris"] },
  trips: [{ id: "trip_atlas", name: "Autumn Atlas", startDate: "2026-10-05", endDate: "2026-10-11", budget: 75000, isPublic: false }],
  trip_stops: [{ id: "stop_paris", tripId: "trip_atlas", cityId: "paris", days: [1, 2, 3] }],
  trip_activities: [{ id: "entry_eiffel", stopId: "stop_paris", activityId: "act_eiffel", day: 1, startTime: "10:00" }],
  expenses: [{ id: "expense_hotel", tripId: "trip_atlas", category: "Stay", desc: "Hotel", amount: 12000 }],
};

describe("travel workspace validation", () => {
  it("accepts a valid relational travel workspace payload", () => {
    expect(workspaceInput.parse(validWorkspace).trips[0]?.name).toBe("Autumn Atlas");
  });

  it("rejects invalid activity times and negative budget values", () => {
    const invalid = structuredClone(validWorkspace);
    invalid.trips[0]!.budget = -1;
    invalid.trip_activities[0]!.startTime = "25:72";
    expect(() => workspaceInput.parse(invalid)).toThrow();
  });
});
