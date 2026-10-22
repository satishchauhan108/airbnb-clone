import { getDemoListings } from "@/lib/demo-data";
import { isDemoMode } from "@/lib/demo";

export type GetListingsParams = {
  category?: string;
  locationValue?: string;
  minPrice?: number;
  maxPrice?: number;
};

/**
 * Server-side listings fetch (avoids fragile HTTP self-calls via NEXT_PUBLIC_BASE_URL).
 */
export async function getListings(params?: GetListingsParams) {
  if (isDemoMode()) {
    return getDemoListings(params);
  }

  try {
    const prisma = (await import("@/lib/prisma")).default;
    const listings = await prisma.listing.findMany({
      where: {
        ...(params?.category && { category: params.category }),
        ...(params?.locationValue && { locationValue: params.locationValue }),
        ...(params?.minPrice != null || params?.maxPrice != null
          ? {
              price: {
                ...(params?.minPrice != null ? { gte: params.minPrice } : {}),
                ...(params?.maxPrice != null ? { lte: params.maxPrice } : {}),
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (listings.length === 0) {
      return getDemoListings(params);
    }

    return listings;
  } catch (error) {
    console.error("[getListings]", error);
    return getDemoListings(params);
  }
}
