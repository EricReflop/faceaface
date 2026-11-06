export const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
export type Jour = (typeof JOURS)[number];

export const JOUR_SCHEMA: Record<Jour, string> = {
  lundi: 'https://schema.org/Monday',
  mardi: 'https://schema.org/Tuesday',
  mercredi: 'https://schema.org/Wednesday',
  jeudi: 'https://schema.org/Thursday',
  vendredi: 'https://schema.org/Friday',
  samedi: 'https://schema.org/Saturday',
  dimanche: 'https://schema.org/Sunday',
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "20:00" -> "20 h" ; "16:45" -> "16 h 45" */
export const heure = (hhmm: string) => {
  const [h, m] = hhmm.split(':');
  return m === '00' ? `${Number(h)} h` : `${Number(h)} h ${m}`;
};

export const prix = (n: number) => `${n} €`;

export const dateLongue = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export const ordreJour = (j: Jour) => JOURS.indexOf(j);

export const adresseComplete = (s: { adresse: string; codePostal: string; ville: string }) =>
  `${s.adresse}, ${s.codePostal} ${s.ville}`;

export const lienItineraire = (s: { adresse: string; codePostal: string; ville: string }) =>
  `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseComplete(s))}`;
