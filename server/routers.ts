import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { adminStatistics, copyPublicTrip, getPublicTrip, getWorkspace, saveWorkspace } from "./db";

export const workspaceInput = z.object({
  users: z.object({ name: z.string().max(180), email: z.string().email().or(z.literal("")), avatar: z.string().max(2048).optional(), interests: z.array(z.string().max(80)).optional(), travelStyle: z.string().max(64).optional(), savedDestinations: z.array(z.string().max(64)).optional(), language: z.string().max(24).optional() }).optional(),
  trips: z.array(z.object({ id: z.string().max(64), name: z.string().min(1).max(200), startDate: z.string().date(), endDate: z.string().date(), budget: z.coerce.number().nonnegative(), description: z.string().max(10000).optional(), coverImg: z.string().max(2048).optional(), travelStyle: z.string().max(64).optional(), interests: z.array(z.string().max(80)).optional(), transportCost: z.coerce.number().nonnegative().optional(), accommodationCost: z.coerce.number().nonnegative().optional(), foodCost: z.coerce.number().nonnegative().optional(), isPublic: z.boolean().optional(), publicSlug: z.string().max(96).optional() })).max(100),
  trip_stops: z.array(z.object({ id: z.string().max(64), tripId: z.string().max(64), cityId: z.string().max(64), days: z.array(z.coerce.number().int().positive()).min(1).max(365), notes: z.string().max(10000).optional() })).max(500),
  trip_activities: z.array(z.object({ id: z.string().max(64), stopId: z.string().max(64), activityId: z.string().max(64), day: z.coerce.number().int().positive(), startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), customCost: z.coerce.number().nonnegative().optional(), notes: z.string().max(10000).optional(), activityOrder: z.coerce.number().int().nonnegative().optional() })).max(3000),
  expenses: z.array(z.object({ id: z.string().max(64), tripId: z.string().max(64), category: z.string().max(32), desc: z.string().max(280).optional(), description: z.string().max(280).optional(), amount: z.coerce.number().nonnegative(), date: z.string().date().optional() })).max(2000).optional(),
  savedDestinations: z.array(z.string().max(64)).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 }); return { success: true } as const; }),
  }),
  travel: router({
    workspace: protectedProcedure.query(({ ctx }) => getWorkspace(ctx.user.id)),
    saveWorkspace: protectedProcedure.input(workspaceInput).mutation(({ ctx, input }) => saveWorkspace(ctx.user.id, input)),
    publicTrip: publicProcedure.input(z.object({ slug: z.string().min(1).max(96) })).query(({ input }) => getPublicTrip(input.slug)),
    copyPublicTrip: protectedProcedure.input(z.object({ slug: z.string().min(1).max(96) })).mutation(({ ctx, input }) => copyPublicTrip(ctx.user.id, input.slug)),
  }),
  admin: router({ statistics: adminProcedure.query(() => adminStatistics()) }),
});

export type AppRouter = typeof appRouter;
