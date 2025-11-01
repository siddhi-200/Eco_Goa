import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Phone, Server, Smartphone, Truck } from "lucide-react";

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

  const municipalities = {
      "North Goa": [
          { name: "Panaji Municipal Corporation", phone: "0832-2223339" },
          { name: "Mapusa Municipal Council", phone: "0832-2262231" },
          { name: "Bicholim Municipal Council", phone: "0832-2362034" },
          { name: "Pernem Municipal Council", phone: "0832-2201237" },
          { name: "Valpoi Municipal Council", phone: "0832-2374241" },
      ],
      "South Goa": [
        { name: "Margao Municipal Council", phone: "0832-2700345" },
        { name: "Mormugao Municipal Council", phone: "0832-2512253" },
        { name: "Quepem Municipal Council", phone: "0832-2662235" },
        { name: "Cuncolim Municipal Council", phone: "0832-2863232" },
        { name: "Curchorem-Cacora Municipal Council", phone: "0832-2650491" },
        { name: "Sanguem Municipal Council", phone: "0832-2604230" },
        { name: "Canacona Municipal Council", phone: "0832-2643329" },
      ]
  }

export default function ContactsPage() {
    return (
        <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
            <PageHeader 
                title="Contacts & How It Works"
                description="Important contacts and a guide to how our app helps keep Goa clean."
            />
            <div className="space-y-12">
                <section>
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
                </section>
                
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline tracking-tight">Municipal Council Contacts</h2>
                        <p className="mt-2 text-lg text-muted-foreground">Contact your local municipal council for waste management inquiries.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(municipalities).map(([district, councils]) => (
                            <Card key={district}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <Phone className="w-6 h-6 text-primary" />
                                        <span>{district}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {councils.map(council => (
                                            <li key={council.name} className="flex justify-between items-center">
                                                <span className="font-medium">{council.name}</span>
                                                <a href={`tel:${council.phone}`} className="text-primary hover:underline font-mono">{council.phone}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
