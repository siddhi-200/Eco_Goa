'use server';

import { identifyWasteTypeFromPhoto, IdentifyWasteTypeInput, IdentifyWasteTypeOutput } from '@/ai/flows/identify-waste-type-from-photo';
import { preventRecyclingFraud, PreventRecyclingFraudInput, PreventRecyclingFraudOutput } from '@/ai/flows/prevent-recycling-fraud';
import { z } from "zod";

const IdentifyWasteSchema = z.object({
  photoDataUri: z.string().startsWith('data:image/'),
});

export async function identifyWasteAction(input: IdentifyWasteTypeInput): Promise<IdentifyWasteTypeOutput | { error: string }> {
  const parsed = IdentifyWasteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Invalid input. Please provide a valid image.' };
  }
  
  try {
    const result = await identifyWasteTypeFromPhoto(parsed.data);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to identify waste. Please try again.' };
  }
}

const RecyclingFraudSchema = z.object({
  photoDataUri: z.string().startsWith('data:image/'),
  description: z.string().min(1, "Description is required."),
});

export async function checkRecyclingFraudAction(input: PreventRecyclingFraudInput): Promise<PreventRecyclingFraudOutput | { error: string }> {
  const parsed = RecyclingFraudSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Invalid input. Please provide a valid image and description.' };
  }

  try {
    const result = await preventRecyclingFraud(parsed.data);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to assess submission. Please try again.' };
  }
}
