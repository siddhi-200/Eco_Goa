import { PageHeader } from "@/components/page-header";
import WasteIdentifier from "./waste-identifier";

export default function IdentifyWastePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Waste Type Identifier"
        description="Not sure what to do with an item? Let our AI help you out."
      />
      <WasteIdentifier />
    </div>
  );
}
