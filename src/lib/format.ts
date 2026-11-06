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

export const ordreJour = (j: Jour) => JOURS.indexOf(j);

/**
 * Regroupe des créneaux par jour et fusionne ceux qui se touchent.
 * Ex. lundi 18:30–20:00 + 20:00–21:45 → « 18 h 30 – 21 h 45 ».
 */
export function plagesParJour(creneaux: { jour: Jour; debut: string; fin: string }[]) {
  const parJour = new Map<Jour, { debut: string; fin: string }[]>();
  for (const c of [...creneaux].sort((a, b) => ordreJour(a.jour) - ordreJour(b.jour) || a.debut.localeCompare(b.debut))) {
    const plages = parJour.get(c.jour) ?? [];
    const derniere = plages.at(-1);
    if (derniere && c.debut <= derniere.fin) {
      if (c.fin > derniere.fin) derniere.fin = c.fin;
    } else {
      plages.push({ debut: c.debut, fin: c.fin });
    }
    parJour.set(c.jour, plages);
  }
  return [...parJour].map(([jour, plages]) => ({
    jour,
    plages: plages.map((p) => `${heure(p.debut)} – ${heure(p.fin)}`),
  }));
}

export const adresseComplete = (s: { adresse: string; codePostal: string; ville: string }) =>
  `${s.adresse}, ${s.codePostal} ${s.ville}`;

export const lienItineraire = (s: { adresse: string; codePostal: string; ville: string }) =>
  `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseComplete(s))}`;
