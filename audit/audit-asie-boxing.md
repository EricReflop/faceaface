# Audit — asie-boxing.fr (Face à Face, Muay Thaï Reims)

*Date : 6 novembre 2026 · Site analysé : https://www.asie-boxing.fr/ (WordPress + BeTheme)*
*Méthode : navigateur, viewports 1280 px et 375 px ; mesures via Performance API, analyse du HTML des 11 URL du sitemap.*

---

## Synthèse

| Axe | Note | En une phrase |
|---|---|---|
| Performance | 🔴 Critique | **~20 Mo et 140 requêtes** pour l'accueil, dont une vidéo de fond de ~14 Mo téléchargée deux fois. |
| SEO | 🔴 Critique | Meta description **« Just another WordPress site » sur toutes les pages**, pas de données structurées locales, page en double. |
| UX / parcours | 🟠 Important | Pas de message ni de CTA au premier écran ; le planning est à **4 écrans de scroll** sur mobile. |
| Accessibilité | 🟠 Important | Zoom bloqué, ~70 % d'images sans `alt` sur l'accueil, formulaires sans `<label>`, contraste rouge limite. |
| RGPD | 🔴 Critique | Cookies Google Analytics posés **sans consentement**, aucune bannière. |

**Les 5 actions au plus fort impact pour la V2**

