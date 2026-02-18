import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Sidan hittades inte
        </h2>
        <p className="mt-2 text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/">Tillbaka till startsidan</Link>
      </Button>
    </div>
  );
}
