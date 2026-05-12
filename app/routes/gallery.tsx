import type { Route } from "./+types/gallery";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import { NavBar } from "../components/NavBar/navbar";
import { apiBaseUrl } from "../apiBaseUrl";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg Gallery" },
    {
      name: "description",
      content: "Photos and videos from events, kitchens, and private dining.",
    },
  ];
}

export type GalleryItem = {
  id: number;
  name: string;
  media_type: "image" | "video" | string;
  url: string | null;
  sort_order: number;
  publishedAtMs: number;
  updatedAtMs: number;
};

function galleryListUrl(request: Request): string {
  if (import.meta.env.DEV && !import.meta.env.SSR) {
    return new URL("/api/gallery/", request.url).href;
  }
  return `${apiBaseUrl()}/api/gallery/`;
}

function resolveMediaUrl(relativeOrAbsolute: string | null): string | null {
  if (!relativeOrAbsolute) return null;
  if (
    relativeOrAbsolute.startsWith("http://") ||
    relativeOrAbsolute.startsWith("https://")
  ) {
    return relativeOrAbsolute;
  }
  const base = apiBaseUrl();
  if (relativeOrAbsolute.startsWith("/")) {
    return `${base}${relativeOrAbsolute}`;
  }
  return `${base}/${relativeOrAbsolute}`;
}

function parseGalleryId(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && /^\d+$/.test(raw)) return Number(raw);
  return null;
}

function parseIsoMs(value: unknown): number {
  if (typeof value !== "string") return 0;
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : 0;
}

function parseSortOrder(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return 0;
}

function normalizeGalleryItem(value: unknown): GalleryItem | null {
  if (!value || typeof value !== "object") return null;
  const o = value as Record<string, unknown>;
  const id = parseGalleryId(o.id);
  const name = typeof o.name === "string" ? o.name : null;
  const media_type =
    typeof o.media_type === "string" ? o.media_type : "image";
  const url =
    o.url === null || typeof o.url === "string" ? o.url : null;
  if (id === null || name === null) return null;
  const publishedAtMs = parseIsoMs(o.published_at);
  const updatedAtMs = parseIsoMs(o.updated_at);
  const sort_order = parseSortOrder(o.sort_order);
  return {
    id,
    name,
    media_type,
    url,
    sort_order,
    publishedAtMs,
    updatedAtMs,
  };
}

/** Newest-first (typical camera roll), then explicit sort_order, then id. */
function sortGalleryItems(items: GalleryItem[]): GalleryItem[] {
  return [...items].sort((a, b) => {
    const pub = b.publishedAtMs - a.publishedAtMs;
    if (pub !== 0) return pub;
    const upd = b.updatedAtMs - a.updatedAtMs;
    if (upd !== 0) return upd;
    const ord = a.sort_order - b.sort_order;
    if (ord !== 0) return ord;
    return b.id - a.id;
  });
}

function parseGalleryPayload(payload: unknown): GalleryItem[] {
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  const results = record.results;
  if (!Array.isArray(results)) return [];
  return results
    .map(normalizeGalleryItem)
    .filter((item): item is GalleryItem => item !== null);
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch(galleryListUrl(request));
  if (!response.ok) {
    throw new Response("Failed to fetch gallery from API.", {
      status: response.status,
    });
  }
  const payload: unknown = await response.json();
  const items = sortGalleryItems(parseGalleryPayload(payload));
  return { items };
}

function isVideo(mediaType: string): boolean {
  return mediaType.toLowerCase() === "video";
}

export default function Gallery() {
  const data = useLoaderData<typeof loader>();
  const items = data?.items ?? [];

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-700">
            Gallery
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Moments from the table
          </h1>
          <p className="max-w-3xl text-base text-zinc-700 sm:text-lg">
            Published photos and videos from recent work—newest updates appear
            first in the grid.
          </p>
        </section>

        <section className="mt-8">
          {items.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-600 shadow-sm">
              No published gallery items yet.
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 shadow-sm sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {items.map((item) => {
                const src = resolveMediaUrl(item.url);
                const video = isVideo(item.media_type);
                return (
                  <li
                    key={item.id}
                    className="flex min-w-0 flex-col bg-white"
                  >
                    <div className="relative aspect-square w-full bg-zinc-100">
                      {src && video ? (
                        <video
                          src={src}
                          className="h-full w-full object-cover"
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={item.name}
                        />
                      ) : src ? (
                        <img
                          src={src}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-2 text-center text-xs text-zinc-500">
                          No file
                        </div>
                      )}
                    </div>
                    <p
                      className="truncate border-t border-zinc-100 px-1.5 py-1.5 text-center text-[10px] font-medium leading-tight text-zinc-800 sm:text-xs"
                      title={item.name}
                    >
                      {item.name}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.data || "Unable to load gallery."
    : error instanceof Error
      ? error.message
      : "Unexpected error loading gallery.";

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-700">
            Gallery unavailable
          </p>
          <h1 className="mb-4 text-2xl font-bold text-red-950 sm:text-3xl">
            Could not load gallery
          </h1>
          <p className="max-w-3xl text-red-800">{message}</p>
          <p className="mt-4 text-sm text-red-700">
            In development, `/api/` is proxied to your API. Set{" "}
            <code className="rounded bg-red-100 px-1">VITE_API_BASE_URL</code> for
            production and allow CORS if the API is on another origin.
          </p>
        </section>
      </main>
    </>
  );
}
