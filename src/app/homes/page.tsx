import Listings from "@/components/listings/Listings";
import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomesPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Navbar />
      <div className="mt-20 px-4 py-2 md:px-20 lg:mt-24">
        <Suspense fallback={<ListingCardSkeleton />}>
          <Listings searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
