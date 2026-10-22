"use client";

import Image from "next/image";
import { useState } from "react";
import {
  LuBath,
  LuBedDouble,
  LuFan,
  LuDoorOpen,
  LuUtensils,
  LuWifi,
  LuCar,
  LuPawPrint,
  LuVideo,
  LuAlarmSmoke,
  LuKeyRound,
  LuShield,
  LuCalendarX2,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { MdOutlineHotTub, MdOutlinePool } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import AccessibleModal from "./AccessibleModal";
import type { ListingData } from "@/types/candolim";

const amenityIcon = (name: string) => {
  const map: Record<string, React.ReactNode> = {
    kitchen: <LuUtensils size={24} />,
    wifi: <LuWifi size={24} />,
    workspace: <HiOutlineDesktopComputer size={24} />,
    parking: <LuCar size={24} />,
    pool: <MdOutlinePool size={24} />,
    hottub: <MdOutlineHotTub size={24} />,
    pet: <LuPawPrint size={24} />,
    camera: <LuVideo size={24} />,
    carbon: <LuAlarmSmoke size={24} />,
    smoke: <LuAlarmSmoke size={24} />,
    fan: <LuFan size={24} />,
    door: <LuDoorOpen size={24} />,
  };
  return map[name] ?? <LuWifi size={24} />;
};

export function TitleBar({
  title,
  saved,
  onShare,
  onSave,
}: {
  title: string;
  saved: boolean;
  onShare: () => void;
  onSave: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 pt-6">
      <h1 className="text-[26px] font-semibold leading-[1.2] tracking-tight text-[#222222]">
        {title}
      </h1>
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold underline decoration-1 underline-offset-2 hover:bg-neutral-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path
              d="M8 1v9M4.5 4.5 8 1l3.5 3.5M3 9.5v3.5h10V9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          Share
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold underline decoration-1 underline-offset-2 hover:bg-neutral-100"
          aria-pressed={saved}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 21s-7-4.6-7-10a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 19 11c0 5.4-7 10-7 10z"
              fill={saved ? "#FF385C" : "none"}
              stroke={saved ? "#FF385C" : "currentColor"}
              strokeWidth="1.6"
            />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}

export function OverviewBlock({ data }: { data: ListingData }) {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#222222]">
        {data.propertyType}
      </h2>
      <p className="mt-1 text-[#222222]">
        {data.guestCount} guests · {data.bedroomCount} bedroom · {data.bedCount}{" "}
        bed · {data.bathroomCount} bathroom
      </p>

      <div className="mt-6 grid grid-cols-1 items-center gap-4 rounded-xl border border-[#DDDDDD] px-5 py-5 sm:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/listings/candolim/laurel-left.png"
            alt=""
            width={36}
            height={44}
          />
          <p className="max-w-[5.5rem] text-center text-sm font-semibold leading-tight">
            Guest
            <br />
            favourite
          </p>
          <Image
            src="/listings/candolim/laurel-right.png"
            alt=""
            width={36}
            height={44}
          />
        </div>
        <p className="max-w-xs text-sm leading-snug text-[#222222]">
          One of the most loved homes on Airbnb, according to guests
        </p>
        <div className="flex items-center gap-5 sm:justify-end">
          <div className="text-center">
            <p className="text-[22px] font-semibold leading-none">
              {data.rating.toFixed(2)}
            </p>
            <p className="mt-1 text-[10px] tracking-tight">★★★★★</p>
          </div>
          <div className="h-10 w-px bg-[#DDDDDD]" />
          <div className="text-center">
            <p className="text-[22px] font-semibold leading-none">
              {data.reviewCount}
            </p>
            <p className="mt-1 text-xs underline">Reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 border-b border-[#EBEBEB] pb-6">
        <Image
          src={data.host.avatarUrl}
          alt={data.host.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-[#222222]">
            Hosted by {data.host.name}
          </p>
          <p className="text-sm text-[#717171]">{data.host.hostingDuration}</p>
        </div>
      </div>

      <ul className="space-y-6 border-b border-[#EBEBEB] py-6">
        {data.highlights.map((h) => (
          <li key={h.id} className="flex gap-4">
            <span className="mt-0.5 text-[#222222]">
              {amenityIcon(h.iconName)}
            </span>
            <div>
              <p className="font-semibold text-[#222222]">{h.title}</p>
              <p className="text-sm text-[#717171]">{h.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DescriptionBlock({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <section className="border-b border-[#EBEBEB] py-8">
      <div className="mb-4 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm text-[#222222]">
        Some info has been automatically translated.{" "}
        <button
          type="button"
          className="font-semibold underline"
          onClick={() => setShowOriginal((v) => !v)}
        >
          {showOriginal ? "Show translation" : "Show original"}
        </button>
      </div>
      <div
        className={`space-y-3 text-[#222222] ${expanded ? "" : "line-clamp-4"}`}
      >
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 font-semibold underline"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Show less" : "Show more"} {expanded ? "^" : ">"}
      </button>
    </section>
  );
}

export function SleepingBlock({
  data,
  onOpen,
}: {
  data: ListingData;
  onOpen: (url: string) => void;
}) {
  return (
    <section className="border-b border-[#EBEBEB] py-8">
      <h2 className="mb-6 text-[22px] font-semibold text-[#222222]">
        Where you&apos;ll sleep
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.sleepingRooms.map((room) => (
          <button
            key={room.id}
            type="button"
            onClick={() => onOpen(room.imageUrl)}
            className="overflow-hidden rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222222]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={room.imageUrl}
                alt={room.roomName}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
            <p className="mt-3 font-semibold text-[#222222]">{room.roomName}</p>
            <p className="text-sm text-[#717171]">{room.bedDescription}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function AmenitiesBlock({ data }: { data: ListingData }) {
  const [open, setOpen] = useState(false);
  const extras = [
    "Air conditioning",
    "Hair dryer",
    "Iron",
    "Washer",
    "Dryer",
    "TV",
    "Refrigerator",
    "Microwave",
    "Dishwasher",
    "Coffee maker",
    "Cooking basics",
    "Dishes and silverware",
    "Private entrance",
    "Patio or balcony",
    "Outdoor furniture",
    "Free street parking",
    "Elevator",
    "Long term stays allowed",
    "Self check-in",
    "Luggage dropoff allowed",
    "Host greets you",
    "Cleaning available during stay",
    "Hot water",
    "Shampoo",
    "Body soap",
    "Shower gel",
    "Hangers",
    "Bed linens",
    "Extra pillows and blankets",
    "Room-darkening shades",
    "Ethernet connection",
    "Dedicated workspace",
    "Portable fans",
    "Ceiling fan",
    "First aid kit",
    "Fire extinguisher",
    "Lock on bedroom door",
    "Outdoor shower",
    "BBQ grill",
    "Beach essentials",
  ];

  return (
    <section id="amenities" className="border-b border-[#EBEBEB] py-8">
      <h2 className="mb-6 text-[22px] font-semibold text-[#222222]">
        What this place offers
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.amenities.map((a) => (
          <li
            key={a.id}
            className={`flex items-center gap-4 text-[#222222] ${
              a.available ? "" : "text-[#717171] line-through"
            }`}
          >
            <span aria-hidden>{amenityIcon(a.iconName)}</span>
            <span>{a.name}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 rounded-lg border border-[#222222] px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
      >
        Show all 50 amenities
      </button>
      <AccessibleModal
        open={open}
        title="What this place offers"
        onClose={() => setOpen(false)}
        wide
      >
        <ul className="space-y-4">
          {[...data.amenities.map((a) => a.name), ...extras].map((name) => (
            <li key={name} className="border-b border-[#EBEBEB] pb-3 text-[#222222]">
              {name}
            </li>
          ))}
        </ul>
      </AccessibleModal>
    </section>
  );
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function CalendarBlock({
  checkIn,
  checkout,
  onChange,
}: {
  checkIn: Date | null;
  checkout: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}) {
  const [cursor, setCursor] = useState(new Date(2026, 9, 1));
  const months = [0, 1].map((offset) => {
    const d = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1);
    return d;
  });

  const nights =
    checkIn && checkout
      ? Math.max(
          0,
          Math.round(
            (checkout.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const onDay = (day: Date) => {
    if (!checkIn || (checkIn && checkout)) {
      onChange(day, null);
      return;
    }
    if (day <= checkIn) {
      onChange(day, null);
      return;
    }
    onChange(checkIn, day);
  };

  const inRange = (d: Date) => {
    if (!checkIn || !checkout) return false;
    return d > checkIn && d < checkout;
  };
  const sameDay = (a: Date | null, b: Date) =>
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <section className="border-b border-[#EBEBEB] py-8">
      <h2 className="text-[22px] font-semibold text-[#222222]">
        {nights || 5} nights in Candolim
      </h2>
      <p className="mt-1 text-sm text-[#717171]">
        {checkIn && checkout
          ? `${checkIn.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} - ${checkout.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
          : "Select check-in and checkout dates"}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous months"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-neutral-100"
        >
          <LuChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Next months"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-neutral-100"
        >
          <LuChevronRight />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
        {months.map((monthDate) => {
          const y = monthDate.getFullYear();
          const m = monthDate.getMonth();
          const firstDow = new Date(y, m, 1).getDay();
          const total = daysInMonth(y, m);
          const cells: (Date | null)[] = [
            ...Array(firstDow).fill(null),
            ...Array.from({ length: total }, (_, i) => new Date(y, m, i + 1)),
          ];
          return (
            <div key={`${y}-${m}`}>
              <p className="mb-3 text-center font-semibold text-[#222222]">
                {monthDate.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-[#717171]">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
                {cells.map((d, idx) => {
                  if (!d) return <div key={`e-${idx}`} />;
                  const selected =
                    sameDay(checkIn, d) || sameDay(checkout, d);
                  const mid = inRange(d);
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => onDay(d)}
                      className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm ${
                        selected
                          ? "bg-[#222222] font-semibold text-white"
                          : mid
                            ? "bg-neutral-200"
                            : "hover:border hover:border-[#222222]"
                      }`}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-4 text-sm font-semibold underline"
        onClick={() => onChange(null, null)}
      >
        Clear dates
      </button>
    </section>
  );
}

export function ReviewsBlock({ data }: { data: ListingData }) {
  const [open, setOpen] = useState(false);
  const scores = [
    { label: "Cleanliness", value: data.ratingScores.cleanliness, icon: <LuBath size={28} /> },
    { label: "Accuracy", value: data.ratingScores.accuracy, icon: <span className="text-2xl">✓</span> },
    { label: "Check-in", value: data.ratingScores.checkIn, icon: <LuKeyRound size={28} /> },
    { label: "Communication", value: data.ratingScores.communication, icon: <span className="text-2xl">💬</span> },
    { label: "Location", value: data.ratingScores.location, icon: <span className="text-2xl">🗺️</span> },
    { label: "Value", value: data.ratingScores.value, icon: <span className="text-2xl">🏷️</span> },
  ];

  return (
    <section id="reviews" className="border-b border-[#EBEBEB] py-10">
      <div className="mb-10 text-center">
        <div className="mb-2 flex items-center justify-center gap-3">
          <Image src="/listings/candolim/laurel-left.png" alt="" width={56} height={70} />
          <p className="text-5xl font-semibold text-[#222222]">
            {data.rating.toFixed(2)}
          </p>
          <Image src="/listings/candolim/laurel-right.png" alt="" width={56} height={70} />
        </div>
        <p className="text-2xl font-semibold text-[#222222]">Guest favourite</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#717171]">
          This home is a guest favourite based on ratings, reviews and reliability.
        </p>
        <button type="button" className="mt-2 text-sm underline">
          How reviews work
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 border-b border-[#EBEBEB] pb-8 sm:grid-cols-3 lg:grid-cols-7">
        <div>
          <p className="mb-2 text-sm font-semibold">Overall rating</p>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="mb-1 flex items-center gap-2 text-xs">
              <span>{star}</span>
              <div className="h-1 flex-1 rounded bg-neutral-200">
                <div
                  className="h-1 rounded bg-[#222222]"
                  style={{ width: star === 5 ? "100%" : star === 4 ? "8%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
        {scores.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-lg font-semibold">{s.value.toFixed(1)}</p>
            <div className="mt-2 flex justify-center text-[#222222]">{s.icon}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {data.reviewTopics.map((t) => (
          <div
            key={t.name}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[#DDDDDD] px-3 py-2 text-sm"
          >
            <Image src={t.icon} alt="" width={18} height={18} />
            {t.name} ({t.count})
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {data.reviews.slice(0, 6).map((r) => (
          <article key={r.id}>
            <div className="mb-2 flex items-center gap-3">
              {r.avatarUrl ? (
                <Image
                  src={r.avatarUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#222222] text-white">
                  {r.avatarInitial ?? r.authorName[0]}
                </div>
              )}
              <div>
                <p className="font-semibold">{r.authorName}</p>
                <p className="text-sm text-[#717171]">{r.tenureOnAirbnb}</p>
              </div>
            </div>
            <p className="mb-1 text-sm">
              {"★".repeat(r.rating)} · {r.date}
            </p>
            <p className="text-sm text-[#222222]">{r.comment}</p>
          </article>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 rounded-lg border border-[#222222] px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
      >
        Show all {data.reviewCount} reviews
      </button>
      <AccessibleModal
        open={open}
        title={`${data.reviewCount} reviews`}
        onClose={() => setOpen(false)}
        wide
      >
        <div className="space-y-6">
          {data.reviews.map((r) => (
            <article key={r.id} className="border-b border-[#EBEBEB] pb-4">
              <p className="font-semibold">{r.authorName}</p>
              <p className="text-sm text-[#717171]">
                {r.date} · {r.tenureOnAirbnb}
              </p>
              <p className="mt-2 text-sm">{r.comment}</p>
            </article>
          ))}
        </div>
      </AccessibleModal>
    </section>
  );
}

export function LocationBlock({ location }: { location: string }) {
  const [more, setMore] = useState(false);
  const embed =
    "https://maps.google.com/maps?q=Candolim%2C%20Goa%2C%20India&z=14&output=embed";
  return (
    <section id="location" className="border-b border-[#EBEBEB] py-8">
      <h2 className="text-[22px] font-semibold text-[#222222]">
        Where you&apos;ll be
      </h2>
      <p className="mt-1 text-[#222222]">{location}</p>
      <div className="relative mt-6 h-[480px] overflow-hidden rounded-xl border border-[#DDDDDD] bg-[#E8F0E8]">
        <iframe
          title="Map of Candolim, Goa"
          src={embed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-sm text-[#717171]">
        Exact location will be provided after booking.
      </p>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Candolim%2C+Goa%2C+India"
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-semibold underline"
      >
        Open in Google Maps
      </a>
      <h3 className="mt-6 text-lg font-semibold">Neighbourhood highlights</h3>
      <p className={`mt-2 text-[#222222] ${more ? "" : "line-clamp-2"}`}>
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay with
        easy access to beaches, cafés, and popular attractions. Walk to Candolim
        Beach in about 15 minutes, with Baga, Calangute, and Fort Aguada nearby.
      </p>
      <button
        type="button"
        className="mt-2 font-semibold underline"
        onClick={() => setMore((v) => !v)}
      >
        {more ? "Show less" : "Show more"} {more ? "^" : ">"}
      </button>
    </section>
  );
}

export function HostBlock({ data }: { data: ListingData }) {
  return (
    <section className="border-b border-[#EBEBEB] py-8">
      <h2 className="mb-6 text-[22px] font-semibold">Meet your host</h2>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-4">
            <Image
              src={data.host.avatarUrl}
              alt={data.host.name}
              width={104}
              height={104}
              className="h-[104px] w-[104px] rounded-full object-cover"
            />
            <div>
              <p className="text-3xl font-semibold">{data.host.reviewCount.toLocaleString()}</p>
              <p className="text-sm">Reviews</p>
              <p className="mt-2 text-xl font-semibold">
                {data.host.rating.toFixed(2)}★
              </p>
              <p className="text-sm">Rating</p>
              <p className="mt-2 text-xl font-semibold">2</p>
              <p className="text-sm">Years hosting</p>
            </div>
          </div>
          <p className="mt-4 text-center text-xl font-semibold">{data.host.name}</p>
          <p className="text-center text-sm text-[#717171]">Host</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">Co-Hosts</h3>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.coHosts.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                {c.avatarUrl ? (
                  <Image
                    src={c.avatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-rose-200 text-sm font-semibold">
                    {c.avatarInitial}
                  </div>
                )}
                <span className="text-sm">{c.name}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-2 font-semibold">Host details</h3>
          <p className="text-sm">Response rate: {data.host.responseRate}</p>
          <p className="text-sm">Responds {data.host.responseTime}</p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-[#F0F0F0] px-6 py-3 text-sm font-semibold"
            onClick={() => window.alert("Messaging is a demo interaction.")}
          >
            Message host
          </button>
          <p className="mt-4 flex items-start gap-2 text-xs text-[#717171]">
            <LuShield className="mt-0.5 shrink-0" />
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#222222]">
            {data.host.badges.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PoliciesBlock({ data }: { data: ListingData }) {
  return (
    <section className="border-b border-[#EBEBEB] py-8">
      <h2 className="mb-6 text-[22px] font-semibold">Things to know</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <LuCalendarX2 className="mb-3" size={22} />
          <h3 className="mb-2 font-semibold">Cancellation policy</h3>
          <p className="text-sm text-[#222222]">
            Free cancellation before {data.freeCancellationDate}. Cancel before
            check-in on 18 October for a partial refund. Review this host&apos;s
            full policy for details.
          </p>
          <button type="button" className="mt-2 text-sm font-semibold underline">
            Learn more
          </button>
        </div>
        <div>
          <LuKeyRound className="mb-3" size={22} />
          <h3 className="mb-2 font-semibold">House rules</h3>
          <p className="text-sm">{data.houseRules.checkIn}</p>
          <p className="text-sm">{data.houseRules.checkout}</p>
          <p className="text-sm">{data.houseRules.maxGuests} guests maximum</p>
          <button type="button" className="mt-2 text-sm font-semibold underline">
            Learn more
          </button>
        </div>
        <div>
          <LuShield className="mb-3" size={22} />
          <h3 className="mb-2 font-semibold">Safety &amp; property</h3>
          <p className="text-sm">Carbon monoxide alarm not reported</p>
          <p className="text-sm">Smoke alarm not reported</p>
          <p className="text-sm">Exterior security cameras on property</p>
          <button type="button" className="mt-2 text-sm font-semibold underline">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

export function SimilarBlock({ data }: { data: ListingData }) {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const pages = Math.ceil(data.nearbyStays.length / pageSize);
  const slice = data.nearbyStays.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <section className="py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-[22px] font-semibold text-[#222222]">
          More stays nearby
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {page + 1} / {pages}
          </span>
          <button
            type="button"
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#DDDDDD] disabled:opacity-40"
          >
            <LuChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next stays"
            disabled={page >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#DDDDDD] disabled:opacity-40"
          >
            <LuChevronRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {slice.map((s) => (
          <article key={s.id} className="group">
            <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
              <Image
                src={s.imageUrl}
                alt={s.title}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="20vw"
              />
            </div>
            <p className="line-clamp-2 text-sm font-semibold">{s.title}</p>
            <p className="text-sm">
              {s.priceFormatted} · ★ {s.rating.toFixed(2)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PropertyFooter() {
  return (
    <footer className="border-t border-[#EBEBEB] bg-[#F7F7F7]">
      <div className="mx-auto grid max-w-[1120px] gap-8 px-6 py-12 md:grid-cols-3 lg:px-0">
        {[
          {
            title: "Support",
            links: ["Help Center", "AirCover", "Anti-discrimination", "Disability support"],
          },
          {
            title: "Hosting",
            links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources"],
          },
          {
            title: "Airbnb",
            links: ["Newsroom", "New features", "Careers", "Investors"],
          },
        ].map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold">{col.title}</p>
            <ul className="space-y-2 text-sm text-[#222222]">
              {col.links.map((l) => (
                <li key={l}>
                  <button type="button" className="hover:underline">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#DDDDDD]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm lg:px-0">
          <p>© {new Date().getFullYear()} Airbnb clone demo · Candolim listing</p>
          <p>Privacy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
}

// silence unused import warnings for bed icons used visually elsewhere
void LuBedDouble;
