import Image from "next/image";
import { contactEmail, firm } from "@/lib/data";
import Icon from "./Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-line bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex items-start gap-4">
          <Image src={firm.logo} alt={`${firm.name} logo`} width={64} height={64} className="h-16 w-16" />
          <div>
            <p className="font-display text-2xl font-semibold text-white">{firm.name}</p>
            <p className="mt-1 text-sm text-mist">{firm.attorney}</p>
            <p className="text-xs text-mist">{firm.credentials.join(", ")}</p>
            <p className="mt-1 text-sm text-mist">{firm.tagline}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <p className="flex gap-3">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span>
              {firm.address}
              <span className="block text-mist">({firm.landmark})</span>
            </span>
          </p>
          <p className="flex gap-3">
            <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span>
              {firm.weekdayHours}
              <span className="block text-mist">{firm.weekendHours}</span>
            </span>
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <p className="flex gap-3">
            <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span>
              <a href={`tel:${firm.phone.replace(/\s/g, "")}`} className="hover:text-gold">{firm.phone}</a>
              <span className="block text-mist">{firm.phoneNote}</span>
            </span>
          </p>
          <p className="flex gap-3">
            <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <a href={`mailto:${contactEmail}`} className="break-all hover:text-gold">{contactEmail}</a>
          </p>
          {firm.facebookUrl && (
            <p>
              <a href={firm.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Facebook: {firm.name}
              </a>
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-navy-line py-5 text-center text-xs text-mist">
        © {year} {firm.name}. All rights reserved.
      </div>
    </footer>
  );
}
