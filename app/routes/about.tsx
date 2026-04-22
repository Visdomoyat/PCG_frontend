import type { Route } from "./+types/about";
import { useState } from "react";
import { Link } from "react-router";
import { NavBar } from "../components/NavBar/navbar";

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

export default function About() {
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
              className="text-zinc-700"
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
              Greg grew up in a military household where change was constant and structure was a given. 
              He spent a large part of his childhood living overseas, surrounded by different cultures, people, and ways of life. 
              That environment shaped him early,it taught him how to adapt, listen, and move comfortably through unfamiliar spaces. <br />

              At home, there was a strong foundation. His father worked in law enforcement, his mother was an engineer, and his stepfather served in the military.
              Between them, discipline, respect, and accountability weren’t optional; they were simply how things were done. Setting goals, 
              following through, and taking education seriously were expectations, not suggestions. <br /> <br />   

              Right out of high school, he was drafted into the minor leagues and spent two years playing professional baseball. 
              For a time, that was his path. When that chapter came to an end, however, he found himself in a place many people experience 
              but don’t often discuss—out of shape, off track, yet still searching for what was next. <br /> <br />

              That period forced a shift. He made the decision to rebuild physically, mentally, and personally. He attended culinary school, 
              earned certifications in fitness, and committed to living a healthier lifestyle. What began as a personal reset developed into something deeper. <br />

              He realized he didn’t just want to improve himself; he wanted to support others at a high level. Not in one lane, but across the board. 
              Through personal experience, his goal became to create a well-rounded approach to performance and well-being: 
              to be someone who could cook with intention, train with purpose, and understand nutrition in a way that translates into real life. <br />

              At the core of it all is a simple belief: everything is connected. The way you eat, the way you move, and the way you take care of yourself 
              mentally all feed into each other. When those elements are aligned, performance; whatever that looks like for the individual follows. <br />

              This is the foundation he continues to build on. <br /> <br />
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
              className="text-zinc-700"
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
             Greg operates at the intersection of elite performance, nutrition, and culinary precision, delivering a fully integrated 
             approach to high-performance living. <br /> <br />

             A top-of-class culinary school graduate, he brings over five years of experience as a private chef serving elite professional athletes. 
             His work goes far beyond preparing meals. He designs and executes complete nutritional systems that directly support performance, 
             recovery, and long-term career sustainability. <br /> <br />

             Before stepping into the culinary and performance space, he was drafted out of high school to play professional baseball 
             as a catcher in the minor leagues. That firsthand experience competing at a high level gives him a deep, practical understanding 
             of the physical and mental demands athletes face daily. <br /> <br />

             He holds multiple certifications through NASM, including Personal Training, Nutrition Coaching, Corrective Exercise, and 
             Performance Enhancement. This foundation allows him to bridge the gap between the kitchen and performance training, aligning food, 
             movement, and recovery into one cohesive strategy. <br /> <br />

             As a Performance Chef, he takes responsibility for the entire performance ecosystem—supporting injury prevention, optimizing recovery, 
             and maximizing output through precision-based nutrition. Every meal, ingredient, and protocol is intentional and aligned with measurable 
             results. <br /> <br />

             His culinary range spans all cuisines, including vegan and specialized diets, with an emphasis on clean, functional, 
             and performance-driven nutrition. He also specializes in advanced juicing protocols, creating unique organic blends designed for 
             pre- and post-workout recovery, gut health, energy optimization, and immune support. <br /> <br />

             As a High-Performance Lifestyle Coach, he combines the skill set of an elite private chef, 
             the science of a nutrition expert, and the application of a strength and conditioning specialist—offering clients a comprehensive, 
             results-driven system built for those who demand the highest level of performance in every area of life. <br /> <br />
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
