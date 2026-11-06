import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
const heure = z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM attendu');

const salles = defineCollection({
  loader: file('src/data/salles.json'),
  schema: z.object({
    nom: z.string(),
    nomCourt: z.string(),
    adresse: z.string(),
    codePostal: z.string(),
    ville: z.string(),
    principale: z.boolean().default(false),
    // À compléter (latitude / longitude) pour le JSON-LD et les itinéraires.
    geo: z.object({ lat: z.number(), lng: z.number() }).nullable().default(null),
  }),
});

const groupes = defineCollection({
  loader: file('src/data/groupes.json'),
  schema: z.object({
    nom: z.string(),
    sousTitre: z.string(),
    ageMin: z.number(),
    ageMax: z.number().nullable(),
    ordre: z.number(),
  }),
});

const planning = defineCollection({
  loader: file('src/data/planning.json'),
  schema: z.object({
    groupe: reference('groupes'),
    jour: z.enum(jours),
    debut: heure,
    fin: heure,
    salle: reference('salles'),
    coach: reference('coachs').nullable(),
    note: z.string().optional(),
  }),
});

const tarifs = defineCollection({
  loader: file('src/data/tarifs.json'),
  schema: z.object({
    formule: z.string(),
    lieu: z.string(),
    coachs: z.array(reference('coachs')),
    prix: z.array(z.object({ age: z.string(), montant: z.number() })),
  }),
});

const coachs = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/coachs' }),
  schema: z.object({
    nom: z.string(),
    role: z.string(),
    resume: z.string(),
    diplomes: z.array(z.string()).default([]),
    palmares: z.array(z.string()).default([]),
    ordre: z.number().default(10),
  }),
});

const actus = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/actus' }),
  schema: z.object({
    titre: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { salles, groupes, planning, tarifs, coachs, actus };
