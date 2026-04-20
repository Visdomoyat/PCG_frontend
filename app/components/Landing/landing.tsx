import { Link } from "react-router";
import kitchenImage from "../../assets/Kichen.png";
import trainerImage from "../../assets/Trainer.png";
import dish1Image from "../../assets/dish1.png";

function Landing() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mt-0 sm:mt-3">
        <div className="relative min-h-[min(100vh,560px)] overflow-hidden rounded-1xl sm:rounded-2xl">
          <img
            src={kitchenImage}
            alt="Chef preparing food in the kitchen"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-black/80"
          />
          <div className="relative z-10 flex min-h-[min(85vh,560px)] flex-col justify-end px-6 py-12 sm:justify-center sm:px-10 sm:py-16 lg:px-14">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-900 sm:text-zinc-800">
                Elevate your performance & palate
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
                Elite chef & athletic trainer
              </h1>
              <p className="mb-8 max-w-xl text-base text-zinc-900 sm:text-lg">
                Private dining and coaching built around your goals—whether
                that is the table, the field, or both.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800"
                >
                  Explore my work
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-zinc-950 bg-white/90 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition hover:bg-white"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary + training split */}
      <section className="mt-10 grid gap-3 lg:grid-cols-2 lg:gap-10">
        <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/3]">
            <img
              src={dish1Image}
              alt="Plated dish from Private Chef Greg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="mb-2 text-2xl font-bold text-zinc-950">
              In-home dining
            </h2>
            <p className="mb-6 text-zinc-700">
              Custom menus, prep in your kitchen, and service that fits your
              occasion—from intimate dinners to celebrations.
            </p>
            <Link
              to="/gallery"
              className="inline-flex text-sm font-semibold text-zinc-950 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-950"
            >
              See the gallery
            </Link>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/3]">
            <img
              src={trainerImage}
              alt="Athletic training and coaching"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="mb-2 text-2xl font-bold text-zinc-950">
              Athletic training
            </h2>
            <p className="mb-6 text-zinc-700">
              Performance-focused coaching to complement how you eat, train,
              and recover—aligned with your schedule and goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex text-sm font-semibold text-zinc-950 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-950"
            >
              Book a conversation
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Landing;
