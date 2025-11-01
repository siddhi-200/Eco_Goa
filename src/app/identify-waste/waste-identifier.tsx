
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ScanSearch, Upload, FileCheck2, AlertCircle } from 'lucide-react';
import { identifyWasteAction } from '@/lib/actions';
import { IdentifyWasteTypeOutput } from '@/ai/flows/identify-waste-type-from-photo';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export default function WasteIdentifier() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyWasteTypeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreview(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!preview) {
        toast({
            variant: "destructive",
            title: "No image selected",
            description: "Please choose an image to analyze."
        });
        return;
    }
    
    setIsLoading(true);
    const response = await identifyWasteAction({ photoDataUri: preview });
    setIsLoading(false);

    if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: response.error,
      });
      setResult(null);
    } else {
      setResult(response);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload a Photo</CardTitle>
          <CardDescription>Upload a clear photo of the waste item you want to identify.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="relative w-full aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={handleUploadClick}
          >
            {preview ? (
              <Image src={preview} alt="Uploaded waste item" fill className="object-contain rounded-md" />
            ) : (
              <>
                <Upload className="w-12 h-12 mb-4" />
                <h3 className="text-lg font-semibold">Click to upload image</h3>
                <p>or drag and drop</p>
              </>
            )}
             {isLoading && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin" />
                <p className="mt-4">Analyzing...</p>
              </div>
            )}
          </div>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            disabled={isLoading}
          />
           <Button onClick={handleSubmit} disabled={isLoading || !preview} className="w-full mt-4">
              <ScanSearch className="mr-2 h-4 w-4" />
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>Our AI will identify the waste and provide disposal instructions.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {isLoading && (
            <div className="text-center text-muted-foreground animate-pulse">
              <Loader2 className="w-12 h-12 mx-auto animate-spin" />
              <p className="mt-4 text-lg">Analyzing image...</p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="text-center text-muted-foreground">
              <ScanSearch className="w-16 h-16 mx-auto" />
              <p className="mt-4 text-lg">Results will appear here</p>
            </div>
          )}

          {!isLoading && result && (
            <div className="w-full animate-in fade-in space-y-4">
              <Alert>
                <FileCheck2 className="h-4 w-4" />
                <AlertTitle className="font-bold">Waste Type: {result.wasteType}</AlertTitle>
              </Alert>
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">Disposal Instructions</AlertTitle>
                <AlertDescription className="mt-2">
                  {result.disposalInstructions}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
