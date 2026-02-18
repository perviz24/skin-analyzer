"use client";

import { useState } from "react";
import { PhotoCapture } from "@/components/analyze/photo-capture";
import { PhotoPreview } from "@/components/analyze/photo-preview";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalyzeraPage() {
  const [photo, setPhoto] = useState<string | null>(null);

  function handleCapture(base64: string) {
    setPhoto(base64);
  }

  function handleRetake() {
    setPhoto(null);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Back navigation */}
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Tillbaka
        </Link>
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Analysera din hud
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ta en bild eller ladda upp ett foto för att få din personliga
          hudanalys.
        </p>
      </div>

      {photo ? (
        <PhotoPreview
          photo={photo}
          onRetake={handleRetake}
        />
      ) : (
        <PhotoCapture onCapture={handleCapture} />
      )}
    </div>
  );
}
