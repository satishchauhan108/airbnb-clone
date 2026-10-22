export type PhotoItem = {
  id: string;
  url: string;
  caption: string;
  category: string;
  isHero?: boolean;
};

export type PhotoCategory = {
  id: string;
  title: string;
  thumbnailUrl: string;
  amenitiesText: string;
  photos: PhotoItem[];
};

export type Highlight = {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
};

export type SleepingRoom = {
  id: string;
  roomName: string;
  bedDescription: string;
  imageUrl: string;
};

export type Amenity = {
  id: string;
  name: string;
  iconName: string;
  available: boolean;
  category: string;
};

export type Review = {
  id: string;
  authorName: string;
  avatarInitial?: string;
  avatarUrl?: string;
  tenureOnAirbnb: string;
  date: string;
  rating: number;
  comment: string;
};

export type NearbyStay = {
  id: string;
  title: string;
  imageUrl: string;
  priceFormatted: string;
  rating: number;
};

export type CoHost = {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarInitial?: string;
};

export type ListingData = {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  rating: number;
  reviewCount: number;
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  priceFormatted: string;
  pricePerNight: number;
  totalNights: number;
  totalPriceFormatted: string;
  checkInDate: string;
  checkoutDate: string;
  freeCancellationDate: string;
  host: {
    name: string;
    avatarUrl: string;
    hostingDuration: string;
    isSuperhost: boolean;
    rating: number;
    reviewCount: number;
    responseRate: string;
    responseTime: string;
    badges: string[];
    bioHighlights: string[];
  };
  coHosts: CoHost[];
  heroPhotos: PhotoItem[];
  photoCategories: PhotoCategory[];
  allPhotos: PhotoItem[];
  highlights: Highlight[];
  descriptionParagraphs: string[];
  sleepingRooms: SleepingRoom[];
  amenities: Amenity[];
  ratingScores: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  reviewTopics: { name: string; count: number; icon: string }[];
  reviews: Review[];
  nearbyStays: NearbyStay[];
  houseRules: {
    checkIn: string;
    checkout: string;
    maxGuests: number;
  };
};
