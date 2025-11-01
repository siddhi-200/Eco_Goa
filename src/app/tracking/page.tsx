
'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Truck, User, Building } from "lucide-react";
import Image from "next/image";
import React from 'react';

const truckPositions = [
  { id: 1, top: '20%', left: '30%', label: 'North Goa Truck 1' },
  { id: 2, top: '50%', left: '60%', label: 'South Goa Truck 1' },
  { id: 3, top: '75%', left: '40%', label: 'South Goa Truck 2' },
  { id: 4, top: '35%', left: '75%', label: 'North Goa Truck 2' },
];

const userLocation = { top: '55%', left: '25%', label: 'Your Location' };

const councilOffices = [
    { id: 1, name: "Panaji Office", top: '40%', left: '35%' },
    { id: 2, name: "Margao Office", top: '65%', left: '50%' },
    { id: 3, name: "Mapusa Office", top: '25%', left: '45%' },
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
            
            {/* Collection Trucks */}
            {truckPositions.map(truck => (
              <div
                key={`truck-${truck.id}`}
                className="absolute group flex flex-col items-center"
                style={{ top: truck.top, left: truck.left }}
              >
                <div className="p-2 bg-primary rounded-full shadow-lg">
                    <Truck className="w-5 h-5 text-primary-foreground animate-pulse" />
                </div>
                <div className="hidden group-hover:block bg-background/80 text-foreground text-xs rounded px-2 py-1 mt-1 whitespace-nowrap shadow-md">
                    {truck.label}
                </div>
              </div>
            ))}

            {/* User Location */}
            <div 
                className="absolute group flex flex-col items-center"
                style={{ top: userLocation.top, left: userLocation.left }}
            >
                <div className="p-2 bg-blue-500 rounded-full shadow-lg ring-4 ring-blue-300 ring-opacity-75">
                    <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden group-hover:block bg-background/80 text-foreground text-xs rounded px-2 py-1 mt-1 whitespace-nowrap shadow-md">
                    {userLocation.label}
                </div>
            </div>

            {/* Municipal Council Offices */}
            {councilOffices.map(office => (
                 <div
                    key={`office-${office.id}`}
                    className="absolute group flex flex-col items-center"
                    style={{ top: office.top, left: office.left }}
                >
                    <div className="p-2 bg-secondary rounded-full shadow-lg">
                        <Building className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div className="hidden group-hover:block bg-background/80 text-foreground text-xs rounded px-2 py-1 mt-1 whitespace-nowrap shadow-md">
                        {office.name}
                    </div>
                </div>
            ))}

          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Legend</h3>
            <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary rounded-full"><Truck className="w-4 h-4 text-primary-foreground"/></div>
                    <span>Collection Truck</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500 rounded-full"><User className="w-4 h-4 text-white"/></div>
                    <span>Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-secondary rounded-full"><Building className="w-4 h-4 text-secondary-foreground"/></div>
                    <span>Municipal Office</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
