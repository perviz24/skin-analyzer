import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Om Hudanalys</h3>
            <p className="text-sm text-muted-foreground">
              AI-driven hudanalys som ger personliga behandlingsrekommendationer
              baserat på din hud.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">RelyOn Beauty Clinic</h3>
            <p className="text-sm text-muted-foreground">
              Certifierad skönhetsklinik i Örebro. IVO-registrerad med
              legitimerade läkare.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Kontakt</h3>
            <p className="text-sm text-muted-foreground">
              Tel: 019-675 4646
              <br />
              relyonclinic.se
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground md:flex-row">
          <p>
            Denna analys är inte en medicinsk bedömning. Rådgör alltid med en
            läkare innan behandling.
          </p>
          <p>
            &copy; {new Date().getFullYear()} RelyOn Beauty Clinic. Alla
            rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
