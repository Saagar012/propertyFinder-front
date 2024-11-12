/**
 * Works List
 */
 export interface works {
  id: string;
  title?: string;
  content?: string;
}

/**
 * Team List
 */
 export interface teams {
  image: string;
  name?: string;
  position?: string;
}

/**
 * Customers List
 */
 export interface customers {
  image: string;
  content?: string;
  fimage?: string;
  ftitle?: string;
  fcontent?: string;
}

/**
 * highlights List
 */
 export interface highlights {
  image: string;
  sub_title?: string;
  title?: string;
  profile?: string;
  name?: string;
  date?: string;
  comments?: string;
}
