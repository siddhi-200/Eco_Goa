'use server';
/**
 * @fileOverview Identifies the type of waste from a photo and provides disposal instructions.
 *
 * - identifyWasteTypeFromPhoto - A function that handles the waste identification process.
 * - IdentifyWasteTypeInput - The input type for the identifyWasteTypeFromPhoto function.
 * - IdentifyWasteTypeOutput - The return type for the identifyWasteTypeFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyWasteTypeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the waste, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyWasteTypeInput = z.infer<typeof IdentifyWasteTypeInputSchema>;

const IdentifyWasteTypeOutputSchema = z.object({
  wasteType: z.string().describe('The identified type of waste.'),
  disposalInstructions: z
    .string()
    .describe('Instructions on how to properly dispose of the waste.'),
});
export type IdentifyWasteTypeOutput = z.infer<typeof IdentifyWasteTypeOutputSchema>;

export async function identifyWasteTypeFromPhoto(
  input: IdentifyWasteTypeInput
): Promise<IdentifyWasteTypeOutput> {
  return identifyWasteTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyWasteTypePrompt',
  input: {schema: IdentifyWasteTypeInputSchema},
  output: {schema: IdentifyWasteTypeOutputSchema},
  prompt: `You are an AI assistant specialized in waste identification and disposal.

You will receive a photo of waste and must identify the type of waste and provide specific disposal instructions.

Analyze the following image and provide the waste type and disposal instructions:

Photo: {{media url=photoDataUri}}

Waste Type: 
Disposal Instructions:`,
});

const identifyWasteTypeFlow = ai.defineFlow(
  {
    name: 'identifyWasteTypeFlow',
    inputSchema: IdentifyWasteTypeInputSchema,
    outputSchema: IdentifyWasteTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
