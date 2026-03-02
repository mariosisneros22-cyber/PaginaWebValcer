// src/utils/serviciosImages.ts
// Resuelve imágenes desde src/assets para obtener URLs finales del build.

export const serviceCardImages = import.meta.glob(
  "/src/assets/images/servicios/cards/*.{jpg,jpeg,png,webp}",
  { eager: true }
) as Record<string, { default: ImageMetadata }>;

export function getServiceImageByKey(key: string): ImageMetadata {
  const base = `/src/assets/images/servicios/cards/${key}`;

  const entry =
    serviceCardImages[`${base}.webp`] ??
    serviceCardImages[`${base}.jpg`] ??
    serviceCardImages[`${base}.jpeg`] ??
    serviceCardImages[`${base}.png`];

  if (!entry) {
    throw new Error(
      `No se encontró imagen para imageKey="${key}". Colócala en src/assets/images/servicios/cards/ con nombre ${key}.webp|jpg|png`
    );
  }

  return entry.default;
}