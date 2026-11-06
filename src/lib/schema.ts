import { getCollection } from 'astro:content';
import site from '../data/site.json';
import { JOUR_SCHEMA } from './format';

const ORG_ID = `${site.url}/#club`;

/** JSON-LD SportsClub construit depuis les données (salles + planning). */
export async function sportsClub() {
  const salles = await getCollection('salles');
  const planning = await getCollection('planning');
  const principale = salles.find((s) => s.data.principale) ?? salles[0];

  const adresse = (s: (typeof salles)[number]) => ({
    '@type': 'PostalAddress',
    streetAddress: s.data.adresse,
    postalCode: s.data.codePostal,
    addressLocality: s.data.ville,
    addressRegion: 'Grand Est',
    addressCountry: 'FR',
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsClub',
    '@id': ORG_ID,
    name: site.nomComplet,
    alternateName: site.nom,
    url: `${site.url}/`,
    email: site.email,
    ...(site.telephone ? { telephone: site.telephone } : {}),
    sport: 'Muay Thaï',
    description:
      'Club de Muay Thaï (boxe thaï) à Reims : cours enfants dès 5 ans, ados et adultes, débutants et confirmés, dans 3 gymnases.',
    // logo / image : à ajouter quand les visuels finaux seront prêts.
    address: adresse(principale),
    areaServed: { '@type': 'City', name: 'Reims' },
    sameAs: Object.values(site.reseaux),
    location: salles.map((s) => ({
      '@type': 'SportsActivityLocation',
      name: s.data.nom,
      address: adresse(s),
      ...(s.data.geo
        ? { geo: { '@type': 'GeoCoordinates', latitude: s.data.geo.lat, longitude: s.data.geo.lng } }
        : {}),
      openingHoursSpecification: planning
        .filter((c) => c.data.salle.id === s.id)
        .map((c) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: JOUR_SCHEMA[c.data.jour],
          opens: c.data.debut,
          closes: c.data.fin,
        })),
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).href,
    })),
  };
}

export const orgRef = { '@id': ORG_ID };
