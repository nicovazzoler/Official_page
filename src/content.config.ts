import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada trabajo es una carpeta en src/content/proyectos con un index.md y sus capturas.
const proyectos = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      rubro: z.string(),
      estado: z.string(),
      orden: z.number().int(),
      color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'El color va en hex, por ejemplo #C9A84C'),
      datos: z.array(z.object({ etiqueta: z.string(), valor: z.string() })).default([]),
      capturas: z
        .array(
          z.object({
            archivo: image(),
            // compu llena la diapositiva; celu asoma como un teléfono; papel es un ticket apoyado
            tipo: z.enum(['compu', 'celu', 'papel']).default('compu'),
            epigrafe: z.string(),
            alt: z.string(),
          }),
        )
        .min(1),
    }),
});

export const collections = { proyectos };
