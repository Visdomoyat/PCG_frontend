import type { Route } from "./+types/contact";
import { NavBar } from "../components/NavBar/navbar";
import contactImage from "../assets/contact.jpeg";

const FORMSUBMIT_ACTION = "https://formsubmit.co/gnajac428@gmail.com";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Private Chef Greg" },
    {
      name: "description",
      content:
        "Reach out for private dining, events, and performance-focused nutrition.",
    },
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
            Share your occasion, goals, and how we can help. I will reply as soon
            as I can.
          </p>
        </section>

        <section className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="order-2 lg:order-1">
            <img
              src={contactImage}
              alt="Private Chef Greg — contact"
              className="h-full min-h-[280px] w-full rounded-2xl border border-zinc-200 object-cover shadow-sm sm:min-h-[360px] lg:sticky lg:top-6 lg:max-h-[min(85vh,720px)]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-2 text-xl font-bold text-zinc-950">Send a message</h2>
              <p className="mb-6 text-sm text-zinc-600">
                Messages are delivered to{" "}
                <span className="font-medium text-zinc-800">gnajac428@gmail.com</span>.
              </p>

              <form
                action={FORMSUBMIT_ACTION}
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="_subject" value="PCG site contact form" />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <fieldset className="space-y-4">
                  <legend className="sr-only">From</legend>
                  <p className="text-sm font-semibold text-zinc-900">From</p>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 shadow-sm outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/20 sm:text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 shadow-sm outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/20 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-zinc-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 shadow-sm outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/20 sm:text-sm"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-700">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={7}
                    className="mt-1 block w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 shadow-sm outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/20 sm:text-sm"
                    placeholder="Tell me about your event, dates, location, and anything else that helps."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 sm:w-auto"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
