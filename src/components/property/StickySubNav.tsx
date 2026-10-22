"use client";

import { useEffect, useState } from "react";

const TABS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

type StickySubNavProps = {
  priceLabel: string;
  rating: number;
  reviewCount: number;
  visible: boolean;
  onReserve: () => void;
};

export default function StickySubNav({
  priceLabel,
  rating,
  reviewCount,
  visible,
  onReserve,
}: StickySubNavProps) {
  const [active, setActive] = useState<string>("photos");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(tab.id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={`sticky top-20 z-40 border-b border-[#EBEBEB] bg-white transition-transform duration-200 ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 lg:px-0">
        <nav className="flex gap-6" aria-label="Listing sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollTo(tab.id)}
              className={`border-b-2 py-4 text-sm font-semibold transition ${
                active === tab.id
                  ? "border-[#222222] text-[#222222]"
                  : "border-transparent text-[#717171] hover:text-[#222222]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-[#222222]">{priceLabel}</p>
            <p className="text-xs text-[#222222]">
              ★ {rating.toFixed(2)} · {reviewCount} reviews
            </p>
          </div>
          <button
            type="button"
            onClick={onReserve}
            className="rounded-lg bg-[#FF385C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D90B3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
