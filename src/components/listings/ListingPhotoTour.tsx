"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineViewGrid } from "react-icons/hi";

interface ListingPhotoTourProps {
  images: string[];
  title: string;
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function ListingPhotoTour({
  images,
  title,
  onClose,
  onOpenLightbox,
}: ListingPhotoTourProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    },
    [onClose],
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

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
          aria-label="Close photo tour"
        >
          <IoClose size={24} />
        </button>
        <h2
          id={labelId}
          className="flex items-center gap-2 text-sm font-semibold text-neutral-800"
        >
          <HiOutlineViewGrid size={18} />
          Photo tour
        </h2>
        <span className="w-10" aria-hidden />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
        <p className="mb-6 text-xl font-semibold text-neutral-900 sm:text-2xl">
          {title}
        </p>
        <div className="columns-1 gap-3 sm:columns-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => onOpenLightbox(index)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
            >
              <Image
                src={src}
                alt={`${title} — photo ${index + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
