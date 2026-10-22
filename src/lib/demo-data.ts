export type DemoListing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  images: string[];
  category: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  price: number;
  locationValue: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  reservations: { startDate: string; endDate: string }[];
};

const HOST = {
  id: "demo-host-1",
  name: "Alex Rivera",
  image: null as string | null,
};

/** High-quality Unsplash photos for the assessment gallery UI */
const GALLERY_A = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
];

const GALLERY_B = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
];

const GALLERY_C = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1600&q=80",
];

export const DEMO_LISTINGS: DemoListing[] = [
  {
    id: "demo-listing-cliffside",
    title: "Cliffside villa with ocean views",
    description:
      "Wake up to panoramic ocean views in this light-filled cliffside villa. Enjoy an open living area, a chef’s kitchen, and a private deck perfect for sunset dinners. Ideal for families and small groups looking for a calm coastal escape with thoughtful design details throughout.",
    imageSrc: GALLERY_A[0],
    images: GALLERY_A,
    category: "Beach",
    roomCount: 4,
    guestCount: 8,
    bathroomCount: 3,
    price: 320,
    locationValue: "US",
    createdAt: new Date("2025-06-01").toISOString(),
    updatedAt: new Date("2025-06-01").toISOString(),
    userId: HOST.id,
    user: HOST,
    reservations: [],
  },
  {
    id: "demo-listing-loft",
    title: "Bright downtown loft",
    description:
      "A stylish loft in the heart of the city with soaring windows, mid-century furnishings, and a fully equipped kitchen. Walk to cafés, galleries, and transit while enjoying a quiet residential building.",
    imageSrc: GALLERY_B[0],
    images: GALLERY_B,
    category: "Modern",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 2,
    price: 145,
    locationValue: "US",
    createdAt: new Date("2025-07-12").toISOString(),
    updatedAt: new Date("2025-07-12").toISOString(),
    userId: HOST.id,
    user: HOST,
    reservations: [],
  },
  {
    id: "demo-listing-desert",
    title: "Desert modern retreat",
    description:
      "Minimal architecture meets warm desert light. This private retreat features a pool courtyard, indoor-outdoor living, and spacious bedrooms designed for rest after days of exploring nearby trails and towns.",
    imageSrc: GALLERY_C[0],
    images: GALLERY_C,
    category: "Desert",
    roomCount: 3,
    guestCount: 6,
    bathroomCount: 2,
    price: 210,
    locationValue: "US",
    createdAt: new Date("2025-08-20").toISOString(),
    updatedAt: new Date("2025-08-20").toISOString(),
    userId: HOST.id,
    user: HOST,
    reservations: [],
  },
];

export function getDemoListings(filters?: {
  category?: string;
  locationValue?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return DEMO_LISTINGS.filter((listing) => {
    if (filters?.category && listing.category !== filters.category) return false;
    if (filters?.locationValue && listing.locationValue !== filters.locationValue)
      return false;
    if (filters?.minPrice != null && listing.price < filters.minPrice) return false;
    if (filters?.maxPrice != null && listing.price > filters.maxPrice) return false;
    return true;
  });
}

export function getDemoListing(listingId: string) {
  return DEMO_LISTINGS.find((listing) => listing.id === listingId) ?? null;
}

/**
 * Resolves gallery images for a listing.
 * Supports a JSON array stored in imageSrc, demo `images`, or a single URL.
 */
export function resolveListingImages(listing: {
  id: string;
  imageSrc: string;
  images?: string[];
}): string[] {
  const demo = getDemoListing(listing.id);
  if (demo?.images?.length) return demo.images;

  if (listing.images?.length) return listing.images;

  const raw = listing.imageSrc?.trim();
  if (!raw) return [];

  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.every((v) => typeof v === "string")) {
        return parsed;
      }
    } catch {
      // fall through to single-image
    }
  }

  return [raw];
}
