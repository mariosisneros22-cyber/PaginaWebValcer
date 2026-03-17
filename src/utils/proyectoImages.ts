import type { ImageMetadata } from "astro";

type ProjectImageModule = { default: ImageMetadata };

const projectImages = import.meta.glob<ProjectImageModule>(
  "/src/assets/images/proyecto/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

function toProjectImageKey(pathFromJson: string): string {
  return `/src/assets/images/proyecto/${pathFromJson}`;
}

export function getProjectImageFromPath(pathFromJson: string): ImageMetadata | null {
  const entry = projectImages[toProjectImageKey(pathFromJson)];
  return entry?.default ?? null;
}

export function getProjectImageOrThrow(pathFromJson: string): ImageMetadata {
  const image = getProjectImageFromPath(pathFromJson);
  if (!image) {
    throw new Error(`Imagen no encontrada: ${toProjectImageKey(pathFromJson)}`);
  }
  return image;
}

export function getProjectImageUrlFromPath(pathFromJson: string): string {
  return getProjectImageFromPath(pathFromJson)?.src ?? "";
}
