import { Shield, Lock, Award, Stethoscope } from "lucide-react";

const badges = [
  {
    icon: Stethoscope,
    title: "Certifierad klinik",
    description: "IVO-registrerad med legitimerade läkare",
  },
  {
    icon: Shield,
    title: "CE-märkta produkter",
    description: "Endast godkända och säkra produkter",
  },
  {
    icon: Lock,
    title: "GDPR-säkert",
    description: "Ditt foto analyseras och raderas direkt",
  },
  {
    icon: Award,
    title: "4.7 / 5 betyg",
    description: "Baserat på Google-recensioner",
  },
];

export function TrustBadges() {
  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{badge.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
