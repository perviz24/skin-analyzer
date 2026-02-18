"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RotateCcw, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface PhotoPreviewProps {
  photo: string;
  onRetake: () => void;
}

export function PhotoPreview({ photo, onRetake }: PhotoPreviewProps) {
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function handleAnalyze() {
    if (!consent) {
      toast.error("Du måste godkänna villkoren för att fortsätta.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: photo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Analysen misslyckades");
      }

      const data = await res.json();

      // Store result in sessionStorage (no database yet)
      sessionStorage.setItem(`analysis-${data.id}`, JSON.stringify(data));
      router.push(`/resultat/${data.id}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Något gick fel. Försök igen.";
      toast.error(message);
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Photo preview */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={photo}
              alt="Din bild för hudanalys"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        </CardContent>
      </Card>

      {/* Retake button */}
      <Button variant="outline" className="w-full gap-2" onClick={onRetake}>
        <RotateCcw className="h-4 w-4" />
        Ta en ny bild
      </Button>

      {/* GDPR Consent */}
      <label className="flex items-start gap-3 cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Jag godkänner att mitt foto analyseras med AI. Bilden sparas inte och
          raderas direkt efter analysen.{" "}
          <span className="text-foreground font-medium">
            Analysen är inte en medicinsk bedömning.
          </span>
        </span>
      </label>

      {/* Analyze button */}
      <Button
        size="lg"
        className="w-full gap-2 text-base"
        disabled={!consent || isAnalyzing}
        onClick={handleAnalyze}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyserar...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Analysera min hud
          </>
        )}
      </Button>
    </div>
  );
}