1. Supprimer la vidéo de fond et le slider : hero statique (image AVIF + titre + CTA « Cours d'essai gratuit »).
2. Rédiger un title + meta description uniques par page, et ajouter un JSON-LD `SportsClub` avec les 3 salles.
3. Remonter le planning en haut de l'accueil, sous forme filtrable par âge / niveau / salle.
4. Remplacer les widgets Facebook / Instagram par des actus publiées sur le site.
5. Analytics sans cookies et formulaires sans reCAPTCHA → plus besoin de bannière.

---

## 1. Performance — 🔴

| Mesure (accueil, desktop) | Valeur | Cible V2 |
|---|---|---|
| Poids total transféré | **~20,3 Mo** | < 1 Mo |
| Requêtes | **140** | < 30 |
| HTML seul | 286 Ko | < 50 Ko |
| CSS en ligne (`<style>`) | 115 Ko | < 15 Ko |
| Feuilles CSS | 40 | 1–2 |
| Scripts | 44 (~3 Mo), dont jQuery + jQuery Migrate | 0–3 petits modules |
| Polices | Google Fonts (×3 appels) + **3 copies de Font Awesome** | 2 polices auto-hébergées, icônes SVG |
| Domaines tiers | 13 (Google, Facebook CDN, OSM, s.w.org, bootstrapcdn…) | 0–1 |
| TTFB | 277 ms | < 200 ms (CDN statique) |

**Constats**

- **B1 — Vidéo de fond `GX011116_smoothed_1.m4v`** en `preload="auto"` : 7,3 Mo + 6,9 Mo téléchargés (deux requêtes). C'est 70 % du poids de la page, et elle est aussi chargée sur mobile.
  → Supprimer, ou la remplacer par une image poster ; si une vidéo est indispensable : < 1,5 Mo, `preload="none"`, désactivée sur mobile et en cas de `prefers-reduced-motion`.
- **B2 — Premier écran blanc** : après 3 s, le hero n'affiche qu'un loader (Revolution Slider). ([capture 01](captures/01-desktop-accueil-chargement.jpg), [capture 04](captures/04-mobile-accueil-hero-vide.jpg))
  → Hero HTML/CSS natif, image LCP en `fetchpriority="high"`.
- **I1 — Empilement d'extensions** : 2 extensions Facebook, Popup Maker, Contact Form 7 + addon pays, WP Google Maps, Leaflet/OSM, Masonry, jPlayer, emoji WP… chacune ajoute CSS + JS sur toutes les pages.
- **I2 — Images** : PNG non optimisés (ex. `temple2-Converti.png` 116 Ko), aucune version AVIF/WebP.
- **I3 — Carte OSM chargée d'office** (15 tuiles) en bas de page.
  → Image statique de la carte + lien « Ouvrir la carte », ou carte chargée au clic.

## 2. SEO — 🔴

| Page | Title | Meta description | H1 |
|---|---|---|---|
| / | Face à Face - Club de Muay Thaï - Boxe Thaï à Reims ✅ | ❌ « Just another WordPress site » | ❌ 2 H1 |
| /le-club/ | Le club - Face à Face… | ❌ idem | Le Club |
| /jean-marc-guillot/ | Jean-Marc GUILLOT - … | ❌ idem | ✅ |
| /le-muay-thai/ | Le Muay Thaï - … | ❌ idem | ✅ |
| /inscription/ | Inscription - … | ❌ idem | ✅ |
| /envie-dessayer/ | Envie d'essayer ? - … | ❌ idem | ✅ |
| /envie-dessayer-2/ | **Envie d'essayer 2 ?** | ❌ idem | ❌ doublon |
| /actualites/ | Actualités - … | ❌ idem | ✅ |
| /contact/ | Contact - … | ❌ idem | ✅ |
| /gallery/ | Galerie - … | ❌ idem | « En images » (153 mots) |
| /politique-de-protection-des-donnees/ | ✅ | ❌ idem | ✅ |

**Constats**

- **B3 — Meta description par défaut de WordPress sur 100 % des pages.** C'est le texte affiché dans Google sous le titre : zéro incitation au clic, et une image d'amateurisme.
- **B4 — Pas de données structurées locales** : le JSON-LD (AIOSEO) contient seulement `Organization` (sans logo, adresse ni téléphone), `WebSite`, `WebPage` et `BreadcrumbList` (« Domicile », traduction erronée de « Home »).
  → `SportsClub` avec les 3 salles (`location` / `PostalAddress` / `geo`), `openingHoursSpecification` tirée du planning, `sameAs` Instagram/Facebook, `logo`.
- **I4 — Page en double** `/envie-dessayer-2/` indexée dans le sitemap → contenu dupliqué. À rediriger en 301 vers `/envie-dessayer/`.
- **I5 — Titles peu ciblés** : « Le club - Face à Face… » ne contient ni « boxe thaï » ni « Reims » en tête. Exemples V2 :
  - Accueil : *Boxe thaï & Muay Thaï à Reims — Club Face à Face, cours enfants et adultes*
  - Essai : *Cours d'essai gratuit de boxe thaï à Reims — Face à Face*
  - Inscription : *Inscription & tarifs 2026-2027 — Muay Thaï Reims*
- **I6 — Contenu actus non indexable** : les actus sont des widgets Facebook/Instagram (iframes/JS) que Google n'attribue pas au site. Le site n'a **aucun article** propre (le sitemap ne contient que des pages).
- **I7 — Téléphone absent** (pas de lien `tel:`) ; seul un e-mail Gmail est visible. Le NAP (nom, adresse, téléphone) doit être identique au site et à Google Business Profile.
- **C1 — Hiérarchie** : sur les pages internes, on passe de H1 à H3 directement ; sur l'accueil, deux H1.
- **C2 — Le sitemap** référence aussi `sitemap.rss` (inutile) ; `robots.txt` correct.

**URL à conserver ou rediriger (301) en V2**

```
/                         → /
/le-club/                 → /le-club/
/jean-marc-guillot/       → /le-club/#coachs   (ou page coach conservée)
/le-muay-thai/            → /le-muay-thai/
/inscription/             → /inscription/
/envie-dessayer/          → /cours-essai/      (ou conserver le slug)
/envie-dessayer-2/        → /cours-essai/
/actualites/              → /actualites/
/contact/                 → /contact/
/gallery/                 → /le-club/#galerie
/politique-de-protection-des-donnees/ → /confidentialite/
```

## 3. UX & parcours — 🟠

Parcours type : *« Je cherche un cours de boxe thaï à Reims pour moi / mon enfant »*.

- **B5 — Aucune proposition de valeur au premier écran** : sur mobile, logo + loader puis « L'actu du club ». Le visiteur ne sait pas ce qu'il peut faire ni où cliquer. ([capture 04](captures/04-mobile-accueil-hero-vide.jpg))
  → Hero : « Boxe thaï à Reims · dès 5 ans · 3 salles », avec 2 CTA : **Essayer gratuitement** / **Voir les horaires**.
- **I8 — Planning enfoui** : sur mobile, la section « Les entraînements » commence à **3 250 px (≈ 4 écrans)**, après 6 vidéos Instagram et 2 longs posts Facebook. ([capture 05](captures/05-mobile-flux-instagram.jpg))
- **I9 — Planning difficile à lire** : par catégorie, les jours et les horaires sont dans deux colonnes séparées (« Lundi / Mercredi / Jeudi » puis « 20h00 / 15h15 / 20h00 »), il faut les apparier mentalement ; « Jeudi » apparaît deux fois sans explication. ([capture 03](captures/03-desktop-planning.jpg))
  → Une ligne = un créneau (jour · heure · salle · coach), filtres âge / niveau / salle, lien « Itinéraire » vers chaque salle.
- **I10 — Deux parcours d'inscription concurrents** : popups « Je m'inscris pour la première fois » / « Je me réinscris » (formulaires CF7 qui demandent lieu de naissance, profession…) **et** un bouton HelloAsso sur `/inscription/`. On ne sait pas lequel est le bon.
  → Un seul parcours : HelloAsso (paiement + données) ; la page explique les étapes.
- **I11 — Titre « Les entrainements » coupé** sur mobile par le badge reCAPTCHA, qui masque aussi le contenu en bas à droite sur toutes les pages. ([capture 06](captures/06-mobile-titre-planning-coupe.jpg))
- **I12 — Contenus datés dans le flux** : « Dernière chance pour tester » (octobre) reste en tête de l'accueil en novembre.
- **C3 — Tarifs** : présentés en grille de cartes très longue sur mobile ; une table comparative compacte (catégorie × formule) serait plus lisible.
- **C4 — Microcopie** : « entrainements » sans accent circonflexe ; « Enter your search » (champ de recherche en anglais) ; « Domicile » dans le fil d'Ariane.

## 4. Accessibilité (RGAA 4.1 / WCAG 2.2 AA) — 🟠

- **B6 — Zoom bloqué** : `<meta name="viewport" content="…, maximum-scale=1">` empêche les malvoyants d'agrandir sur certains navigateurs (WCAG 1.4.4).
- **I13 — Images sans `alt`** : 56 sur 82 sur l'accueil, 119 sur 132 sur `/actualites/`. Les liens Instagram/Facebook du pied de page n'ont **aucun nom accessible**.
- **I14 — Formulaires sans `<label>`** : uniquement des placeholders (Nom, Email, Téléphone, Message, Date de naissance sans placeholder du tout) → illisible pour les lecteurs d'écran et pour la mémoire de l'utilisateur.
- **I15 — Contraste** : rouge `#F00000` sur blanc = **4,47:1** (en dessous de 4,5:1 pour le texte courant) ; le titre rouge « Inscription » sur photo est peu lisible. ([capture 07](captures/07-mobile-inscription-contraste-h1.jpg))
- **I16 — Pas de lien d'évitement** (« Aller au contenu ») ; un seul `<nav>`.
- **I17 — Mouvement** : vidéo de fond en autoplay sans bouton pause ni respect de `prefers-reduced-motion` (WCAG 2.2.2).
- **C5 — 11 cibles tactiles < 24 px** sur mobile (WCAG 2.5.8).
- ✅ Points positifs : `lang="fr-FR"`, `main` / `header` / `footer` présents, bouton du menu mobile avec `aria-label`, corps de texte en 16 px sur `#1E232B`.

## 5. RGPD & confiance — 🔴

- **B7 — Cookies `_ga` et `_ga_*` déposés dès l'arrivée**, sans bannière ni consentement (CNIL : Google Analytics nécessite un consentement préalable).
- **I18 — reCAPTCHA (Google) et embeds Facebook** chargés sur toutes les pages, sans consentement → transfert de données hors UE.
- **I19 — Collecte excessive** dans les popups d'inscription (lieu de naissance, pays, profession) alors que HelloAsso gère déjà l'inscription.
- **C6 — Mentions légales** : pas de page dédiée trouvée (seulement la politique de données).
- → **V2** : analytics sans cookies (Plausible / Matomo sans cookies / Netlify Analytics), formulaire Netlify + honeypot, aucun embed tiers chargé d'office ⇒ **aucune bannière nécessaire**.

## 6. Ce qui fonctionne et à garder

- Identité forte : logo, rouge / noir, typographie condensée (Anton), motif thaï : une bonne base pour le design system Figma.
- Contenu riche : planning détaillé, 3 salles avec adresses, tarifs complets avec réductions (Pass Sport, parrainage, famille), biographie du coach, histoire du Muay Thaï.
- Domaine ancien, URL propres, HTTPS, canonical présents : un capital SEO à préserver par les redirections.
- Inscription en ligne via HelloAsso déjà en place.

---

## 7. Recommandations pour la V2

**Technique** : Astro (statique), contenu en collections (`planning.json`, `salles.json`, `coachs/`, `actus/*.md`), Netlify (CDN, formulaires, `_redirects`), Decap CMS optionnel pour le club. Aucun WordPress.

**Architecture proposée** (à valider dans Figma)

```
Accueil
├── Cours & horaires        (planning filtrable + 3 salles)
├── Cours d'essai gratuit   (dates, modalités, formulaire court)
├── Inscription & tarifs    (étapes + HelloAsso)
├── Le club                 (histoire, coachs, galerie)
├── Le Muay Thaï            (contenu éditorial — bon pour le SEO)
├── Actualités              (articles sur le site)
└── Contact                 (formulaire, téléphone, e-mail, salles)
Pied de page : mentions légales · confidentialité · réseaux
```

**Composants à prévoir dans le design system Figma**
Header + menu mobile, hero, bouton (primaire / secondaire / lien), carte créneau, tableau planning + filtres (chips), carte salle (adresse + itinéraire), carte tarif / table tarifs, carte actu, bloc coach, formulaire (label, aide, erreur), bandeau CTA « Essai gratuit », pied de page. Tokens : couleurs (avec un **rouge accessible ≥ 4,5:1**, par ex. `#D00000` ≈ 5,7:1 sur blanc), typographie (Anton titres / Lato texte), espacements, rayons, ombres.

**Objectifs mesurables V2**

| Indicateur | Actuel | Cible |
|---|---|---|
| Poids accueil | ~20 Mo | < 1 Mo |
| Requêtes | 140 | < 30 |
| LCP mobile | > 3 s (hero vide) | < 2 s |
| Pages avec meta description unique | 0 / 11 | 100 % |
| Images avec `alt` pertinent | ~30 % | 100 % |
| Cookies sans consentement | 2 | 0 |
| Lighthouse SEO / Perf / A11y | — | ≥ 95 / ≥ 95 / ≥ 95 |

---

### Annexe — captures

| # | Fichier | Constat |
|---|---|---|
| 01 | [desktop-accueil-chargement](captures/01-desktop-accueil-chargement.jpg) | Hero blanc + loader après 3 s |
| 02 | [desktop-actu-widgets](captures/02-desktop-actu-widgets.jpg) | Widgets Instagram/Facebook en tête |
| 03 | [desktop-planning](captures/03-desktop-planning.jpg) | Planning jours / horaires dissociés |
| 04 | [mobile-accueil-hero-vide](captures/04-mobile-accueil-hero-vide.jpg) | Aucun message ni CTA au 1er écran |
| 05 | [mobile-flux-instagram](captures/05-mobile-flux-instagram.jpg) | 6 vidéos avant le planning |
| 06 | [mobile-titre-planning-coupe](captures/06-mobile-titre-planning-coupe.jpg) | Titre masqué par le badge reCAPTCHA |
| 07 | [mobile-inscription-contraste-h1](captures/07-mobile-inscription-contraste-h1.jpg) | H1 rouge sur photo |
| 08 | [mobile-inscription-cta](captures/08-mobile-inscription-cta.jpg) | CTA HelloAsso (à garder comme parcours unique) |

*Légende gravité : B = bloquant · I = important · C = confort.*
