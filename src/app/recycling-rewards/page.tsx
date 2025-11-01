
'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Gift, Lightbulb, Ticket, Smartphone, UtensilsCrossed, IndianRupee, ShoppingBag, Plane, Trophy } from "lucide-react";
import RecyclingForm from "./recycling-form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const rewards = [
    {
      name: "Free Movie Ticket",
      points: 750,
      partner: "INOX Cinemas",
      icon: <Ticket className="w-6 h-6 text-rose-500" />,
    },
    {
      name: "₹100 Cashback",
      points: 1000,
      partner: "via UPI",
      icon: <IndianRupee className="w-6 h-6 text-green-600" />,
    },
    {
      name: "5GB Mobile Data Pack",
      points: 1200,
      partner: "Jio/Airtel/Vi",
      icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "₹150 Food Delivery Voucher",
      points: 1500,
      partner: "Swiggy/Zomato",
      icon: <UtensilsCrossed className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "₹250 Shopping Coupon",
      points: 2000,
      partner: "Myntra/Ajio",
      icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
    },
  ];
  
  const facts = [
    "Recycling one aluminum can saves enough energy to run a TV for three hours.",
    "The energy saved from recycling one glass bottle can light a 100-watt bulb for four hours.",
    "Recycling paper uses 60% less energy than manufacturing it from raw materials.",
  ];

export default function RecyclingRewardsPage() {
    const { toast } = useToast();
    const userPoints = 1250;

    const handleRedeem = (rewardName: string, points: number) => {
        toast({
            title: "Reward Redeemed!",
            description: `You've successfully claimed your ${rewardName} for ${points} points.`,
        });
        // In a real app, you would deduct the points from the user's account here.
    }

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Recycling Rewards"
        description="Earn points by recycling correctly. Your points can be redeemed for rewards."
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecyclingForm />
        </div>
        <div className="space-y-8">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="text-accent fill-accent" />
                Your Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold">{userPoints.toLocaleString()}</p>
              <p className="text-muted-foreground mt-2">Keep up the great work! You're making a real difference in Goa.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Trophy className="w-8 h-8"/>
                    <span>Grand Prize</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Plane className="w-12 h-12" />
                    <div>
                        <h3 className="text-xl font-bold">Win a Trip!</h3>
                        <p className="text-sm opacity-90">The user with the most points at the end of the month wins an all-inclusive trip for two!</p>
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="text-primary"/>
                    Available Rewards
                </CardTitle>
                <CardDescription>Use your points to claim these offers.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {rewards.map(reward => (
                        <li key={reward.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                {reward.icon}
                                <div>
                                    <p className="font-semibold">{reward.name}</p>
                                    <p className="text-sm text-muted-foreground">{reward.partner}</p>
                                </div>
                            </div>

                             <AlertDialog>
                                <AlertDialogTrigger asChild disabled={userPoints < reward.points}>
                                    <Button variant="secondary" size="sm">
                                        {reward.points} pts
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Redeem {reward.name}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will deduct {reward.points} points from your balance. Are you sure you want to proceed?
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Save for Later</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRedeem(reward.name, reward.points)}>
                                        Yes, Redeem Now
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-yellow-400"/>
                    Recycling Facts
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {facts.map((fact, index) => (
                    <p key={index} className="text-sm text-muted-foreground italic">"{fact}"</p>
                ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
