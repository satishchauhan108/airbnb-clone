"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import type { PhotoItem } from "@/types/candolim";

type LightboxProps = {
  photos: PhotoItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Close lightbox"
        >
          <IoClose size={22} />
          Close
        </button>
        <p className="text-sm font-medium">
          {index + 1} / {photos.length}
        </p>
        <span className="w-20" aria-hidden />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-14 pb-8 sm:px-20">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 transition hover:scale-105 hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-6"
          aria-label="Previous photo"
        >
          <IoChevronBack size={26} />
        </button>

        <div className="relative h-full w-full max-w-5xl">
          <Image
            src={photo.url}
            alt={photo.caption}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 transition hover:scale-105 hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6"
          aria-label="Next photo"
        >
          <IoChevronForward size={26} />
        </button>
      </div>
    </div>
  );
}
