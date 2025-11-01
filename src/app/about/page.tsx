import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, CalendarPlus, Info, Map, Megaphone, Recycle, ScanSearch, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
      title: "Schedule Pickup",
      description: "Book a waste collection slot at your convenience.",
      icon: <CalendarPlus className="w-6 h-6 text-primary" />,
      href: "/schedule-pickup",
    },
    {
      title: "Track Collection",
      description: "See real-time locations of waste collection trucks.",
      icon: <Map className="w-6 h-6 text-primary" />,
      href: "/tracking",
    },
    {
      title: "Recycling Rewards",
      description: "Earn points for recycling and help Goa stay green.",
      icon: <Recycle className="w-6 h-6 text-primary" />,
      href: "/recycling-rewards",
    },
    {
      title: "Identify Waste",
      description: "Upload a photo to identify waste and get disposal info.",
      icon: <ScanSearch className="w-6 h-6 text-primary" />,
      href: "/identify-waste",
    },
    {
      title: "Educational Resources",
      description: "Learn about waste reduction and proper disposal.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      href: "/resources",
    },
    {
      title: "Report Dumping",
      description: "Report illegal dumping sites to help keep Goa clean.",
      icon: <Megaphone className="w-6 h-6 text-primary" />,
      href: "/report-dumping",
    },
  ];

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === "about-us");

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="About EcoGoa"
        description="Preserving Paradise, One Action at a Time"
      />

      <div className="space-y-12">
        <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {aboutImage &&
                <div className="relative h-64 lg:h-full">
                    <Image 
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={aboutImage.imageHint}
                    />
                </div>
            }
          <div className="p-8">
            <h2 className="text-2xl font-bold font-headline tracking-tight mb-4">Goa: A Land of Sun, Sand, and Soul</h2>
            <div className="text-muted-foreground space-y-4">
                <p>For centuries, Goa has been a jewel on India's west coast, a place where lush green landscapes meet the sparkling Arabian Sea. Its rich history, a blend of Indian and Portuguese cultures, has created a unique "susegad" lifestyle—a relaxed and contented approach to life. This paradise, however, faces a modern challenge: waste management.</p>
                <p>As tourism thrives and the population grows, preserving Goa's natural beauty has become more critical than ever. We believe that the spirit of susegad can and should include a deep respect for our environment.</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6 text-primary"/>
                <span>Our Vision: The Idea Behind EcoGoa</span>
            </CardTitle>
            <CardDescription>
                Connecting community and technology for a cleaner tomorrow.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>EcoGoa was born from a simple idea: what if we could make responsible waste management easy and rewarding for everyone in Goa? We envisioned an app that empowers residents and visitors to take an active role in keeping this beautiful state clean. By combining smart technology with community action, we aim to build a sustainable future where waste is not a problem, but a resource.</p>
            <p>Our mission is to create a seamless bridge between you and the waste management ecosystem, providing the tools and knowledge needed to make a real difference. Every recycled bottle, every scheduled pickup, and every reported issue contributes to a larger movement—a collective effort to preserve Goa for generations to come.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary"/>
                <span>Laws & Consequences</span>
            </CardTitle>
            <CardDescription>
                Understanding the rules that protect Goa's environment.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>The Government of Goa has implemented strict regulations to combat illegal dumping and improper waste disposal. Under the Goa Non-Biodegradable Garbage (Control) Act, littering and failure to segregate waste are punishable offenses.</p>
            <ul className="list-disc list-inside space-y-2">
                <li><span className="font-semibold">Fines for Littering:</span> Individuals caught littering can face fines starting from ₹2,000, which can increase for repeated offenses.</li>
                <li><span className="font-semibold">Commercial Violations:</span> Businesses that do not manage their waste according to regulations can face much steeper fines and, in some cases, the revocation of their licenses.</li>
                <li><span className="font-semibold">No Segregation, No Collection:</span> Many municipalities have adopted a "no segregation, no collection" policy, meaning waste collectors will not pick up mixed waste.</li>
            </ul>
            <p>These laws are in place to ensure that everyone contributes to keeping Goa beautiful. This app is designed to help you follow these rules easily and effectively.</p>
          </CardContent>
        </Card>

        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-headline tracking-tight">App Features</h2>
                <p className="mt-2 text-lg text-muted-foreground">Tools to empower your green journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <Card key={feature.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {feature.icon}
                            <h3 className="text-lg font-semibold font-headline">{feature.title}</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
