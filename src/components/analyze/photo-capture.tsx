"use client";

import { useRef, useState, useCallback } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { compressImage } from "@/lib/compress-image";

interface PhotoCaptureProps {
  onCapture: (base64: string) => void;
}

export function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  async function startCamera() {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch {
      setCameraError(
        "Kunde inte starta kameran. Kontrollera att du har gett tillåtelse."
      );
    }
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror for selfie
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg", 0.85);
    stopCamera();
    onCapture(base64);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setCameraError("Vänligen välj en bildfil (JPG, PNG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setCameraError("Bilden är för stor. Max 10 MB.");
      return;
    }

    try {
      const compressed = await compressImage(file);
      onCapture(compressed);
    } catch {
      setCameraError("Kunde inte läsa bilden. Försök med en annan fil.");
    }

    // Reset input so same file can be selected again
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      {/* Camera viewfinder */}
      {isCameraActive ? (
        <Card className="overflow-hidden">
          <CardContent className="relative p-0">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <Button
                size="lg"
                onClick={takePhoto}
                className="h-16 w-16 rounded-full"
              >
                <Camera className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={stopCamera}
                className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Camera button - primary action */}
          <Card
            className="cursor-pointer border-dashed border-2 transition-colors hover:border-primary/50 hover:bg-primary/5"
            onClick={startCamera}
          >
            <CardContent className="flex flex-col items-center gap-3 py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Ta en selfie</p>
                <p className="text-sm text-muted-foreground">
                  Använd din kamera för bäst resultat
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                eller
              </span>
            </div>
          </div>

          {/* File upload - secondary action */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Ladda upp en bild
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
        </>
      )}

      {/* Error message */}
      {cameraError && (
        <p className="text-center text-sm text-destructive">{cameraError}</p>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Tips */}
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm font-medium mb-2">Tips för bäst resultat:</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Bra och jämn belysning (helst dagsljus)</li>
          <li>• Inget smink eller filter</li>
          <li>• Ansiktet rakt framifrån</li>
          <li>• Håret bort från ansiktet</li>
        </ul>
      </div>
    </div>
  );
}
