
import { PageHeader } from "@/components/page-header";
import WasteIdentifier from "./waste-identifier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Biohazard, Cpu, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const segregationCategories = [
  {
    title: "Wet Waste",
    description: "Biodegradable waste like food scraps, peels, and garden waste.",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    color: "border-green-600",
    badge: "Non-Hazardous",
    badgeVariant: "default" as "default",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Dry Waste",
    description: "Recyclable materials like plastic, paper, metal, and glass.",
    icon: <Recycle className="w-8 h-8 text-blue-600" />,
    color: "border-blue-600",
    badge: "Non-Hazardous",
    badgeVariant: "default" as "default",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Hazardous Waste",
    description: "Paints, chemicals, bulbs, and other dangerous materials.",
    icon: <Biohazard className="w-8 h-8 text-red-600" />,
    color: "border-red-600",
    badge: "Hazardous",
    badgeVariant: "destructive" as "destructive",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "E-Waste",
    description: "Discarded electronic devices like phones, chargers, and batteries.",
    icon: <Cpu className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
    color: "border-gray-700",
    badge: "Hazardous",
    badgeVariant: "destructive" as "destructive",
    bgColor: "bg-gray-100 dark:bg-gray-800",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segregationCategories.map(category => (
            <Card key={category.title} className={`${category.bgColor} ${category.color} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  {category.icon}
                  <CardTitle className="text-xl font-headline">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <Badge variant={category.badgeVariant} className={category.badgeVariant === 'default' ? 'bg-green-200 text-green-900' : ''}>
                  {category.badgeVariant === 'destructive' && <AlertTriangle className="mr-1 h-3 w-3" />}
                  {category.badge}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
