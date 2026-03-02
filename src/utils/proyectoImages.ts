// src/utils/proyectoImages.ts
// Resuelve imágenes de proyectos (cover / cualquier archivo) basado en el string del JSON.
// Ejemplo JSON: "portada": "proj_001/cover.webp"

export const projectImages = import.meta.glob(
  "/src/assets/images/proyecto/**/*.{jpg,jpeg,png,webp}",
  { eager: true }
) as Record<string, { default: ImageMetadata }>;

export function getProjectImageFromPath(pathFromJson: string): ImageMetadata | null {
  // pathFromJson: "proj_001/cover.webp"
  const full = `/src/assets/images/proyecto/${pathFromJson}`;
  const entry = projectImages[full];
  return entry?.default ?? null;
}