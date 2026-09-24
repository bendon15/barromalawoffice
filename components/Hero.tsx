import Image from "next/image";
import { firm, trustPoints } from "@/lib/data";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="home" className="relative bg-navy-deep">
      <div className="relative min-h-[640px] overflow-hidden pt-28 sm:min-h-[700px]">
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%]">
          <Image
            src={firm.heroImage}
            alt="Statue of Lady Justice holding the scales"
            fill
            priority
            sizes="(min-width: 768px) 65vw, 100vw"
            className="object-cover object-[70%_top] opacity-50 md:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/40 to-transparent md:via-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-transparent md:from-navy-deep md:via-navy-deep/40 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-deep to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8 sm:pt-16">
          <div className="max-w-2xl animate-rise">
            <p className="text-xs tracking-[0.35em] text-gold">
              JUSTICE · INTEGRITY · ADVOCACY
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Your Rights.
              <span className="block text-gold">Our Commitment.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/85">
              At {firm.name}, the law office of {firm.attorney}, we provide trusted legal counsel and strategic
              solutions for individuals, families and businesses. Your case
              matters, and so do you.
            </p>
            <p className="mt-8 flex items-center gap-2.5 text-sm font-medium text-gold-bright">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
              Open for onsite and online legal consultations
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2.5 rounded-md bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep transition-colors hover:bg-gold-bright"
              >
                <Icon name="calendar" className="h-5 w-5" />
                Book a consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-md border border-gold/70 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                See services
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-line bg-navy">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-y-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {trustPoints.map((p) => (
            <li
              key={p.title}
              className="flex items-center gap-4 lg:border-l lg:border-navy-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <Icon name={p.icon} className="h-9 w-9 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-bold text-white">{p.title}</p>
                <p className="text-sm text-mist">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
