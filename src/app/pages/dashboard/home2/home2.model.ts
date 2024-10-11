/**
 * Newly listed properties
 */
 export interface properties {
    verified_btn: string;
    btn?: string;
    btn_color?: string;
    image?: string;
    sale?: string;
    title?: string;
    sub_title?: string;
    content?: string;
    price?: string;
    bad?: string;
    bath?: string;
    car?: string;
    sqm?: string;
  }

/**
 * Top properties on Finder
 */
 export interface finder {
    image?: string;
    sale?: string;
    title?: string;
    location?: string;
  }

/**
 * Find your agent
 */
 export interface agent {
  image?: string;
}

/**
 * Pager
 */
 export interface pager {
  title?: string;
  contant?: string;
  sub_title?: string;
  bg_color?: string;
  text_color?: string;
  link?: string;
}
