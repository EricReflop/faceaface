# Face à Face — site V2

Refonte de https://www.asie-boxing.fr/ en site statique **Astro 6**, prévu pour un hébergement sur **Netlify**. Il n'y a plus de WordPress.
L'audit du site actuel est dans [audit/audit-asie-boxing.md](audit/audit-asie-boxing.md).

## Commandes

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run check     # vérification TypeScript / Astro
```

Node 22.12 ou plus récent est nécessaire. Astro 7 demande Node 22.23 ou plus récent.

## Où modifier les contenus

| Contenu | Fichier |
|---|---|
| Planning des cours | `src/data/planning.json` |
| Groupes (âges, niveaux) | `src/data/groupes.json` |
| Gymnases | `src/data/salles.json` |
| Tarifs | `src/data/tarifs.json` |
| Infos du club (e-mail, téléphone, HelloAsso, réseaux, saison) | `src/data/site.json` |
| Coachs | `src/content/coachs/*.md` |

Le planning est saisi une seule fois. Il alimente l'accueil, la page Cours & horaires, la page Cours d'essai et les horaires du JSON-LD `SportsClub`.

## SEO déjà en place

- Title de 60 caractères maximum et meta description unique pour chaque page, URL canonique, Open Graph, `lang="fr"`, un seul H1 par page.
- JSON-LD : `SportsClub` (3 salles et horaires), `BreadcrumbList`, `Person` (coachs), `FAQPage` (essai), `Article`, `ContactPage`.
- `sitemap-index.xml` (@astrojs/sitemap) et `robots.txt`.
- Redirections 301 depuis les anciennes URL WordPress dans `public/_redirects`.
- Aucun cookie et aucun script tiers. Environ 6 Ko de CSS et quelques lignes de JS inline (menu, filtres du planning).
- Formulaires Netlify Forms avec honeypot, sans reCAPTCHA.

## Design system (Figma)

Les styles actuels sont **provisoires**. `src/styles/tokens.css` contient des variables nommées pour être reliées une à une aux variables Figma (couleurs, typographie, espacements, rayons). Une fois les maquettes prêtes :

1. Autoriser le connecteur Figma (`/mcp` dans Claude Code).
2. Reprendre les variables Figma dans `tokens.css`.
3. Mettre les composants (`src/components/`) aux maquettes.

## À compléter par le club (TODO)

- [ ] **Téléphone** dans `site.json` : il est absent du site actuel, alors qu'il compte pour le SEO local.
- [ ] **Coordonnées GPS** des 3 salles dans `salles.json`, pour le JSON-LD et les itinéraires.
- [ ] **Logo SVG**, image Open Graph (1200×630) et photos optimisées.
- [ ] Mentions légales : siège, numéro RNA, directeur de publication.
- [ ] Politique de confidentialité : reprendre l'ancienne page et la mettre à jour.
- [ ] Description de chaque groupe et équipement à prévoir pour un essai.
- [ ] Biographie complète de Zohir Remidi.
- [ ] Choisir l'analytics sans cookies (Plausible, Matomo sans cookies ou Netlify Analytics).
- [ ] Optionnel : Decap CMS pour que le club modifie le planning et les tarifs en ligne.

## Mise en ligne

1. Déployer sur Netlify et vérifier sur l'URL de prévisualisation.
2. Faire pointer `www.asie-boxing.fr` vers Netlify (DNS).
3. Contrôler chaque ancienne URL : elle doit renvoyer une 200 ou une 301.
4. Soumettre `sitemap-index.xml` dans Google Search Console.
5. Mettre à jour la fiche Google Business Profile avec le même nom, la même adresse et le même téléphone.
