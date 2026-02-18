import { query } from "./_generated/server";
import { v } from "convex/values";

export const listByClinic = query({
  args: { clinicId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("treatments")
      .withIndex("by_clinic", (q) => q.eq("clinicId", args.clinicId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string(), clinicId: v.string() },
  handler: async (ctx, args) => {
    const treatments = await ctx.db
      .query("treatments")
      .withIndex("by_clinic", (q) => q.eq("clinicId", args.clinicId))
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    return treatments;
  },
});
