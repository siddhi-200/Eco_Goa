

import { PageHeader } from "@/components/page-header";
import WasteIdentifier from "./waste-identifier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Biohazard, Cpu, AlertTriangle, Dot, ArrowLeft, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const segregationCategories = [
  {
    title: "Wet Waste",
    description: "Biodegradable kitchen waste.",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    color: "border-green-600",
    badge: "Non-Hazardous",
    badgeVariant: "default" as "default",
    bgColor: "bg-green-50 dark:bg-green-950",
    items: ["Food Scraps", "Vegetable Peels", "Garden Waste", "Tea Bags"],
  },
  {
    title: "Dry Waste",
    description: "Recyclable materials.",
    icon: <Recycle className="w-8 h-8 text-blue-600" />,
    color: "border-blue-600",
    badge: "Non-Hazardous",
    badgeVariant: "default" as "default",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    items: ["Plastic Bottles", "Paper & Cardboard", "Metal Cans", "Glass Jars"],
  },
  {
    title: "Hazardous Waste",
    description: "Items that are unsafe to dispose of with regular trash.",
    icon: <Biohazard className="w-8 h-8 text-red-600" />,
    color: "border-red-600",
    badge: "Hazardous",
    badgeVariant: "destructive" as "destructive",
    bgColor: "bg-red-50 dark:bg-red-950",
    items: ["Paint Cans", "Pesticides", "Expired Medicines", "Syringes"],
  },
  {
    title: "E-Waste",
    description: "Discarded electronic devices.",
    icon: <Cpu className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
    color: "border-gray-700",
    badge: "Hazardous",
    badgeVariant: "destructive" as "destructive",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    items: ["Old Phones", "Chargers & Cables", "Batteries", "Laptops"],
  }
];


export default function IdentifyWastePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Waste Type Identifier"
        description="Not sure what to do with an item? Let our AI help you out."
      />
      <WasteIdentifier />
      <section className="mt-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight">Waste Segregation Guide</h2>
            <p className="mt-2 text-lg text-muted-foreground">Learn how to segregate your waste correctly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {segregationCategories.map(category => (
            <Card key={category.title} className={`${category.bgColor} ${category.color} border-2 flex flex-col`}>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  {category.icon}
                  <CardTitle className="text-xl font-headline">{category.title}</CardTitle>
                </div>
                 <Badge variant={category.badgeVariant} className={`w-fit ${category.badgeVariant === 'default' ? 'bg-green-200 text-green-900' : ''}`}>
                  {category.badgeVariant === 'destructive' && <AlertTriangle className="mr-1 h-3 w-3" />}
                  {category.badge}
                </Badge>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <h4 className="font-semibold mb-2 text-sm">Examples:</h4>
                <ul className="space-y-1">
                  {category.items.map(item => (
                    <li key={item} className="flex items-start text-sm text-muted-foreground">
                        <Dot className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="text-center mt-16 flex justify-center gap-4">
          <Button asChild size="lg" variant="outline">
              <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
              </Link>
          </Button>
          <Button asChild size="lg">
              <Link href="/">
                  Explore More Features
                  <Layers className="ml-2 h-5 w-5" />
              </Link>
          </Button>
      </div>

    </div>
  );
}
