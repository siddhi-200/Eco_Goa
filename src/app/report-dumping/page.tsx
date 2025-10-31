'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reportSchema = z.object({
  location: z.string().min(5, "Please describe the location"),
  description: z.string().min(10, "Please provide a brief description"),
  photo: z.any().refine(file => file instanceof File, "Photo is required."),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportDumpingPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ReportFormValues) => {
    setIsLoading(true);
    console.log("Submitting report:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Report Submitted!",
        description: "Thank you for helping keep Goa clean. Our team will investigate.",
      });
      form.reset();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Report Illegal Dumping"
        description="Help us identify and clean up illegal dumping sites in Goa."
      />
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>Provide as much detail as possible to help our team locate and address the issue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Near Anjuna Flea Market, behind the old warehouse" {...form.register("location")} />
              {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Photo Evidence</Label>
              <div 
                className="relative w-full h-64 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <Image src={preview} alt="Report preview" fill className="object-cover rounded-md" />
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12" />
                    <p>Click to upload a photo</p>
                  </div>
                )}
              </div>
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
              {form.formState.errors.photo && <p className="text-sm text-destructive">{form.formState.errors.photo.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the type and amount of waste, and any other relevant details." rows={4} {...form.register("description")} />
              {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
