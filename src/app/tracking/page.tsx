'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Truck } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from 'react';

const initialTrucks = [
  { id: 1, path: [{ top: '20%', left: '30%' }, { top: '25%', left: '45%' }, { top: '35%', left: '50%' }, { top: '50%', left: '40%' }] },
  { id: 2, path: [{ top: '50%', left: '60%' }, { top: '60%', left: '70%' }, { top: '70%', left: '65%' }, { top: '80%', left: '55%' }] },
  { id: 3, path: [{ top: '75%', left: '40%' }, { top: '65%', left: '30%' }, { top: '55%', left: '20%' }, { top: '45%', left: '15%' }] },
  { id: 4, path: [{ top: '35%', left: '75%' }, { top: '25%', left: '85%' }, { top: '15%', left: '70%' }, { top: '20%', left: '60%' }] },
];

export default function TrackingPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === "goa-map");
  const [truckPositions, setTruckPositions] = useState(initialTrucks.map(t => ({ ...t, pathIndex: 0 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPositions(prevPositions => 
        prevPositions.map(truck => {
          const nextIndex = (truck.pathIndex + 1) % truck.path.length;
          return { ...truck, pathIndex: nextIndex };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
            
            {truckPositions.map(truck => {
              const currentPos = truck.path[truck.pathIndex];
              return (
                <div
                  key={truck.id}
                  className="absolute p-2 bg-primary rounded-full shadow-lg transition-all duration-3000 ease-linear"
                  style={{ top: currentPos.top, left: currentPos.left }}
                >
                  <Truck className="w-5 h-5 text-primary-foreground animate-pulse" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
