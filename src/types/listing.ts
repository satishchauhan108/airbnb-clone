export interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  price: number;
  locationValue: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
  /** Host summary — full User shape is not always loaded */
  user?: {
    id: string;
    name: string;
    image: string | null;
  };
  images?: string[];
}