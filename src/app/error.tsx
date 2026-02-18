"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Något gick fel
        </h2>
        <p className="mt-2 text-muted-foreground">
          Ett oväntat fel inträffade. Försök igen eller kontakta oss om
          problemet kvarstår.
        </p>
      </div>
      <Button onClick={reset} variant="outline">
        Försök igen
      </Button>
    </div>
  );
}
