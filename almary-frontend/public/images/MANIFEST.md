# Manifest immagini — Almary Dream

I componenti usano ora dei **placeholder SVG** (sfondo gradiente brand). Per inserire le foto reali:

1. Carica il file nella cartella indicata.
2. Aggiorna il path corrispondente in `src/lib/site.ts` (campi `heroImage` e `image` di ogni camera).

> I contenitori hanno **aspect-ratio fisso**: sostituendo l'immagine **non si verifica alcun layout shift**, qualunque sia la dimensione reale del file.

## Slot richiesti

| Slot | File suggerito | Dimensione | Soggetto | Peso target |
|------|----------------|-----------|----------|-------------|
| Hero | `hero/hero.jpg` | ≥ 1920×1080 (16:9) | Esterno struttura / vista mare emozionale | < 250 KB |
| Camera Smeraldo | `rooms/smeraldo.jpg` | 1200×900 (4:3) | Camera Smeraldo (parete Tiffany) | < 180 KB |
| Camera Dream | `rooms/dream.jpg` | 1200×900 (4:3) | Camera Dream (toni naturali) | < 180 KB |
| Camera Blue Sky | `rooms/blue-sky.jpg` | 1200×900 (4:3) | Camera Blue Sky (parete cielo) | < 180 KB |
| OG / Social | `og-image.jpg` | 1200×630 | Immagine condivisione Ads/social | < 200 KB |
| Gallery (opz.) | `gallery/*.jpg` | 1200×900 | Colazione, zona relax, dintorni | < 180 KB |

## Suggerimenti performance

- Esporta in **WebP** o **AVIF** quando possibile (Next ottimizza comunque automaticamente).
- Comprimi prima del caricamento (es. squoosh.app) per restare sotto i pesi target.
- Mantieni le proporzioni indicate per evitare ritagli indesiderati.
