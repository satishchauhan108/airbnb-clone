"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ListingLightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ListingLightbox({
  images,
  index,
  title,
  onClose,
  onPrev,
  onNext,
}: ListingLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const total = images.length;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!images[index]) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p id={labelId} className="text-sm font-medium tracking-wide">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close lightbox"
        >
          <IoClose size={28} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-12 sm:px-20 pb-8">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 transition hover:scale-105 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous photo"
        >
          <IoChevronBack size={26} />
        </button>

        <div className="relative h-full w-full max-w-5xl">
          <Image
            src={images[index]}
            alt={`${title} — photo ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 transition hover:scale-105 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next photo"
        >
          <IoChevronForward size={26} />
        </button>
      </div>
    </div>
  );
}
