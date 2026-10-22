import { getListing } from "@/server-actions/getListing";
import { resolveListingImages } from "@/lib/demo-data";
import BookingCard from "./BookingCard";
import Image from "next/image";
import ListingViewMap from "./ListingViewMap";
import ListingGallery from "./ListingGallery";
import { LuBath, LuBedDouble, LuUsers } from "react-icons/lu";
import EmptyListings from "../ui/EmptyListings";

interface ListingPageProps {
  listingId: string;
}

export default async function ListingPage({ listingId }: ListingPageProps) {
  const listing = await getListing(listingId);

  if (!listing) {
    return (
      <EmptyListings
        title="Listing not found"
        subtitle="This listing may have been removed or the link is incorrect."
      />
    );
  }

  const images = resolveListingImages(listing);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-4 py-2 text-xl leading-tight font-semibold text-gray-900 sm:py-4 md:text-2xl lg:text-3xl">
        {listing.title}
      </h1>

      <ListingGallery images={images} title={listing.title} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 rounded-2xl">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-white">
              {listing.user.image ? (
                <Image
                  src={listing.user.image}
                  alt="the host"
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/image.png"
                  alt="the host"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Hosted by {listing.user.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuUsers size={16} className="text-neutral-500" />
                  <span className="font-medium text-neutral-800">
                    {listing.guestCount} guests
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBedDouble size={16} className="text-neutral-500" />
                  <span className="font-medium text-neutral-800">
                    {listing.roomCount} rooms
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBath size={16} className="text-neutral-500" />
                  <span className="font-medium text-neutral-800">
                    {listing.bathroomCount} bath
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 py-4">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
              About this space
            </h3>

            <div className="text-sm leading-relaxed text-gray-700">
              <p>{listing.description}</p>
            </div>
          </div>

          <ListingViewMap
            price={listing.price}
            locationValue={listing.locationValue}
          />
        </div>

        <BookingCard
          pricePerNight={listing.price}
          listingId={listing.id}
          hostId={listing.userId}
          reservations={listing.reservations}
        />
      </div>
    </div>
  );
}
