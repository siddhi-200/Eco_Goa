'use server';

/**
 * @fileOverview AI-powered fraud prevention for recycling points redemption.
 *
 * This file exports:
 * - `preventRecyclingFraud`: Function to assess recycling submissions for fraud.
 * - `PreventRecyclingFraudInput`: Input type for `preventRecyclingFraud`.
 * - `PreventRecyclingFraudOutput`: Output type for `preventRecyclingFraud`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreventRecyclingFraudInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the recycling submission, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The user-provided description of the recycling submission.'),
});

export type PreventRecyclingFraudInput = z.infer<typeof PreventRecyclingFraudInputSchema>;

const PreventRecyclingFraudOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the submission is likely fraudulent.'),
  fraudExplanation: z.string().describe('Explanation of why the submission is considered fraudulent.'),
  confidenceScore: z.number().describe('A score indicating the confidence level of the fraud assessment (0-1).'),
});

export type PreventRecyclingFraudOutput = z.infer<typeof PreventRecyclingFraudOutputSchema>;

export async function preventRecyclingFraud(input: PreventRecyclingFraudInput): Promise<PreventRecyclingFraudOutput> {
  return preventRecyclingFraudFlow(input);
}

const prompt = ai.definePrompt({
  name: 'preventRecyclingFraudPrompt',
  input: {schema: PreventRecyclingFraudInputSchema},
  output: {schema: PreventRecyclingFraudOutputSchema},
  prompt: `You are an AI assistant that assesses recycling submissions for potential fraud.

  Analyze the provided photo and description to determine if the submission is likely fraudulent. Consider factors such as inconsistencies between the photo and description, evidence of non-recyclable materials, or any other suspicious indicators.

  Photo: {{media url=photoDataUri}}
  Description: {{{description}}}

  Based on your analysis, determine whether the submission is fraudulent and provide an explanation.
  Also, provide a confidence score between 0 and 1, where 0 indicates no confidence and 1 indicates complete confidence in your assessment.

  Output in JSON format:
  {
    "isFraudulent": true/false,
    "fraudExplanation": "Explanation of why the submission is considered fraudulent",
    "confidenceScore": 0.0 - 1.0
  }`,
});

const preventRecyclingFraudFlow = ai.defineFlow(
  {
    name: 'preventRecyclingFraudFlow',
    inputSchema: PreventRecyclingFraudInputSchema,
    outputSchema: PreventRecyclingFraudOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
