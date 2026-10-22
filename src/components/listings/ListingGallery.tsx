"use client";

import Image from "next/image";
import { useState } from "react";
import { TbGridDots } from "react-icons/tb";
import ListingPhotoTour from "./ListingPhotoTour";
import ListingLightbox from "./ListingLightbox";

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export default function ListingGallery({ images, title }: ListingGalleryProps) {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const gallery = images.length > 0 ? images : [];
  const imageCount = gallery.length;
  const hero = gallery[0];
  const sideImages = gallery.slice(1, 5);

  const openTour = () => {
    setLightboxOpen(false);
    setTourOpen(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const closeTour = () => {
    setTourOpen(false);
    setLightboxOpen(false);
  };

  const goPrev = () => {
    setLightboxIndex((current) =>
      current === 0 ? imageCount - 1 : current - 1,
    );
  };

  const goNext = () => {
    setLightboxIndex((current) =>
      current === imageCount - 1 ? 0 : current + 1,
    );
  };

  if (!hero) {
    return (
      <div className="mb-10 flex h-80 w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
        No photos available
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-10 overflow-hidden rounded-2xl">
        <div
          className={`grid gap-2 ${
            sideImages.length > 0
              ? "grid-cols-1 md:grid-cols-4 md:grid-rows-2"
              : "grid-cols-1"
          }`}
        >
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className={`group relative min-h-72 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 ${
              sideImages.length > 0
                ? "md:col-span-2 md:row-span-2 md:min-h-[420px]"
                : "min-h-[420px]"
            }`}
            aria-label={`View photo 1 of ${imageCount}`}
          >
            <Image
              src={hero}
              alt={`${title} — main photo`}
              fill
              className="object-cover transition duration-300 group-hover:brightness-95"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </button>

          {sideImages.map((src, index) => {
            const absoluteIndex = index + 1;
            return (
              <button
                key={`${src}-${absoluteIndex}`}
                type="button"
                onClick={() => openLightbox(absoluteIndex)}
                className="group relative hidden min-h-[205px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 md:block"
                aria-label={`View photo ${absoluteIndex + 1} of ${imageCount}`}
              >
                <Image
                  src={src}
                  alt={`${title} — photo ${absoluteIndex + 1}`}
                  fill
                  className="object-cover transition duration-300 group-hover:brightness-95"
                  sizes="25vw"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={openTour}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:scale-[1.02] hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
        >
          <TbGridDots size={16} />
          Show all photos
        </button>
      </div>

      {tourOpen && (
        <ListingPhotoTour
          images={gallery}
          title={title}
          onClose={closeTour}
          onOpenLightbox={openLightbox}
        />
      )}

      {lightboxOpen && (
        <ListingLightbox
          images={gallery}
          index={lightboxIndex}
          title={title}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
