"use client";

import { FiFlag, FiTag } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

type BookingSidebarProps = {
  priceLabel: string;
  checkIn: string;
  checkout: string;
  guests: number;
  maxGuests: number;
  freeCancellationDate: string;
  onGuestsChange: (n: number) => void;
  onReserve: () => void;
};

export default function BookingSidebar({
  priceLabel,
  checkIn,
  checkout,
  guests,
  maxGuests,
  freeCancellationDate,
  onGuestsChange,
  onReserve,
}: BookingSidebarProps) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-[#DDDDDD] px-4 py-3 shadow-sm">
        <div className="flex items-start gap-2">
          <FiTag className="mt-0.5 text-emerald-600" size={18} />
          <div>
            <p className="text-sm font-semibold text-[#222222]">
              Get 10% off your next stay.
            </p>
            <button
              type="button"
              className="text-sm text-[#222222] underline"
              onClick={() => window.alert("Promo terms would open here.")}
            >
              Terms apply
            </button>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg border border-[#222222] px-3 py-1.5 text-sm font-semibold hover:bg-neutral-50"
          onClick={() => window.alert("Promo claimed for this demo.")}
        >
          Claim
        </button>
      </div>

      <div className="rounded-xl border border-[#DDDDDD] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <p className="mb-4 text-[22px] font-semibold leading-tight text-[#222222]">
          {priceLabel}
        </p>

        <div className="overflow-hidden rounded-lg border border-[#B0B0B0]">
          <div className="grid grid-cols-2 border-b border-[#B0B0B0]">
            <div className="border-r border-[#B0B0B0] px-3 py-2.5">
              <p className="text-[10px] font-bold tracking-wide text-[#222222]">
                CHECK-IN
              </p>
              <p className="text-sm text-[#222222]">{checkIn}</p>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[10px] font-bold tracking-wide text-[#222222]">
                CHECKOUT
              </p>
              <p className="text-sm text-[#222222]">{checkout}</p>
            </div>
          </div>
          <div className="relative px-3 py-2.5">
            <p className="text-[10px] font-bold tracking-wide text-[#222222]">
              GUESTS
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#222222]">
                {guests} guest{guests === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease guests"
                  disabled={guests <= 1}
                  onClick={() => onGuestsChange(guests - 1)}
                  className="h-7 w-7 rounded-full border border-[#B0B0B0] text-lg leading-none disabled:opacity-40"
                >
                  −
                </button>
                <button
                  type="button"
                  aria-label="Increase guests"
                  disabled={guests >= maxGuests}
                  onClick={() => onGuestsChange(guests + 1)}
                  className="h-7 w-7 rounded-full border border-[#B0B0B0] text-lg leading-none disabled:opacity-40"
                >
                  +
                </button>
                <IoChevronDown className="text-[#717171]" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-lg bg-[#F7F7F7] px-3 py-2 text-left text-sm text-[#222222]"
        >
          Free cancellation before {freeCancellationDate}
        </button>

        <button
          type="button"
          onClick={onReserve}
          className="mt-4 w-full rounded-lg bg-[#FF385C] py-3.5 text-base font-semibold text-white transition hover:bg-[#D90B3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
        >
          Reserve
        </button>
        <p className="mt-3 text-center text-sm text-[#222222]">
          You won&apos;t be charged yet
        </p>
      </div>

      <button
        type="button"
        className="mx-auto flex items-center gap-2 text-sm text-[#717171] underline"
        onClick={() => window.alert("Listing reported for this demo.")}
      >
        <FiFlag size={14} />
        Report this listing
      </button>
    </aside>
  );
}
