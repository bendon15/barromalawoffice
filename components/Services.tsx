import { services } from "@/lib/data";
import Icon from "./Icon";

export default function Services() {
  return (
    <section id="services" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">
            Legal services
          </h2>
          <p className="mt-4 text-lg text-navy/70">
            From a first consultation to full representation, handled with
            professionalism and care.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-navy/10 bg-paper-white p-8 shadow-[0_1px_2px_rgba(10,26,51,0.06)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-navy/70">{s.blurb}</p>
            </li>
          ))}
          <li className="flex flex-col justify-between rounded-2xl bg-navy p-8">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">
                Not sure which service you need?
              </h3>
              <p className="mt-2 text-white/75">
                Book a consultation and get a clear picture of your options.
              </p>
            </div>
            <a
              href="#book"
              className="mt-6 inline-flex w-fit rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy-deep transition-colors hover:bg-gold-bright"
            >
              Book a consultation
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
