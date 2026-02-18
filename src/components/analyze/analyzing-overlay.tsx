"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const steps = [
  "Analyserar hudkvalitet...",
  "Identifierar hudton och textur...",
  "Letar efter förbättringsområden...",
  "Skapar dina rekommendationer...",
];

export function AnalyzingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-full bg-primary/10 animate-pulse" />
        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-spin" style={{ animationDuration: "3s" }} />
      </div>

      {/* Progress text */}
      <p className="text-lg font-semibold mb-2">Analyserar din hud</p>
      <p
        className="text-sm text-muted-foreground transition-opacity duration-500"
        key={currentStep}
      >
        {steps[currentStep]}
      </p>

      {/* Progress dots */}
      <div className="mt-6 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              i <= currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Detta tar vanligtvis 10-20 sekunder
      </p>
    </div>
  );
}
