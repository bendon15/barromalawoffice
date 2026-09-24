"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firm } from "@/lib/data";
import Icon from "./Icon";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#attorney", label: "Attorney" },
  { href: "#services", label: "Services" },
  { href: "#book", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-navy-line bg-navy-deep/95 backdrop-blur-md"
          : "bg-gradient-to-b from-navy-deep/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <Image
            src={firm.logo}
            alt={`${firm.name} logo`}
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold text-white sm:text-2xl">
              {firm.name}
            </span>
            <span className="block text-xs tracking-[0.3em] text-gold">
              {firm.office.toUpperCase()}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden items-center gap-2 rounded-md border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy-deep sm:inline-flex"
        >
          <Icon name="calendar" className="h-4 w-4" />
          Book a consultation
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-5 pb-5" aria-label="Mobile">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-navy-line py-3 text-base font-medium text-white/90 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-md bg-gold px-5 py-3 text-center text-sm font-bold text-navy-deep"
            >
              Book a consultation
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
