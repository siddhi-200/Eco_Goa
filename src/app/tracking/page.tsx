import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Truck } from "lucide-react";
import Image from "next/image";

const truckPositions = [
  { id: 1, top: '20%', left: '30%', delay: '0s' },
  { id: 2, top: '50%', left: '60%', delay: '1s' },
  { id: 3, top: '75%', left: '40%', delay: '0.5s' },
  { id: 4, top: '35%', left: '75%', delay: '1.5s' },
];

export default function TrackingPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === "goa-map");

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Real-Time Tracking"
        description="Watch our collection fleet at work across Goa."
      />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Live Collection Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-[12/8] rounded-lg overflow-hidden bg-muted">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            
            {truckPositions.map(truck => (
              <div
                key={truck.id}
                className="absolute"
                style={{ top: truck.top, left: truck.left }}
              >
                <div 
                  className="p-2 bg-primary rounded-full shadow-lg animate-pulse"
                  style={{ animationDelay: truck.delay, animationDuration: '2s' }}
                >
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
