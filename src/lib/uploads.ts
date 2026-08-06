import path from "path";
import { promises as fs } from "fs";

/**
 * Uploaded gallery photos are stored OUTSIDE of `public/`, in an `uploads/`
 * folder at the project root. This is intentional: the deploy workflow
 * (.github/workflows/deploy.yml) rebuilds and re-copies `public/` on every
 * push, which would silently delete anything an admin uploaded through the
 * panel. `uploads/` at the project root is never touched by the deploy
 * script, so photos survive redeploys. Files are served through
 * /api/uploads/gallery/[filename] instead of being linked directly.
 */
export function uploadsGalleryDir(): string {
  return path.join(process.cwd(), "uploads", "gallery");
}

export async function ensureUploadsGalleryDir(): Promise<string> {
  const dir = uploadsGalleryDir();
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

const ALLOWED_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export function extensionForMimeType(mime: string): string | null {
  return ALLOWED_EXTENSIONS[mime] ?? null;
}
