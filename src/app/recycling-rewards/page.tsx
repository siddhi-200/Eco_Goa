import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import RecyclingForm from "./recycling-form";

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
        <div>
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
        </div>
      </div>
    </div>
  );
}
