'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate relevant tags for a portfolio post based on an uploaded image.
 *
 * - generateTagsForPost -  A function that takes an image data URI as input and returns a list of suggested tags.
 * - GenerateTagsForPostInput - The input type for the generateTagsForPost function.
 * - GenerateTagsForPostOutput - The output type for the generateTagsForPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsForPostInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'A photo for a portfolio post, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateTagsForPostInput = z.infer<typeof GenerateTagsForPostInputSchema>;

const GenerateTagsForPostOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the post.'),
});
export type GenerateTagsForPostOutput = z.infer<typeof GenerateTagsForPostOutputSchema>;

export async function generateTagsForPost(input: GenerateTagsForPostInput): Promise<GenerateTagsForPostOutput> {
  return generateTagsForPostFlow(input);
}

const generateTagsForPostPrompt = ai.definePrompt({
  name: 'generateTagsForPostPrompt',
  input: {schema: GenerateTagsForPostInputSchema},
  output: {schema: GenerateTagsForPostOutputSchema},
  prompt: `You are a professional tag generator for a portfolio website. Given an image, you will generate a list of tags that accurately describe the image.

  Image: {{media url=imageDataUri}}

  Please return an array of strings, each string is a tag that can be used to categorize the image. Return ONLY the array and nothing else. No intro or outro text. Do not number the tags.
  Example: ["tag1", "tag2", "tag3"]
  `,
});

const generateTagsForPostFlow = ai.defineFlow(
  {
    name: 'generateTagsForPostFlow',
    inputSchema: GenerateTagsForPostInputSchema,
    outputSchema: GenerateTagsForPostOutputSchema,
  },
  async input => {
    const {output} = await generateTagsForPostPrompt(input);
    return output!;
  }
);
