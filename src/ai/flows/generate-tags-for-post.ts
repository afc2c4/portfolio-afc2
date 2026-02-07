
'use server';

/**
 * @fileOverview Define um fluxo Genkit para gerar tags técnicas relevantes para um projeto de desenvolvimento com base em uma imagem.
 *
 * - generateTagsForPost - Função que recebe um URI de dados de imagem e retorna uma lista de tecnologias e categorias sugeridas.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsForPostInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'Uma captura de tela de um projeto web ou mobile, como um URI de dados que deve incluir o tipo MIME e usar codificação Base64.'
    ),
});
export type GenerateTagsForPostInput = z.infer<typeof GenerateTagsForPostInputSchema>;

const GenerateTagsForPostOutputSchema = z.object({
  tags: z.array(z.string()).describe('Um array de tecnologias (ex: React, Nextjs, SQL) ou categorias de projeto sugeridas.'),
});
export type GenerateTagsForPostOutput = z.infer<typeof GenerateTagsForPostOutputSchema>;

export async function generateTagsForPost(input: GenerateTagsForPostInput): Promise<GenerateTagsForPostOutput> {
  return generateTagsForPostFlow(input);
}

const generateTagsForPostPrompt = ai.definePrompt({
  name: 'generateTagsForPostPrompt',
  input: {schema: GenerateTagsForPostInputSchema},
  output: {schema: GenerateTagsForPostOutputSchema},
  prompt: `Você é um especialista em identificar tecnologias e stacks de desenvolvimento a partir de interfaces visuais.
  Dado o screenshot de um projeto de software, identifique possíveis tecnologias utilizadas (ex: Next.js, React, Tailwind, Mobile, Dashboard, SaaS, E-commerce).

  Imagem do Projeto: {{media url=imageDataUri}}

  Retorne um array de strings com as tecnologias e categorias mais prováveis. Retorne APENAS o array JSON.
  Exemplo: ["React", "SaaS", "Dashboard", "Tailwind"]
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
