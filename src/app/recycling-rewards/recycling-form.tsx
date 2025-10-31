'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, Smile, Frown, ShieldCheck, ShieldAlert } from 'lucide-react';
import { checkRecyclingFraudAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { PreventRecyclingFraudOutput } from '@/ai/flows/prevent-recycling-fraud';
import { Progress } from '@/components/ui/progress';

const recyclingSchema = z.object({
  description: z.string().min(10, 'Please provide a more detailed description.'),
});

type RecyclingFormValues = z.infer<typeof recyclingSchema>;

export default function RecyclingForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PreventRecyclingFraudOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<RecyclingFormValues>({
    resolver: zodResolver(recyclingSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RecyclingFormValues) => {
    if (!preview) {
      toast({
        variant: 'destructive',
        title: 'Photo required',
        description: 'Please upload a photo of your recycling items.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    const response = await checkRecyclingFraudAction({ 
      photoDataUri: preview,
      description: data.description 
    });
    setIsLoading(false);

    if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: response.error,
      });
    } else {
      setResult(response);
      toast({
        title: 'Submission Assessed',
        description: 'Your recycling submission has been checked by our AI.',
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const confidencePercentage = result ? Math.round(result.confidenceScore * 100) : 0;
  const confidenceColor = confidencePercentage > 75 ? "bg-primary" : confidencePercentage > 40 ? "bg-yellow-500" : "bg-destructive";

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Submit Your Recycling</CardTitle>
          <CardDescription>Upload a photo and description of your sorted recyclables to earn points.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Photo of Recyclables</Label>
            <div
              className="relative w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleUploadClick}
            >
              {preview ? (
                <Image src={preview} alt="Recycling preview" fill className="object-contain rounded-md" />
              ) : (
                <>
                  <Upload className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold">Click to upload image</h3>
                  <p>Make sure items are clearly visible.</p>
                </>
              )}
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., 'A bag of clean plastic bottles and 5 cardboard boxes.'"
              rows={3}
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          {isLoading && (
            <div className="text-center text-muted-foreground pt-4">
              <Loader2 className="w-8 h-8 mx-auto animate-spin" />
              <p className="mt-2">Our AI is checking your submission for authenticity...</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-semibold text-lg">AI Assessment</h3>
              {result.isFraudulent ? (
                <Alert variant="destructive">
                  <Frown className="h-4 w-4" />
                  <AlertTitle>Potential Fraud Detected</AlertTitle>
                  <AlertDescription>{result.fraudExplanation}</AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 text-green-800 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400">
                  <Smile className="h-4 w-4" />
                  <AlertTitle>Submission Looks Good!</AlertTitle>
                  <AlertDescription>{result.fraudExplanation} Points will be awarded shortly.</AlertDescription>
                </Alert>
              )}
              <div>
                <div className="flex justify-between mb-1">
                  <Label>AI Confidence</Label>
                  <span className="text-sm font-medium">{confidencePercentage}%</span>
                </div>
                <Progress value={confidencePercentage} indicatorClassName={confidenceColor} />
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !preview}>
            {isLoading ? 'Assessing...' : 'Submit for Points'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
