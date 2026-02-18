import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  treatments: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    concerns: v.array(v.string()),
    clinicUrl: v.string(),
    bookingUrl: v.string(),
    priceFrom: v.optional(v.number()),
    category: v.string(),
    isActive: v.boolean(),
    clinicId: v.string(),
  }).index("by_clinic", ["clinicId"]),

  analyses: defineTable({
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
    createdAt: v.number(),
  }).index("by_clinic", ["clinicId"]),
});
