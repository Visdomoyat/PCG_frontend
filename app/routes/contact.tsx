import type { Route } from "./+types/contact";
import { NavBar } from "../components/NavBar/navbar";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg" },
    { name: "description", content: "Welcome to Private Chef Greg!" },
  ];
}

export default function Contact() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-700">
            Contact
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Get in touch
          </h1>
          <p className="max-w-3xl text-base text-zinc-700 sm:text-lg">
            I'm always looking for new opportunities and collaborations. Please feel free to contact me using the form below.
          </p>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </form>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
            Ready to plan your experience?
          </h2>
          <p className="mb-5 max-w-2xl text-zinc-200">
            Share your occasion, location, and guest count. I will help you map out a custom dining plan that fits your vision.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800"
          >
            Contact Chef Greg
          </Link>
        </section>
      </main>
    </>
  );
}
