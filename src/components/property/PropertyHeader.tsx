"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuGlobe, LuMenu, LuSearch } from "react-icons/lu";
import { useFilterModal } from "@/store/useFilterListingModal";
import { useAuthModal } from "@/store/useAuthModalStore";

export default function PropertyHeader() {
  const { open: openFilter } = useFilterModal();
  const { openLogin, openRegister } = useAuthModal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#EBEBEB] bg-white">
      <div className="mx-auto flex h-20 max-w-[1760px] items-center justify-between px-6 lg:px-10 xl:px-20">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Airbnb home">
          <Image
            src="/images/logo.png"
            alt="Airbnb"
            width={102}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={openFilter}
          className="hidden items-center rounded-full border border-[#DDDDDD] bg-white py-2 pl-2 pr-2 shadow-sm transition hover:shadow-md md:flex"
          aria-label="Search stays"
        >
          <span className="flex items-center gap-2 border-r border-[#DDDDDD] px-4 text-sm font-semibold text-[#222222]">
            <Image
              src="/listings/candolim/searchbar-house.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
            Anywhere
          </span>
          <span className="border-r border-[#DDDDDD] px-4 text-sm font-semibold text-[#222222]">
            Anytime
          </span>
          <span className="px-4 text-sm font-normal text-[#717171]">Add guests</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF385C] text-white">
            <LuSearch size={14} />
          </span>
        </button>

        <div className="relative flex items-center gap-1">
          <button
            type="button"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#222222] hover:bg-neutral-100 lg:inline"
          >
            Become a host
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
            aria-label="Language and currency"
          >
            <LuGlobe size={18} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 hover:shadow-md"
            aria-expanded={menuOpen}
            aria-label="Main menu"
          >
            <LuMenu size={16} />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#717171] text-xs font-semibold text-white">
              ?
            </span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-[#DDDDDD] bg-white py-2 shadow-lg">
              <button
                type="button"
                className="block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-50"
                onClick={() => {
                  setMenuOpen(false);
                  openRegister();
                }}
              >
                Sign up
              </button>
              <button
                type="button"
                className="block w-full px-4 py-3 text-left text-sm hover:bg-neutral-50"
                onClick={() => {
                  setMenuOpen(false);
                  openLogin();
                }}
              >
                Log in
              </button>
              <div className="my-1 border-t border-[#EBEBEB]" />
              <Link
                href="/homes"
                className="block px-4 py-3 text-sm hover:bg-neutral-50"
                onClick={() => setMenuOpen(false)}
              >
                Explore homes
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
