import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    id: "schedule-pickup",
    question: "How do I schedule a waste pickup?",
    answer: "Navigate to the 'Schedule Pickup' page. Fill in your address, select a convenient date and time slot, and submit the form. Our team will be notified and your pickup will be confirmed.",
  },
  {
    id: "track-collection",
    question: "Can I track my waste collection truck?",
    answer: "Yes! The 'Track Collection' page provides a real-time map showing the current locations of our waste collection trucks across Goa. This helps you know when a truck is near your area.",
  },
  {
    id: "recycling-rewards",
    question: "What is the Recycling Rewards program?",
    answer: "Our Recycling Rewards program allows you to earn points for correctly sorting and submitting your recyclable materials. Simply upload a photo and description on the 'Recycling Rewards' page. Our AI system will assess your submission, and once verified, you'll be awarded points that can be redeemed for various rewards.",
  },
  {
    id: "identify-waste",
    question: "How does the Waste Identifier work?",
    answer: "On the 'Identify Waste' page, you can upload a photo of any waste item. Our AI will analyze the image, identify the type of waste, and provide you with detailed instructions on how to dispose of it properly and responsibly.",
  },
  {
    id: "report-dumping",
    question: "How can I report illegal dumping?",
    answer: "If you see illegal dumping, go to the 'Report Dumping' page. You can provide the location, a description of the waste, and upload a photo as evidence. Your report helps us take action to keep Goa clean.",
  },
  {
    id: "educational-resources",
    question: "Where can I learn more about waste management?",
    answer: "The 'Educational Resources' page contains articles and guides on topics like waste segregation, composting, reducing plastic use, and handling e-waste. It's a great place to learn how to make a positive environmental impact.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about the EcoGoa app."
      />
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-card px-4 rounded-lg mb-4 shadow-sm">
              <AccordionTrigger className="text-lg font-semibold font-headline text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
