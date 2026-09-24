// ─────────────────────────────────────────────────────────────────────────
// STATIC FIRM CONFIG — name, contact details, hours and services.
// Edit this file to change the wording shown on the public site.
// ─────────────────────────────────────────────────────────────────────────

export const firm = {
  name: "BarromaLaw",
  office: "Law Office",
  attorney: "Atty. Joseph A.T. Barroma",
  credentials: ["JD", "CPHR", "CDPO", "CLSSYB", "SO2", "CPLC"],
  profession: "HR and data privacy professional and former HR and BPO leader",
  tagline: "Legal. Privacy. HR. Solutions.",
  logo: "/images/logo.png",
  heroImage: "/images/hero-statue.jpg",
  attorneyBanner: "/images/attorney-banner.jpg",
  scheduleImage: "/images/office-schedule.jpg",
  address: "2nd floor 401 Purok 3, Brgy. Santiago, General Trias City, Cavite",
  landmark: "In front of LRT A and DAU Grocery",
  weekdayHours: "Monday to Friday, 8:30 AM to 5:30 PM",
  weekendHours: "Saturday, Sunday and holidays: by appointment only",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "0926 629 5599",
  phoneNote: "Mobile, WhatsApp and Viber",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
};

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "atty.barroma.law@gmail.com";

export type Service = {
  title: string;
  blurb: string;
  icon: "landmark" | "users" | "file" | "briefcase" | "shield" | "building";
};

export const services: Service[] = [
  {
    title: "Legal consultations",
    blurb: "Onsite at the office or online through a virtual meeting.",
    icon: "users",
  },
  {
    title: "Drafting and notarization",
    blurb:
      "Affidavits, deeds of sale, employment contracts, assumption of mortgage, demand letters, extrajudicial settlement and more.",
    icon: "file",
  },
  {
    title: "Case assistance and representation",
    blurb: "Labor, civil, criminal and administrative cases and proceedings.",
    icon: "landmark",
  },
  {
    title: "Retainership and external counsel",
    blurb: "Ongoing legal support for companies and organizations.",
    icon: "briefcase",
  },
  {
    title: "Other legal services",
    blurb: "Have a matter that is not listed? Ask during your consultation.",
    icon: "shield",
  },
];

export const trustPoints = [
  { title: "Experienced", text: "Former HR and BPO leader", icon: "shield" },
  { title: "Client-centered", text: "Your goals. Our priority.", icon: "users" },
  { title: "Trusted advocacy", text: "Strong representation. Real results.", icon: "scale" },
  { title: "Onsite and online", text: "Open for virtual consultations", icon: "calendar" },
] as const;
