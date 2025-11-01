
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const feedbackSchema = z.object({
  rating: z.string().nonempty("Please select a rating"),
  comments: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data: FeedbackFormValues) => {
    setIsLoading(true);
    console.log("Submitting feedback:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback. We appreciate you helping us improve.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Feedback & Reviews"
        description="We'd love to hear your thoughts on the app."
      />
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Share Your Feedback</CardTitle>
            <CardDescription>Your input helps us make EcoGoa better for everyone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>How would you rate your experience?</Label>
              <RadioGroup
                onValueChange={(value) => form.setValue("rating", value)}
                className="flex flex-wrap gap-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(rating)} id={`r-${rating}`} />
                    <Label htmlFor={`r-${rating}`} className="flex items-center gap-1 cursor-pointer">
                      {rating} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {form.formState.errors.rating && <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" placeholder="Tell us what you liked or what we can improve." rows={5} {...form.register("comments")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
