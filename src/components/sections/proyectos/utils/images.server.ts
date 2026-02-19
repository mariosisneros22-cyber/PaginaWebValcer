import type { ImageMetadata } from "astro";

type ImgModule = { default: ImageMetadata };

const imgs = import.meta.glob<ImgModule>(
  "../../../../assets/images/proyecto/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true }
);

export function resolveProjectAssetUrl(relPath: string): string {
  const key = `../../../../assets/images/proyecto/${relPath}`;
  const mod = imgs[key];
  return mod ? mod.default.src : "";
} 