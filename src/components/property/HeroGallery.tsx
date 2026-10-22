"use client";

import Image from "next/image";
import { TbGridDots } from "react-icons/tb";
import type { PhotoItem } from "@/types/candolim";

type HeroGalleryProps = {
  photos: PhotoItem[];
  onShowAll: () => void;
  onOpenPhoto: (index: number) => void;
};

/**
 * 5-photo Airbnb hero grid:
 * - Left hero spans 2 rows (~2fr)
 * - Right: 2 equal columns × 2 equal rows (~1fr each)
 * Grid minmax(0, 1fr) prevents intrinsic image widths from blowing out tracks.
 */
export default function HeroGallery({
  photos,
  onShowAll,
  onOpenPhoto,
}: HeroGalleryProps) {
  const [main, a, b, c, d] = photos.slice(0, 5);
  if (!main) return null;

  const cells: { photo: PhotoItem; index: number; className: string }[] = [
    {
      photo: main,
      index: 0,
      className: "md:col-start-1 md:row-start-1 md:row-span-2",
    },
  ];
  if (a)
    cells.push({
      photo: a,
      index: 1,
      className: "hidden md:block md:col-start-2 md:row-start-1",
    });
  if (b)
    cells.push({
      photo: b,
      index: 2,
      className: "hidden md:block md:col-start-3 md:row-start-1",
    });
  if (c)
    cells.push({
      photo: c,
      index: 3,
      className: "hidden md:block md:col-start-2 md:row-start-2",
    });
  if (d)
    cells.push({
      photo: d,
      index: 4,
      className: "hidden md:block md:col-start-3 md:row-start-2",
    });

  return (
    <div id="photos" className="relative w-full">
      <div
        className="grid w-full grid-cols-1 grid-rows-1 gap-[8px] overflow-hidden rounded-xl md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 md:gap-[10px]"
        style={{ height: "min(617px, max(340px, 42vw))" }}
      >
        {cells.map(({ photo, index, className }) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onOpenPhoto(index)}
            aria-label={photo.caption}
            className={`group relative min-h-0 min-w-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] ${className}`}
          >
            <Image
              src={photo.url}
              alt={photo.caption}
              fill
              priority={index === 0}
              sizes={
                index === 0
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 25vw"
              }
              className="object-cover transition duration-300 group-hover:brightness-[0.97]"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onShowAll}
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg border border-[#222222] bg-white px-3.5 py-2 text-sm font-semibold text-[#222222] shadow-sm transition hover:scale-[1.02] hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222222]"
      >
        <TbGridDots size={16} />
        Show all photos
      </button>
    </div>
  );
}
