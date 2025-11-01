
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Gift, Lightbulb, Ticket, Smartphone, UtensilsCrossed } from "lucide-react";
import RecyclingForm from "./recycling-form";

const rewards = [
    {
      name: "Free Movie Ticket",
      points: 750,
      partner: "INOX Cinemas",
      icon: <Ticket className="w-6 h-6 text-rose-500" />,
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
  ];
  
  const facts = [
    "Recycling one aluminum can saves enough energy to run a TV for three hours.",
    "The energy saved from recycling one glass bottle can light a 100-watt bulb for four hours.",
    "Recycling paper uses 60% less energy than manufacturing it from raw materials.",
  ];

export default function RecyclingRewardsPage() {
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
              <p className="text-5xl font-bold">1,250</p>
              <p className="text-muted-foreground mt-2">Keep up the great work! You're making a real difference in Goa.</p>
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
                            <Button variant="secondary" size="sm" disabled={1250 < reward.points}>
                                {reward.points} pts
                            </Button>
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
