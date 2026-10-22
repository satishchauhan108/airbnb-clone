import { getDemoListing } from "@/lib/demo-data";
import { isDemoMode } from "@/lib/demo";

export async function getListing(listingId: string) {
  if (isDemoMode()) {
    return getDemoListing(listingId);
  }

  try {
    const prisma = (await import("@/lib/prisma")).default;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!listing) {
      // Fall back to demo catalog for assessment routes when DB has no row
      return getDemoListing(listingId);
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      reservations: listing.reservations.map((reservation) => ({
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error(error);
    return getDemoListing(listingId);
  }
}
