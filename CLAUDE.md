# CLAUDE.md — Face à Face V2

Refonte du site du club de Muay Thaï Face à Face (Reims), qui remplace le WordPress de https://www.asie-boxing.fr/.
Le propriétaire est UX designer, avec des bases en développement : répondre en français et expliquer les choix techniques simplement.
Voir aussi le [README](README.md) (commandes, TODO du club) et l'[audit](audit/audit-asie-boxing.md) (constats et objectifs chiffrés).

## Stack

- **Astro 6, site statique** (`output: static`, `trailingSlash: 'always'`). **Pas de WordPress, pas de framework JS** (React, Vue…) sans raison forte.
- **Rester sur Astro 6** : Astro 7 demande Node 22.23 ou plus récent, et la machine est en Node 22.14.
- Hébergement **Netlify** : `netlify.toml`, `public/_redirects`, formulaires Netlify Forms.
- Vérifier avec `npm run build` et `npm run check` : 0 erreur et 0 avertissement attendus avant chaque commit.

## Contenus : une seule source de vérité

- `src/data/*.json` : planning, groupes, salles, tarifs, infos du club (`site.json`). Les schémas sont dans `src/content.config.ts`.
- `src/content/coachs/*.md`.
- **Pas de rubrique Actualités** (retirée à la demande du propriétaire) : `/actualites/` redirige en 301 vers l'accueil.
- **Ne jamais dupliquer** une donnée (horaire, prix, adresse) en dur dans une page : la lire depuis la collection.
- **Ne jamais inventer** de contenu (horaires, biographies, mentions légales, chiffres). Une information manquante devient un `<!-- TODO club : … -->` et une ligne dans la liste TODO du README.

## SEO : obligatoire sur chaque page

- Passer par `src/layouts/Base.astro` avec `title` et `description` uniques. Le title complet fait **60 caractères maximum** : le suffixe « | Face à Face Reims » est ajouté s'il tient. La description fait **160 caractères maximum**.
- **Un seul `<h1>`** par page, puis une hiérarchie Hn sans saut.
- JSON-LD adapté au type de page via `src/lib/schema.ts` : `breadcrumbs()`, `sportsClub()`, `orgRef`.
- **Toute URL supprimée ou renommée** reçoit une redirection 301 dans `public/_redirects`.
- Le sitemap est automatique (@astrojs/sitemap). Les pages `noindex` (merci, 404) en sont exclues dans `astro.config.mjs`.

## Design : Figma est la référence

- Les maquettes et le design system sont faits **dans Figma par le propriétaire**. Ne pas inventer de direction visuelle.
- Fichier Figma : `hgMWYDItRueQiIl7igw75u` (« Face à Face Website »). Accueil desktop `13:2406`, mobile `13:2641`.
- `src/styles/tokens.css` reprend les variables Figma (`groupe/nom` → `--groupe-nom`). Polices Inter et Barlow Condensed auto-hébergées via `@fontsource`.
- **Écart volontaire** : le texte rouge et le fond des boutons utilisent `--texte-marque-rouge` / `--fond-action` (`#D00000`, AA). `#FF0000` (`--fond-marque-rouge`) est réservé aux accents décoratifs.
- Menu = celui de la maquette (`src/lib/navigation.ts`). « Cours & horaires » et « Le Muay Thaï » ne sont accessibles que par le pied de page et les liens internes.
- Les pages internes n’ont pas encore de maquette : elles utilisent les alias `--color-*` de `tokens.css`.
- **Aucune valeur en dur** (couleur, taille, espacement) dans les composants : utiliser les variables `var(--…)`.
- Le connecteur Figma doit être autorisé via `/mcp` pour lire les fichiers.

## Accessibilité (RGAA / WCAG 2.2 AA)

- Contraste d'au moins 4,5:1 : le rouge de texte est `--texte-marque-rouge` (`#D00000`), jamais `#FF0000`.
- Cibles tactiles d'au moins 44 px (`--tap`), focus visible, `<label>` sur chaque champ, `alt` pertinent sur chaque image (vide si l'image est décorative).
- Ne pas bloquer le zoom (`maximum-scale` interdit). Respecter `prefers-reduced-motion`.
- Le JavaScript est une amélioration : le contenu doit rester utilisable sans JS (voir le planning).

## Performance et RGPD

- **Aucun cookie, aucun script ni embed tiers chargé d'office** (pas de Google Analytics, reCAPTCHA, widgets Facebook/Instagram, Google Fonts distantes). Une carte ou une vidéo se charge au clic.
- Images via `astro:assets` (AVIF/WebP, dimensions explicites, lazy-load sous la ligne de flottaison). Pas de vidéo de fond.
- Polices auto-hébergées. Viser un poids d'accueil inférieur à 1 Mo.

## Git

- Dépôt : https://github.com/EricReflop/faceaface (public), branche `main`.
- Messages de commit en français. Ne pousser qu'à la demande du propriétaire.
