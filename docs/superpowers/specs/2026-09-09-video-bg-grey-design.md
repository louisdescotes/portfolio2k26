# Fond gris vidéos papillons & Noémie scroll

## Objectif

Afficher un fond gris `#F2F2F2` derrière les vidéos transparentes / alpha des sections **Patience — Papillons** et **Noémie — Scroll**, et remplacer la vidéo scroll Noémie par une version optimisée de `Timeline 1.mov`.

## Contexte

- Les deux blocs utilisent `<Video>` avec `src` WebM + `srcMov` (HEVC) et `data-has-alpha`, ce qui force aujourd’hui `background: transparent` sur `.project-video`.
- Un gris de fond similaire existe déjà pour le personnage Patience (`#3c3c3c` via `.character-background`).
- La nouvelle source `Timeline 1.mov` est H.264 1920×1080, 5 s, `yuv420p` (pas d’alpha) — donc un seul MP4 suffit pour tous les navigateurs.

## Décisions

| Sujet | Choix |
| --- | --- |
| Couleur | `#F2F2F2` (token SCSS dédié) |
| Mécanisme fond | Classe CSS réutilisable sur le wrapper `.project-video` |
| Papillons | Garder les assets webm/mov existants + classe CSS |
| Noémie scroll | Remplacer par MP4 H.264 optimisé depuis `Timeline 1.mov` + classe CSS + nouveau poster |
| Portée | Uniquement ces deux `<Video>` — pas de changement global |

## Design

### 1. Token + classe

- Ajouter `$media-bg-grey: #F2F2F2` dans `variables.scss`.
- Ajouter `.video-bg-grey` dans `project-video.scss` :
  - `background: $media-bg-grey` sur le wrapper
  - doit gagner contre la règle actuelle `&:has(video[data-has-alpha='true']) { background: transparent }`

### 2. MDX

- `patience.mdx` — papillons : `class="video-bg-grey"`
- `noemie.mdx` — scroll : pointer vers le nouveau MP4 (sans `srcMov`), `class="video-bg-grey"`, poster mis à jour

### 3. Encodage Noémie scroll

Source : `/Users/louis/Desktop/Timeline 1.mov`

Sorties dans `public/projets/noemie/` :

- `noemiePortfolio-scroll.mp4` — H.264, yuv420p, sans audio, CRF ~26–28, `+faststart`, cible ~1 Mo
- `noemiePortfolio-scroll-poster.jpg` — frame représentative

Supprimer (ou laisser orphelins puis supprimer) les anciens `noemiePortfolio-scroll.webm` / `.mov` une fois le MDX basculé.

## Hors scope

- Changer le fond des autres vidéos projet
- Modifier le composant `Video.astro` (props) sauf usage de `class` déjà supporté
- Re-encoder les papillons

## Critères de succès

- Papillons et scroll Noémie montrent un fond `#F2F2F2` (y compris pendant le chargement / derrière l’alpha)
- Scroll Noémie lit correctement sur Chrome, Firefox, Safari (MP4 H.264)
- Poids du MP4 nettement inférieur aux ~11 Mo de la source
