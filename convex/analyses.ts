import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    overallScore: v.number(),
    skinAge: v.optional(v.number()),
    summary: v.string(),
    findings: v.array(
      v.object({
        area: v.string(),
        concern: v.string(),
        severity: v.string(),
        description: v.string(),
      })
    ),
    recommendations: v.array(
      v.object({
        treatmentSlug: v.string(),
        reason: v.string(),
        priority: v.string(),
        concerns: v.array(v.string()),
      })
    ),
    positives: v.array(v.string()),
    clinicId: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("analyses", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const getById = query({
  args: { id: v.id("analyses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
