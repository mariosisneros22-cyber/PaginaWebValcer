import { getProjectImageUrlFromPath } from "../../../../utils/proyectoImages";

export function resolveProjectAssetUrl(relPath: string): string {
  return getProjectImageUrlFromPath(relPath);
}
