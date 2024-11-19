/**
 * Top Offer List
 */
 export interface topOffer {
  id?:string;
  verified_btn: string;
  btn?: string;
  btn_color?: string;
  image?:string;

  // image?: Array<{
  //   img?: string;
  // }>;
  sale?: string;
  title?: string;
  streetAddress?: string;
  price?: string;
  bed?: string;
  bath?: string;
  car?: string;
  location:string;
  // district:string;
  property?:string;
  metres:string;

}
