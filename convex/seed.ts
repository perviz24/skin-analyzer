import { mutation } from "./_generated/server";

// Run: npx convex run seed:seedTreatments
export const seedTreatments = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("treatments").first();
    if (existing) {
      return "Treatments already seeded";
    }

    const bookingUrl =
      "https://www.bokadirekt.se/places/relyon-beauty-clinic-34144";
    const clinicId = "relyon";

    const treatments = [
      {
        name: "Botox",
        slug: "botox",
        description:
          "Rynkbehandling med Botox som slättar ut fina linjer i pannan, kråksparkar och glabellalinjer.",
        concerns: ["fine_lines", "wrinkles", "crow_feet", "forehead_lines", "frown_lines"],
        clinicUrl: "https://relyonclinic.se/botox/",
        bookingUrl,
        priceFrom: 1900,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Fillers",
        slug: "fillers",
        description:
          "Volymgivande behandling med fillers för läppar, kinder, käklinje och nasolabialveck.",
        concerns: ["volume_loss", "nasolabial_folds", "lip_volume", "cheek_volume", "jawline"],
        clinicUrl: "https://relyonclinic.se/fillers/",
        bookingUrl,
        priceFrom: 2500,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Tear Trough",
        slug: "tear-trough",
        description:
          "Behandling av mörka ringar och håligheter under ögonen med fillers.",
        concerns: ["dark_circles", "under_eye_hollows", "under_eye_puffiness"],
        clinicUrl: "https://relyonclinic.se/fillers-under-ogonen/",
        bookingUrl,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Fillers övre ögonlock",
        slug: "fillers-ovre-ogonlock",
        description:
          "Behandling av hålögdhet och skuggor i det övre ögonlocket.",
        concerns: ["upper_eyelid_hollowing"],
        clinicUrl: "https://relyonclinic.se/fillers-ovre-ogonlock/",
        bookingUrl,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Profhilo",
        slug: "profhilo",
        description:
          "Hudföryngrande behandling som förbättrar hudkvalitet, lyster och elasticitet.",
        concerns: ["skin_dullness", "skin_texture", "fine_lines", "dehydration", "elasticity_loss"],
        clinicUrl: "https://relyonclinic.se/profhilo-orebro/",
        bookingUrl,
        priceFrom: 3500,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Sunekos",
        slug: "sunekos",
        description:
          "Stimulerar kollagen och elastin med hyaluronsyra och aminosyror.",
        concerns: ["elasticity_loss", "skin_texture", "skin_dullness", "aging_skin"],
        clinicUrl: "https://relyonclinic.se/sunekos-orebro/",
        bookingUrl,
        category: "injection",
        isActive: true,
        clinicId,
      },
      {
        name: "Microneedling",
        slug: "microneedling",
        description:
          "Hudföryngring som förbättrar hudtextur, ärr, porer och pigmentering.",
        concerns: ["skin_texture", "pores", "pigmentation", "acne_scars", "skin_dullness"],
        clinicUrl: "https://relyonclinic.se/dermapen-microneedling/",
        bookingUrl,
        priceFrom: 2000,
        category: "skincare",
        isActive: true,
        clinicId,
      },
      {
        name: "Plasma Pen",
        slug: "plasma-pen",
        description:
          "Huduppstramning utan kirurgi för slapp hud och fina linjer.",
        concerns: ["skin_laxity", "sagging", "fine_lines"],
        clinicUrl: "https://relyonclinic.se/plasmapen/",
        bookingUrl,
        category: "skincare",
        isActive: true,
        clinicId,
      },
      {
        name: "Lashlift & Browlift",
        slug: "lashlift-browlift",
        description:
          "Lyft och form för ögonfransar och ögonbryn.",
        concerns: ["brow_drooping"],
        clinicUrl: "https://relyonclinic.se/lashlift-browlift-orebro/",
        bookingUrl,
        category: "cosmetic",
        isActive: true,
        clinicId,
      },
    ];

    for (const treatment of treatments) {
      await ctx.db.insert("treatments", treatment);
    }

    return `Seeded ${treatments.length} treatments for ${clinicId}`;
  },
});
