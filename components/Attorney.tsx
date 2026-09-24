import Image from "next/image";
import { firm } from "@/lib/data";

export default function Attorney() {
  return (
    <section id="attorney" className="bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-navy-line shadow-2xl shadow-black/30">
          <Image
            src={firm.attorneyBanner}
            alt="The attorney speaking at a podium, beside a statue of Lady Justice"
            width={1727}
            height={910}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Meet your attorney
            </h2>
            <p className="mt-3 text-lg text-gold">{firm.attorney}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Credentials">
              {firm.credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-gold/50 px-3 py-1 text-sm font-semibold text-gold-bright"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-white/80">
            <p>
             BarromaLaw is the law office of Atty. Joseph A.T. Barroma, an attorney and seasoned HR and data privacy professional with a background in HR, BPO, and business leadership.
            </p>
            <p>
              We provide onsite and online legal consultations designed to give you clarity when you need it most. 
              Start by telling us about your situation. We’ll help you understand the legal considerations, explore your available options, and identify the appropriate next steps.
            </p>
            <a
              href="#book"
              className="inline-flex rounded-md bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep transition-colors hover:bg-gold-bright"
            >
              Request a consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
