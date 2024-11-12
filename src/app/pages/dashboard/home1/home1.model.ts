/**
 * Services List
 */
 export interface service {
  image?: string;
  title?: string;
  content?: string;
  btn?: string;
  link?: string;
}

/**
 * Top Offer List
 */
 export interface topOffer {
  verified_btn: string;
  btn?: string;
  btn_color?: string;
  image?: string;
  sale?: string;
  title?: string;
  content?: string;
  price?: string;
  bad?: string;
  bath?: string;
  car?: string;
}

/**
 * Search property by city
 */
 export interface propertyCity {
  image?: string;
  title?: string;
  sale_progressbar?: number;
  sale_count?: string;
  rent_progressbar?: number;
  rent_count?: string;
}

/**
 * Top real estate agents
 */
 export interface estateAagents {
  image1?: string;
  image2?: string;
  title?: string;
  cantante?: string;
  name?: string;
  agent?: string;
  reviews?: string;
}

/**
 * companies List
 */
 export interface companies {
  image?: string;
  himage?: string;
}
