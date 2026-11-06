/** Liens du menu principal : ordre et libellés de la maquette Figma. */
export const menuPrincipal = [
  { href: '/', label: 'Accueil' },
  { href: '/le-club/', label: 'Le Club' },
  { href: '/coachs/jean-marc-guillot/', label: 'Jean-Marc Guillot' },
  { href: '/coachs/zohir-remidi/', label: 'Zohir Remidi' },
  { href: '/inscription/', label: 'Inscription' },
  { href: '/cours-essai/', label: 'Envie d’essayer' },
  { href: '/contact/', label: 'Contact' },
];

/**
 * Colonnes du pied de page (maquette Figma).
 * « Le Muay Thaï » et « Cours & horaires » ne sont pas dans le menu de la maquette :
 * ils sont ajoutés ici pour que les pages restent accessibles (décision du 06/11/2026).
 */
export const piedDePage = [
  {
    titre: 'Le club',
    liens: [
      { href: '/', label: 'Accueil' },
      { href: '/le-club/', label: 'Le Club' },
      { href: '/coachs/jean-marc-guillot/', label: 'Jean-Marc Guillot' },
      { href: '/coachs/zohir-remidi/', label: 'Zohir Remidi' },
      { href: '/le-muay-thai/', label: 'Le Muay Thaï' },
    ],
  },
  {
    titre: 'Nous rejoindre',
    liens: [
      { href: '/cours-horaires/', label: 'Cours & horaires' },
      { href: '/inscription/', label: 'Inscription' },
      { href: '/cours-essai/', label: 'Envie d’essayer' },
      { href: '/contact/', label: 'Contact' },
    ],
  },
];

export const estActif = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);
