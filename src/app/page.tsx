import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, BookOpen, CalendarPlus, Map, Megaphone, Recycle, ScanSearch, Star, Smartphone, Server, Truck, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Schedule Pickup",
    description: "Book a waste collection slot at your convenience.",
    icon: <CalendarPlus className="w-8 h-8 text-primary" />,
    href: "/schedule-pickup",
  },
  {
    title: "Track Collection",
    description: "See real-time locations of waste collection trucks.",
    icon: <Map className="w-8 h-8 text-primary" />,
    href: "/tracking",
  },
  {
    title: "Recycling Rewards",
    description: "Earn points for recycling and help Goa stay green.",
    icon: <Recycle className="w-8 h-8 text-primary" />,
    href: "/recycling-rewards",
  },
  {
    title: "Identify Waste",
    description: "Upload a photo to identify waste and get disposal info.",
    icon: <ScanSearch className="w-8 h-8 text-primary" />,
    href: "/identify-waste",
  },
  {
    title: "Educational Resources",
    description: "Learn about waste reduction and proper disposal.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    href: "/resources",
  },
  {
    title: "Report Dumping",
    description: "Report illegal dumping sites to help keep Goa clean.",
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    href: "/report-dumping",
  },
  {
    title: "Feedback & Reviews",
    description: "Share your thoughts and help us improve the app.",
    icon: <Star className="w-8 h-8 text-primary" />,
    href: "/feedback",
  },
];

const howItWorksSteps = [
  {
    title: "1. You Act",
    description: "Use the app to schedule a pickup, report illegal dumping, or identify waste with a photo.",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
  },
  {
    title: "2. We Connect",
    description: "Our system instantly processes your request and alerts the nearest municipal council or collection partner.",
    icon: <Server className="w-10 h-10 text-primary" />,
  },
  {
    title: "3. Action on the Ground",
    description: "A collection truck is dispatched for your pickup, or an official investigates your report.",
    icon: <Truck className="w-10 h-10 text-primary" />,
  },
  {
    title: "4. A Greener Goa",
    description: "Your action directly contributes to a cleaner, healthier environment for everyone in Goa.",
    icon: <Leaf className="w-10 h-10 text-primary" />,
  },
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="z-20 p-4 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-white drop-shadow-lg">
              Building a Greener Goa, Together.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              Your one-stop solution for smart waste management, recycling rewards, and community action in Goa.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/about">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline tracking-tight">Our Core Features</h2>
              <p className="mt-2 text-lg text-muted-foreground">Everything you need for responsible waste management.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="flex flex-row items-start gap-4">
                    {feature.icon}
                    <div className="flex-1">
                      <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                      <Link href={feature.href}>
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-12 md:py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tight">How It Works</h2>
                    <p className="mt-2 text-lg text-muted-foreground">From your phone to a cleaner Goa in 4 simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <div className="mb-4 bg-background p-4 rounded-full shadow-md">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
