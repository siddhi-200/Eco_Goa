
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Loader, MapPin, PackageCheck, Send, Truck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const statuses = [
  { name: 'Request Sent', icon: <Send className="w-5 h-5" /> },
  { name: 'Time Scheduled', icon: <Clock className="w-5 h-5" /> },
  { name: 'Request Accepted', icon: <CheckCircle className="w-5 h-5" /> },
  { name: 'On The Way', icon: <Truck className="w-5 h-5" /> },
  { name: 'Reached', icon: <MapPin className="w-5 h-5" /> },
  { name: 'Collected', icon: <PackageCheck className="w-5 h-5" /> },
  { name: 'Done', icon: <CheckCircle className="w-5 h-5 text-primary" /> },
];

export default function TrackingTimeline() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const collectedImage = PlaceHolderImages.find(p => p.id === "package-collected");

  useEffect(() => {
    if (currentStatusIndex >= statuses.length - 1) return;

    const interval = setInterval(() => {
      setCurrentStatusIndex(prevIndex => {
        if (prevIndex < statuses.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 3000); // Move to next status every 3 seconds

    return () => clearInterval(interval);
  }, [currentStatusIndex]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pickup Status</CardTitle>
        <CardDescription>Follow your waste collection request in real-time.</CardDescription>
        <Separator className="my-4" />
        <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Collection From:</h3>
            <p className="text-muted-foreground">123 Beach Road, Candolim, Goa</p>
            <h3 className="font-semibold mt-2">Upcoming Tasks:</h3>
            <p className="text-muted-foreground">No other tasks scheduled for today.</p>
        </div>
      </CardHeader>
      <CardContent>
        {currentStatusIndex === statuses.length -1 && collectedImage ? (
          <div className="flex flex-col items-center text-center animate-in fade-in">
              <div className="relative w-48 h-48 mb-4">
                <Image 
                    src={collectedImage.imageUrl}
                    alt={collectedImage.description}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={collectedImage.imageHint}
                />
              </div>
              <h3 className="text-xl font-bold text-primary">Collection Complete!</h3>
              <p className="text-muted-foreground">Thank you for helping keep Goa clean.</p>
              <Button asChild className="mt-6">
                <Link href="/schedule-pickup">
                    Schedule Another Pickup
                </Link>
              </Button>
          </div>
        ) : (
            <div className="relative w-full">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
                {statuses.map((status, index) => (
                <div key={status.name} className="flex items-center gap-4 relative">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${index <= currentStatusIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {index < currentStatusIndex ? <CheckCircle className="w-6 h-6" /> : 
                     index === currentStatusIndex ? <Loader className="w-6 h-6 animate-spin" /> : 
                     status.icon
                    }
                    </div>
                    <div>
                        <h4 className={`font-semibold transition-colors duration-300 ${index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{status.name}</h4>
                        <p className={`text-sm transition-colors duration-300 ${index <= currentStatusIndex ? 'text-muted-foreground' : 'text-gray-400'}`}>
                            {index === currentStatusIndex ? 'In Progress...' : index < currentStatusIndex ? 'Completed' : 'Pending'}
                        </p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
