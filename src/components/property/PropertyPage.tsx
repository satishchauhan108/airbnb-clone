"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { candolimListing } from "@/data/candolimListing";
import PropertyHeader from "./PropertyHeader";
import HeroGallery from "./HeroGallery";
import StickySubNav from "./StickySubNav";
import BookingSidebar from "./BookingSidebar";
import PhotoTour from "./PhotoTour";
import Lightbox from "./Lightbox";
import {
  TitleBar,
  OverviewBlock,
  DescriptionBlock,
  SleepingBlock,
  AmenitiesBlock,
  CalendarBlock,
  ReviewsBlock,
  LocationBlock,
  HostBlock,
  PoliciesBlock,
  SimilarBlock,
  PropertyFooter,
} from "./PropertySections";

function formatMDY(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${d.getFullYear()}`;
}

export default function PropertyPage() {
  const data = candolimListing;
  const [saved, setSaved] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18));
  const [checkout, setCheckout] = useState<Date | null>(new Date(2026, 9, 23));
  const [subnavVisible, setSubnavVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("photos");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setSubnavVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const nights = useMemo(() => {
    if (!checkIn || !checkout) return data.totalNights;
    return Math.max(
      1,
      Math.round(
        (checkout.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
  }, [checkIn, checkout, data.totalNights]);

  const priceLabel = useMemo(() => {
    if (
      checkIn &&
      checkout &&
      checkIn.getTime() === new Date(2026, 9, 18).getTime() &&
      checkout.getTime() === new Date(2026, 9, 23).getTime()
    ) {
      return data.totalPriceFormatted;
    }
    const total = data.pricePerNight * nights;
    return `₹${total.toLocaleString("en-IN")} for ${nights} nights`;
  }, [checkIn, checkout, nights, data]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openPhotoByUrl = (url: string) => {
    const idx = data.allPhotos.findIndex((p) => p.url === url);
    openLightbox(idx >= 0 ? idx : 0);
  };

  const scrollToBooking = () => {
    document.getElementById("booking-card")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      <PropertyHeader />
      <StickySubNav
        visible={subnavVisible}
        priceLabel={priceLabel}
        rating={data.rating}
        reviewCount={data.reviewCount}
        onReserve={scrollToBooking}
      />

      <main className="mx-auto max-w-[1120px] px-6 md:px-10 lg:px-6 xl:px-0">
        <TitleBar
          title={data.title}
          saved={saved}
          onSave={() => {
            setSaved((v) => !v);
            toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
          }}
          onShare={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied");
            } catch {
              toast.error("Could not copy link");
            }
          }}
        />

        <HeroGallery
          photos={data.heroPhotos}
          onShowAll={() => setTourOpen(true)}
          onOpenPhoto={(i) => {
            const url = data.heroPhotos[i]?.url;
            if (url) openPhotoByUrl(url);
          }}
        />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)] lg:items-start">
          <div>
            <OverviewBlock data={data} />
            <DescriptionBlock paragraphs={data.descriptionParagraphs} />
            <SleepingBlock data={data} onOpen={openPhotoByUrl} />
            <AmenitiesBlock data={data} />
            <CalendarBlock
              checkIn={checkIn}
              checkout={checkout}
              onChange={(start, end) => {
                setCheckIn(start);
                setCheckout(end);
              }}
            />
          </div>

          <div id="booking-card" className="lg:sticky lg:top-36">
            <BookingSidebar
              priceLabel={priceLabel}
              checkIn={checkIn ? formatMDY(checkIn) : data.checkInDate}
              checkout={checkout ? formatMDY(checkout) : data.checkoutDate}
              guests={guests}
              maxGuests={data.guestCount}
              freeCancellationDate={data.freeCancellationDate}
              onGuestsChange={setGuests}
              onReserve={() =>
                toast.success("Reservation flow is a UI demo — no payment.")
              }
            />
          </div>
        </div>

        <ReviewsBlock data={data} />
        <LocationBlock location={data.location} />
        <HostBlock data={data} />
        <PoliciesBlock data={data} />
        <SimilarBlock data={data} />
      </main>

      <PropertyFooter />

      {tourOpen && (
        <PhotoTour
          categories={data.photoCategories}
          allPhotos={data.allPhotos}
          onClose={() => setTourOpen(false)}
          onOpenLightbox={(index) => {
            setLightboxIndex(index);
            setLightboxOpen(true);
          }}
        />
      )}

      {lightboxOpen && (
        <Lightbox
          photos={data.allPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === 0 ? data.allPhotos.length - 1 : i - 1,
            )
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i === data.allPhotos.length - 1 ? 0 : i + 1,
            )
          }
        />
      )}
    </div>
  );
}
