"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import type { PhotoCategory, PhotoItem } from "@/types/candolim";

type PhotoTourProps = {
  categories: PhotoCategory[];
  allPhotos: PhotoItem[];
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
};

export default function PhotoTour({
  categories,
  allPhotos,
  onClose,
  onOpenLightbox,
}: PhotoTourProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const openAt = (url: string) => {
    const idx = allPhotos.findIndex((p) => p.url === url);
    onOpenLightbox(idx >= 0 ? idx : 0);
  };

  return (
    <div
      className="fixed inset-0 z-[95] overflow-y-auto bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DDDDDD] bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222222]"
          aria-label="Close photo tour"
        >
          <IoClose size={24} />
        </button>
        <p className="text-sm font-semibold text-[#222222]">Photo tour</p>
        <span className="w-10" aria-hidden />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
        <nav className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#tour-${cat.id}`}
              className="shrink-0 rounded-xl border border-[#DDDDDD] px-3 py-2 text-sm font-medium text-[#222222] hover:border-[#222222]"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {categories.map((cat) => (
            <section key={cat.id} id={`tour-${cat.id}`}>
              <h3 className="mb-1 text-2xl font-semibold text-[#222222]">
                {cat.title}
              </h3>
              <p className="mb-4 text-sm text-[#717171]">{cat.amenitiesText}</p>
              <div className="columns-1 gap-3 sm:columns-2">
                {cat.photos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => openAt(photo.url)}
                    className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222222]"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
