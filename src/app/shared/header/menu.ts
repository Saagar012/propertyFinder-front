import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Home',
        subItems: [
          {
              id: 2,
              label: 'Home v.1',
              link: '/home1',
              parentId: 1
          },
          {
              id: 3,
              label: 'Home v.2',
              link: '/home2',
              parentId: 1
          },
        ]
    },
    {
      id: 4,
      label: 'Catalog',
      subItems: [
        {
            id: 5,
            label: 'Property for Rent',
            link: '/catalog/rent',
            parentId: 4
        },
        {
            id: 6,
            label: 'Property for Sale',
            link: '/catalog/sale',
            parentId: 4
        },
        {
          id: 6,
          label: 'Single Property v.1',
          link: '/catalog/single-v1',
          parentId: 4
        },
        {
          id: 6,
          label: 'Single Property v.2',
          link: '/catalog/single-v2',
          parentId: 4
        },
      ]
    },
    {
      id: 7,
      label: 'Account',
      subItems: [
        {
            id: 8,
            label: 'Personal Info',
            link: '/account/info',
            parentId: 7
        },
        {
            id: 9,
            label: 'Password & Security',
            link: '/account/security',
            parentId: 7
        },
        {
          id: 10,
          label: 'My Properties',
          link: '/account/properties',
          parentId: 7
        },
        {
          id: 11,
          label: 'Wishlist',
          link: '/account/wishlist',
          parentId: 7
        },
        {
          id: 12,
          label: 'Reviews',
          link: '/account/reviews',
          parentId: 7
        },
        {
          id: 13,
          label: 'Notifications',
          link: '/account/notifications',
          parentId: 7
        },
        {
          id: 14,
          label: 'Sign In',
          link: '/auth/signin',
          parentId: 7
        },
        {
          id: 15,
          label: 'Sign Up',
          link: '/auth/signup',
          parentId: 7
        },
      ]
    },
    {
      id: 16,
      label: 'Vendor',
      subItems: [
        {
            id: 17,
            label: 'Add Property',
            link: '/vendor/add-property',
            parentId: 16
        },
        {
            id: 18,
            label: 'Property Promotion',
            link: '/vendor/property-promotion',
            parentId: 16
        },
        {
          id: 19,
          label: 'Vendor Page: Properties',
          link: '/vendor/properties',
          parentId: 16
        },
        {
          id: 20,
          label: 'Vendor Page: Reviews',
          link: '/vendor/reviews',
          parentId: 16
        },
      ]
    },
    {
      id: 21,
      label: 'Pages',
      subItems: [
        {
            id: 22,
            label: 'About',
            link: '/pages/about',
            parentId: 21
        },
        {
          id: 23,
          label: 'Blog',
          subItems: [
            {
              id: 24,
              label: 'Blog Grid',
              link: '/pages/blog-grid',
              parentId: 23
            },
            {
              id: 25,
              label: 'Single Post',
              link: '/pages/single-blog',
              parentId: 23
            }
          ]
        },
        {
            id: 26,
            label: 'Contacts',
            link: '/pages/contacts',
            parentId: 21
        },
        {
          id: 27,
          label: 'Help Center',
          link: '/pages/help-center',
          parentId: 21
        },
        {
          id: 28,
          label: '404 Not Found',
          link: '/pages/404',
          parentId: 21
        },
      ]
    },
];

