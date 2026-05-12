import type { Route } from "./+types/about";
import { useState } from "react";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "react-router";
import { NavBar } from "../components/NavBar/navbar";
import { apiBaseUrl } from "../apiBaseUrl";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Private Chef Greg" },
    {
      name: "description",
      content:
        "Learn about Chef Greg's private dining philosophy and training approach.",
    },
  ];
}

const API_BASE = apiBaseUrl();

function siteContentUrl(request: Request): string {
  if (import.meta.env.DEV && !import.meta.env.SSR) {
    return new URL("/api/v1/site-content/", request.url).href;
  }
  return `${API_BASE}/api/v1/site-content/`;
}

type SiteContent = Record<string, unknown>;

function getStringValue(content: SiteContent, keys: string[]): string | null {
  for (const key of keys) {
    const value = content[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return null;
}

function extractContentFromResponse(payload: unknown): SiteContent {
  if (Array.isArray(payload) && payload.length > 0) {
    return extractContentFromResponse(payload[0]);
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const content = record.content;
    if (content && typeof content === "object") {
      return content as SiteContent;
    }
    return record;
  }
  return {};
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch(siteContentUrl(request));
  if (!response.ok) {
    throw new Response("Failed to fetch site content from backend API.", {
      status: response.status,
    });
  }

  const payload: unknown = await response.json();
  const content = extractContentFromResponse(payload);

  const personalBio = getStringValue(content, [
    "personalBio",
    "personal_bio",
    "bio_personal",
    "personal",
  ]);
  const professionalBio = getStringValue(content, [
    "professionalBio",
    "professional_bio",
    "bio_professional",
    "professional",
  ]);

  if (!personalBio || !professionalBio) {
    throw new Response(
      "Site content API is missing personal/professional bio fields.",
      { status: 502 },
    );
  }

  return { personalBio, professionalBio };
}

export default function About() {
  const data = useLoaderData<typeof loader>();
  const personalBio = data?.personalBio ?? "";
  const professionalBio = data?.professionalBio ?? "";
  const [showPersonalBio, setShowPersonalBio] = useState(false);
  const [showProfessionalBio, setShowProfessionalBio] = useState(false);

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-700">
            About Chef Greg
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Private chef service with a performance mindset.
          </h1>
          <p className="max-w-3xl text-base text-zinc-700 sm:text-lg">
            I combine culinary craft with athletic discipline to deliver meals
            and experiences that are both memorable and intentional. Whether
            you are hosting at home or planning around a demanding training
            schedule, every menu is tailored to your goals.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              Personal Bio
            </p>
            <h2 className="mb-3 text-2xl font-bold text-zinc-950">
              The person behind the food
            </h2>
            <p
              className="whitespace-pre-line text-zinc-700"
              style={
                showPersonalBio
                  ? undefined
                  : {
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
              }
            >
              {personalBio}
            </p>
            <button
              type="button"
              onClick={() => setShowPersonalBio((show) => !show)}
              className="mt-3 text-sm font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
            >
              {showPersonalBio ? "Show less" : "Read more"}
            </button>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              Professional Bio
            </p>
            <h2 className="mb-3 text-2xl font-bold text-zinc-950">
              Culinary and performance expertise
            </h2>
            <p
              className="whitespace-pre-line text-zinc-700"
              style={
                showProfessionalBio
                  ? undefined
                  : {
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
              }
            >
             {professionalBio}
            </p>
            <button
              type="button"
              onClick={() => setShowProfessionalBio((show) => !show)}
              className="mt-3 text-sm font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
            >
              {showProfessionalBio ? "Show less" : "Read more"}
            </button>
          </article>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-zinc-950">My style</h2>
            <p className="text-zinc-700">
              Seasonal ingredients, clean execution, and hospitality that feels
              personal from first course to final plate.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-zinc-950">My focus</h2>
            <p className="text-zinc-700">
              Menus designed for your event type, dietary preferences, and
              nutrition priorities without sacrificing flavor.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-zinc-950">My promise</h2>
            <p className="text-zinc-700">
              Professional planning, clear communication, and a polished service
              flow so you can relax and enjoy your guests.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-2xl bg-zinc-900 p-6 text-white sm:p-8">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
            Ready to plan your experience?
          </h2>
          <p className="mb-5 max-w-2xl text-zinc-200">
            Share your occasion, location, and guest count. I will help you map
            out a custom dining plan that fits your vision.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition hover:bg-zinc-100"
          >
            Contact Chef Greg
          </Link>
        </section>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.data || "Unable to load About page content."
    : error instanceof Error
      ? error.message
      : "Unexpected error loading About page.";

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-700">
            Content Loading Error
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-red-950 sm:text-4xl md:text-5xl">
            Could not load bio content from API
          </h1>
          <p className="max-w-3xl text-base text-red-800 sm:text-lg">{message}</p>
          <p className="mt-4 text-sm text-red-700">
            In development, API calls go through the Vite proxy (`/api` → Django).
            Confirm the backend is running and set `VITE_API_BASE_URL` (or
            `VITE_API_URL`) for production builds.
          </p>
        </section>
      </main>
    </>
  );
}
