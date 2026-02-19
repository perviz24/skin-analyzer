"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Camera, Share2, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ScoreCard } from "@/components/results/score-card";
import { FindingsList } from "@/components/results/findings-list";
import { TreatmentRecommendations } from "@/components/results/treatment-recommendations";
import type { SkinAnalysisResult } from "@/lib/types";

export default function ResultatPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(`analysis-${id}`);
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        // Invalid data
      }
    }
    setLoading(false);
  }, [id]);

  async function handleShare() {
    const text = `Min hudanalys: ${result?.overallScore}/100 - ${result?.summary}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Hudanalys resultat", text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Kopierat till urklipp!");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8 text-center">
        <h1 className="text-xl font-bold mb-2">Resultat hittades inte</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Analysen kan ha gått ut eller så finns den inte längre. Prova att göra
          en ny analys.
        </p>
        <Button asChild>
          <Link href="/analysera">
            <Camera className="mr-2 h-4 w-4" />
            Ny analys
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" className="-ml-2" onClick={() => router.back()}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Tillbaka
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="mr-1 h-4 w-4" />
          Dela
        </Button>
      </div>

      <h1 className="text-2xl font-bold tracking-tight mb-6">
        Ditt resultat
      </h1>

      <div className="space-y-6">
        {/* Demo mode banner */}
        {result.isDemo && (
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
            <FlaskConical className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <span className="font-medium">Demoläge</span> — detta är
              exempeldata. Anslut en AI-nyckel för riktiga analyser.
            </p>
          </div>
        )}
        {/* Score card with summary and positives */}
        <ScoreCard
          overallScore={result.overallScore}
          skinAge={result.skinAge}
          summary={result.summary}
          positives={result.positives}
        />

        {/* Findings */}
        <FindingsList findings={result.findings} />

        {/* Treatment recommendations */}
        <TreatmentRecommendations recommendations={result.recommendations} />

        {/* CTA section */}
        <div className="rounded-lg border bg-primary/5 p-6 text-center">
          <h3 className="font-semibold mb-2">
            Vill du veta mer?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Boka en kostnadsfri konsultation hos RelyOn Beauty Clinic för att
            diskutera dina behandlingsalternativ.
          </p>
          <Button asChild>
            <a
              href="https://www.bokadirekt.se/places/relyon-clinic-56180"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boka konsultation
            </a>
          </Button>
        </div>

        {/* New analysis link */}
        <div className="text-center">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/analysera">
              <Camera className="h-4 w-4" />
              Gör en ny analys
            </Link>
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground">
          Denna analys är inte en medicinsk bedömning. Rådgör alltid med en
          läkare innan behandling.
        </p>
      </div>
    </div>
  );
}
