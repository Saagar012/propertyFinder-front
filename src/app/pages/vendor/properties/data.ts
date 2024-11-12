/**
 * Rent Data List
 */
 const rentData = [
  {
      verified_btn: 'Verified',
      btn: "new",
      btn_color: "bg-info",
      image: [
        {img : "assets/img/real-estate/catalog/01.jpg"},
        {img : "assets/img/real-estate/catalog/02.jpg"}
      ],
      sale: 'For rent',
      title: "3-bed Apartment | 67 sq.m",
      content: "3811 Ditmars Blvd Astoria, NY 11105",
      price: "1,650",
      bad: "3",
      bath: "2",
      car: "1"
  },
  {
    verified_btn: 'Verified',
    btn: "Featured",
    btn_color: "bg-danger",
    image: [
      {img : "assets/img/real-estate/catalog/02.jpg"},
      {img : "assets/img/real-estate/catalog/01.jpg"}
    ],
    sale: 'For rent',
    title: "Family Home| 120 sq.m",
    content: "67-04 Myrtle Ave Glendale, NY 11385",
    price: "2,800",
    bad: "4",
    bath: "2",
    car: "2"
  },
  {
    verified_btn: 'Verified',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/03.jpg"},
      {img : "assets/img/real-estate/catalog/02.jpg"}
    ],
    sale: 'For rent',
    title: "Greenpoint Rentals | 85 sq.m",
    content: "1510 Castle Hill Ave Bronx, NY 10462",
    price: "1,850",
    bad: "2",
    bath: "1",
    car: "1"
  },
  {
    verified_btn: 'Verified',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/30.jpg"},
      {img : "assets/img/real-estate/catalog/03.jpg"}
    ],
    sale: 'For rent',
    title: "Crystal Apartment| 60 sq.m",
    content: "495 Henry St Brooklyn, NY 11231",
    price: "1,300",
    bad: "2",
    bath: "1",
    car: "0"
  },
  {
    verified_btn: '',
    btn: "New",
    btn_color: "bg-info",
    image: [
      {img : "assets/img/real-estate/catalog/31.jpg"},
      {img : "assets/img/real-estate/catalog/03.jpg"}
    ],
    sale: 'For rent',
    title: "Pine Apartments | 56 sq.m",
    content: "3811 Ditmars Blvd Astoria, NY 11105",
    price: "2,000",
    bad: "2",
    bath: "1",
    car: "0"
  },
  {
    verified_btn: '',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/32.jpg"},
      {img : "assets/img/real-estate/catalog/02.jpg"}
    ],
    sale: 'For rent',
    title: "Tiffany Studio | 35 sq.m",
    content: "3979 Albany Post Road Hyde Park, NY...",
    price: "700",
    bad: "1",
    bath: "1",
    car: "0"
  },
  {
    verified_btn: 'Verified',
    btn: "New",
    btn_color: "bg-info",
    image: [
      {img : "assets/img/real-estate/catalog/04.jpg"},
      {img : "assets/img/real-estate/catalog/04.jpg"}
    ],
    sale: 'For rent',
    title: "Studio | 32 sq.m",
    content: "140-60 Beech Ave Flushing, NY 11355",
    price: "850",
    bad: "1",
    bath: "1",
    car: "1"
  },
  {
    verified_btn: 'Verified',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/05.jpg"},
      {img : "assets/img/real-estate/catalog/05.jpg"}
    ],
    sale: 'For rent',
    title: "Terra Nova Apartments | 85 sq.m",
    content: "21 India St Brooklyn, NY 11222",
    price: "2,400",
    bad: "3",
    bath: "2",
    car: "2"
  },
  {
    verified_btn: 'Verified',
    btn: "Featured",
    btn_color: "bg-danger",
    image: [
      {img : "assets/img/real-estate/catalog/33.jpg"},
      {img : "assets/img/real-estate/catalog/33.jpg"}
    ],
    sale: 'For rent',
    title: "O’Farrell Rooms | 40 sq.m",
    content: "460 E Fordham Rd Bronx, NY 10458",
    price: "550",
    bad: "2",
    bath: "1",
    car: "0"
  }
];

/**
 * Sale Data List
 */
 const saleData = [
  {
    verified_btn: 'Verified',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/34.jpg"},
      {img : "assets/img/real-estate/catalog/34.jpg"}
    ],
    sale: 'For sale',
    title: "White Cottage | 70 sq.m",
    content: "3979 Albany Post Road Hyde Park, NY",
    price: "$84,000",
    bad: "3",
    bath: "2",
    car: "1"
  },
  {
    verified_btn: '',
    btn: "new",
    btn_color: "bg-info",
    image: [
      {img : "assets/img/real-estate/catalog/35.jpg"},
      {img : "assets/img/real-estate/catalog/35.jpg"}
    ],
    sale: 'For sale',
    title: "Country House | 120 sq.m",
    content: "6954 Grand AveMaspeth, NY 11378",
    price: "$162,000",
    bad: "4",
    bath: "2",
    car: "2"
  },
  {
    verified_btn: '',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/36.jpg"},
      {img : "assets/img/real-estate/catalog/36.jpg"}
    ],
    sale: 'For sale',
    title: "Ellis Studio | 40 sq.m",
    content: "3 E Evergreen Rd New City, NY 10956",
    price: "$50,000",
    bad: "1",
    bath: "1",
    car: "1"
  },
  {
    verified_btn: '',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/37.jpg"},
      {img : "assets/img/real-estate/catalog/37.jpg"}
    ],
    sale: 'For sale',
    title: "Luxury Rental Villa | 180 sq.m",
    content: "118-11 Sutphin Blvd Jamaica, NY 11434",
    price: "$300,500",
    bad: "4",
    bath: "2",
    car: "2"
  },
  {
    verified_btn: 'Verified',
    btn: "",
    btn_color: "",
    image: [
      {img : "assets/img/real-estate/catalog/38.jpg"},
      {img : "assets/img/real-estate/catalog/38.jpg"}
    ],
    sale: 'For sale',
    title: "Modern House | 170 sq.m",
    content: "82 Nassau St New York, NY 10038",
    price: "$620,400",
    bad: "3",
    bath: "2",
    car: "2"
  },
];

export { rentData, saleData };
