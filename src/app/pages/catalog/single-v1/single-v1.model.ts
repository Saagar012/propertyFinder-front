/**
 * About Reviews List
 */
 export interface aboutReviews {
  image?: string;
  title?: string;
  date?: string;
  rating?: any;
  content?: string;
  like?: string;
  unlike?: string;
}

/**
 * Recently List
 */
 export interface recently {
  id: number;
  verified_btn: string;
  btn?: string;
  status?:string;
  btn_color?: string;
  image?: string;
  sale?: string;
  title?: string;
  content?: string;
  price?: string;
  bed?: string;
  bath?: string;
  car?: string;
}
export interface propertyById {
  id: number;
  title: string;
  totalAreaInMeterSq: number;
  description: string;
  category: string;
  country?: string | null;
  city?: string | null;
  zipCode?: string | null;
  streetAddress?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parkingSpots?: number | null;
  amenities?: { [key: string]: boolean };
  latitude: string;
  longitude: string;
  images: string[];  // Assuming it's an array of image URLs
  priceAmountPerAnnum?: string | null;
  status: string;
  userId: number;
  propertyTypeId: number;
  contactInfo?: contactInfo;
  createdBy: number;
  createdAt: string;  // or Date, depending on how you want to handle dates
  updatedAt: string;  // or Date
  deletedAt?: string | null;
}

export interface contactInfo {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
}


