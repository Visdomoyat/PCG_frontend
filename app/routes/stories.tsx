import type { Route } from "./+types/stories";
import { Fragment, useState } from "react";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import { NavBar } from "../components/NavBar/navbar";
import { apiBaseUrl } from "../apiBaseUrl";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg Stories" },
    { name: "description", content: "Welcome to Private Chef Greg Stories!" },
  ];
}

const API_BASE = apiBaseUrl();

/** In dev, browser loaders use same-origin `/api` (Vite → Django). SSR runs in Node and calls Django directly. */
function storiesListUrl(request: Request): string {
  if (import.meta.env.DEV && !import.meta.env.SSR) {
    return new URL("/api/stories/", request.url).href;
  }
  return `${API_BASE}/api/stories/`;
}

export type Story = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
};

function resolveCoverImageSrc(coverUrl: string | null): string | null {
  if (!coverUrl) return null;
  if (coverUrl.startsWith("http://") || coverUrl.startsWith("https://")) {
    return coverUrl;
  }
  if (coverUrl.startsWith("/")) {
    return `${API_BASE}${coverUrl}`;
  }
  return `${API_BASE}/${coverUrl}`;
}

function parseStoriesPayload(payload: unknown): Story[] {
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  const results = record.results;
  if (!Array.isArray(results)) return [];
  return results
    .map(normalizeStoryFromApi)
    .filter((s): s is Story => s !== null);
}

function pickOptionalString(
  o: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const key of keys) {
    const v = o[key];
    if (typeof v === "string") return v;
  }
  return null;
}

/** Map API values to string; supports Django-style strings and occasional null. */
function pickStringField(
  o: Record<string, unknown>,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const v = o[key];
    if (typeof v === "string") return v;
    if (v != null && typeof v !== "object" && typeof v !== "undefined") {
      return String(v);
    }
  }
  return fallback;
}

function parseStoryId(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && /^\d+$/.test(raw)) return Number(raw);
  return null;
}

function normalizeStoryFromApi(value: unknown): Story | null {
  if (!value || typeof value !== "object") return null;
  const o = value as Record<string, unknown>;
  const id = parseStoryId(o.id);
  const title = typeof o.title === "string" ? o.title : null;
  const slug = typeof o.slug === "string" ? o.slug : null;
  if (id === null || title === null || slug === null) {
    return null;
  }

  const excerpt = pickStringField(o, ["excerpt", "summary", "description"]);
  const body = pickStringField(o, [
    "body",
    "content",
    "full_story",
    "fullStory",
    "story_body",
    "storyBody",
    "text",
  ]);

  const coverRaw = pickOptionalString(o, [
    "cover_image",
    "coverImage",
    "cover",
    "image",
  ]);
  const cover_image =
    coverRaw === null ? null : coverRaw.length > 0 ? coverRaw : null;

  return {
    id,
    title,
    slug,
    excerpt,
    body,
    cover_image,
  };
}

/** Compare excerpt vs body so minor whitespace differences still allow Read more when content differs. */
function excerptDiffersFromBody(excerpt: string, body: string): boolean {
  const e = excerpt.trim().replace(/\s+/g, " ");
  const b = body.trim().replace(/\s+/g, " ");
  return e !== b;
}

function shouldShowReadMore(story: Story): boolean {
  if (!story.body.trim()) return false;
  if (!story.excerpt.trim()) return true;
  return excerptDiffersFromBody(story.excerpt, story.body);
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch(storiesListUrl(request));
  if (!response.ok) {
    throw new Response("Failed to fetch stories from backend API.", {
      status: response.status,
    });
  }
  const payload: unknown = await response.json();
  const stories = parseStoriesPayload(payload);
  return { stories };
}

function StoryCard({ story }: { story: Story }) {
  const [expanded, setExpanded] = useState(false);
  const coverSrc = resolveCoverImageSrc(story.cover_image);
  const showReadMoreToggle = shouldShowReadMore(story);
  const paragraphText = expanded ? story.body : story.excerpt;

  return (
    <article className="py-8 first:pt-0">
      <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-8">
        {coverSrc ? (
          <div className="w-28 shrink-0 sm:w-36 md:w-52">
            <img
              src={coverSrc}
              alt={story.title}
              className="aspect-[3/4] w-full rounded-xl border border-zinc-200 object-cover shadow-sm"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">{story.title}</h2>
          <p className="whitespace-pre-line text-zinc-700">{paragraphText}</p>
          {showReadMoreToggle ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 text-sm font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Stories() {
  const data = useLoaderData<typeof loader>();
  const stories = data?.stories ?? [];

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-700">
            Stories
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Behind the menu
          </h1>
          <p className="max-w-3xl text-base text-zinc-700 sm:text-lg">
            Moments from the kitchen, events, and the craft of private dining.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          {stories.length === 0 ? (
            <p className="text-zinc-600">No stories are published yet.</p>
          ) : (
            stories.map((story, index) => (
              <Fragment key={story.slug}>
                {index > 0 ? (
                  <hr className="border-0 border-t border-zinc-200" />
                ) : null}
                <StoryCard story={story} />
              </Fragment>
            ))
          )}
        </section>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.data || "Unable to load stories."
    : error instanceof Error
      ? error.message
      : "Unexpected error loading stories.";

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-700">
            Stories unavailable
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-red-950 sm:text-4xl">
            Could not load stories
          </h1>
          <p className="max-w-3xl text-base text-red-800 sm:text-lg">{message}</p>
          <p className="mt-4 text-sm text-red-700">
            In development, the app loads stories through the Vite proxy at `/api`.
            For production, set `VITE_API_BASE_URL` (or `VITE_API_URL`) and ensure
            the API allows your site origin (CORS).
          </p>
        </section>
      </main>
    </>
  );
}
