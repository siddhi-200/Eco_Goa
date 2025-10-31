import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const resources = [
  {
    id: "reduce-reuse-recycle",
    title: "The 3 R's: Reduce, Reuse, Recycle",
    content: "The 3 R's are a cornerstone of sustainable living. 'Reduce' means creating less waste in the first place. 'Reuse' involves using items multiple times before replacing them. 'Recycle' is the process of converting waste materials into new materials and objects. By following these principles, we can significantly decrease our environmental impact.",
  },
  {
    id: "composting",
    title: "Home Composting 101",
    content: "Composting is a natural process that turns organic waste—like food scraps and yard trimmings—into a valuable fertilizer for your garden. To start, you need a compost bin and a mix of 'greens' (like fruit peels and coffee grounds) and 'browns' (like dried leaves and cardboard). Keep the pile moist and turn it regularly to speed up decomposition.",
  },
  {
    id: "waste-segregation",
    title: "Why Waste Segregation is Crucial",
    content: "Segregating waste at its source into categories like wet, dry, and hazardous is the first and most important step in effective waste management. It makes recycling more efficient, reduces the amount of waste going to landfills, and prevents the contamination of recyclable materials. Proper segregation is a simple habit with a massive positive impact.",
  },
  {
    id: "e-waste",
    title: "Dealing with E-Waste",
    content: "Electronic waste, or e-waste, includes discarded electronic devices like phones, computers, and batteries. These items contain hazardous materials and should not be thrown in regular trash. Look for designated e-waste collection centers or special pickup services in your area to ensure they are disposed of safely and responsibly.",
  },
  {
    id: "plastic-alternatives",
    title: "Plastic-Free Living Tips",
    content: "Reducing plastic use can be challenging, but every small change helps. Carry a reusable water bottle and coffee cup. Bring your own cloth bags when shopping. Opt for products with minimal or no plastic packaging. Choose glass, metal, or wood alternatives whenever possible. These small actions collectively contribute to a healthier planet.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Educational Resources"
        description="Learn how to make a positive impact on Goa's environment."
      />
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {resources.map((resource, index) => (
            <AccordionItem key={resource.id} value={resource.id} className="bg-card px-4 rounded-lg mb-4 shadow-sm"
              style={{ animation: `accordion-down 0.5s ease-out ${index * 100}ms backwards` }}
            >
              <AccordionTrigger className="text-lg font-semibold font-headline text-left hover:no-underline">
                {resource.title}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {resource.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
