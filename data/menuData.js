// Sign Laban's real menu — structured around their actual pricing
// model: one product, priced once, offered in several flavors. This
// is different from a typical menu where each flavor would be its own
// line item — customers pick a flavor when adding to cart.
//
// Each flavored item has a `flavorImages` map (flavor name -> photo
// path) since most products were shot per-flavor, not once overall —
// the card swaps the photo as the customer taps between flavor pills
// (see components/ItemCard.jsx). `image` is the fallback shown before
// a flavor is picked or when a specific flavor has no photo yet, and
// is also what single-SKU items (empty `flavors` array, e.g. "Newly
// Added") use directly. Anything still `null` shows a dashed
// placeholder box — nothing breaks as photos arrive gradually.
//
// To add a new photo: drop the file in public/images/ named
// <item-slug>-<flavor-slug>.webp (or just <item-slug>.webp for
// single-SKU items), then reference that path here.
//
// `bestSellers` doesn't duplicate item data — it's just a list of
// {itemId, flavor} references into the categories below, so price and
// name always stay in sync with the source item. `flavor` is which
// variant is pre-selected when that card renders in the Best Sellers
// section (the customer can still switch it).

const menuData = {
  'sign-laban': {
    name: 'Sign Laban',
    tagline: "Sweet flavors from Egypt's timeless desert",
    logo: '/images/logo.png',
    bestSellers: [
      { itemId: 1, flavor: 'Pistachio' }, // Salankatia
      { itemId: 11, flavor: 'Nutella' }, // Ruh Hayati
      { itemId: 11, flavor: 'Pistachio' }, // Ruh Hayati
      { itemId: 11, flavor: 'Pistachio Lotus' }, // Ruh Hayati
      { itemId: 10, flavor: 'Pistachio' }, // Crispy Umm Ali
      { itemId: 5, flavor: 'Pistachio' }, // Bambooza
    ],
    categories: [
      {
        name: 'Signature Desserts',
        items: [
          {
            id: 1,
            slug: 'salankatia',
            name: 'Salankatia',
            price: 350,
            image: '/images/salankatia-nutella.webp',
            flavors: ['Nutella', 'Pistachio Lotus', 'Nutella Lotus', 'Nutella Pistachio', 'Pistachio', 'Mango', 'Lotus'],
            flavorImages: {
              Nutella: '/images/salankatia-nutella.webp',
              'Pistachio Lotus': '/images/salankatia-pistachio-lotus.webp',
              'Nutella Lotus': '/images/salankatia-nutella-lotus.webp',
              'Nutella Pistachio': '/images/salankatia-nutella-pistachio.webp',
              Pistachio: '/images/salankatia-pistachio.webp',
              Mango: '/images/salankatia-mango.webp',
              Lotus: '/images/salankatia-lotus.webp',
            },
          },
          {
            id: 2,
            slug: 'koushiri',
            name: 'Koushiri',
            price: 350,
            image: '/images/koushiri-lotus.webp',
            flavors: ['Lotus', 'Nutella Hazelnut', 'Pistachio'],
            flavorImages: {
              Lotus: '/images/koushiri-lotus.webp',
              'Nutella Hazelnut': '/images/koushiri-nutella-hazelnut.webp',
              Pistachio: '/images/koushiri-pistachio.webp',
            },
          },
          {
            id: 3,
            slug: 'ambalyh',
            name: 'Ambalyh',
            price: 290,
            image: '/images/ambalyh-chocolate.webp',
            flavors: ['Chocolate', 'Oreo', 'Mango', 'Lotus'],
            flavorImages: {
              Chocolate: '/images/ambalyh-chocolate.webp',
              Oreo: '/images/ambalyh-oreo.webp',
              Mango: '/images/ambalyh-mango.webp',
              // Lotus: no photo yet — falls back to `image` above
            },
          },
          {
            id: 4,
            slug: 'qashtuta',
            name: 'Qashtuta',
            price: 290,
            image: '/images/qashtuta-lotus.webp',
            flavors: [
              'Nutella Hazelnut', 'Lotus', 'Mango', 'Pistachio',
              'Banana Strawberry', 'Anar Tender Coconut', 'Mango Banana', 'Mango Strawberry',
            ],
            flavorImages: {
              'Nutella Hazelnut': '/images/qashtuta-nutella-hazelnut.webp',
              Lotus: '/images/qashtuta-lotus.webp',
              Mango: '/images/qashtuta-mango.webp',
              // Pistachio, Banana Strawberry, Anar Tender Coconut,
              // Mango Banana, Mango Strawberry: no photos yet
            },
          },
          {
            id: 5,
            slug: 'bambooza',
            name: 'Bambooza',
            price: 350,
            image: '/images/bambooza-pistachio.webp',
            flavors: ['Pistachio', 'Mango', 'Lotus', 'Nutella'],
            flavorImages: {
              Pistachio: '/images/bambooza-pistachio.webp',
              Mango: '/images/bambooza-mango.webp',
              Lotus: '/images/bambooza-lotus.webp',
              // Nutella: no photo yet
            },
          },
          {
            id: 6,
            slug: 'halibo',
            name: 'Halibo',
            price: 320,
            image: '/images/halibo-nutella.webp',
            flavors: ['Nutella', 'Lotus', 'Pistachio'],
            flavorImages: {
              Nutella: '/images/halibo-nutella.webp',
              Lotus: '/images/halibo-lotus.webp',
              Pistachio: '/images/halibo-pistachio.webp',
            },
          },
          {
            id: 7,
            slug: 'heba-cake',
            name: 'Heba Cake',
            price: 350,
            image: '/images/heba-cake-pistachio-belgium-chocolate.webp',
            flavors: ['Pistachio Belgium Chocolate', 'Pistachio Kinder Chocolate'],
            flavorImages: {
              'Pistachio Belgium Chocolate': '/images/heba-cake-pistachio-belgium-chocolate.webp',
              'Pistachio Kinder Chocolate': '/images/heba-cake-pistachio-kinder-chocolate.webp',
            },
          },
          {
            id: 8,
            slug: 'aseera',
            name: 'Aseera',
            price: 150,
            image: '/images/aseera-aseerathul-pistachio.webp',
            flavors: ['Aseerathul Pistachio', 'Aseerathul Lotus', 'Aseerathul Nutella'],
            flavorImages: {
              'Aseerathul Pistachio': '/images/aseera-aseerathul-pistachio.webp',
              'Aseerathul Lotus': '/images/aseera-aseerathul-lotus.webp',
              'Aseerathul Nutella': '/images/aseera-aseerathul-nutella.webp',
            },
          },
          {
            id: 9,
            slug: 'loua',
            name: "Lou'a",
            price: 350,
            image: '/images/loua-nutella.webp',
            flavors: ['Nutella', 'Pistachio Lotus', 'Kinder', 'Nutella Pistachio', 'Lotus', 'Pistachio'],
            flavorImages: {
              Nutella: '/images/loua-nutella.webp',
              'Pistachio Lotus': '/images/loua-pistachio-lotus.webp',
              Kinder: '/images/loua-kinder.webp',
              // Nutella Pistachio, Lotus, Pistachio: no photos yet
            },
          },
          {
            id: 10,
            slug: 'crispy-umm-ali',
            name: 'Crispy Umm Ali',
            price: 350,
            image: '/images/crispy-umm-ali-pistachio.webp',
            flavors: ['Pistachio', 'Nutella', 'Lotus', 'Pistachio Nutella', 'Pistachio Lotus'],
            flavorImages: {
              Pistachio: '/images/crispy-umm-ali-pistachio.webp',
              Nutella: '/images/crispy-umm-ali-nutella.webp',
              Lotus: '/images/crispy-umm-ali-lotus.webp',
              // Pistachio Nutella, Pistachio Lotus: no photos yet
            },
          },
          {
            id: 11,
            slug: 'ruh-hayati',
            name: 'Ruh Hayati',
            price: 380,
            // Only a combo/hero shot exists (both flavors in one cup),
            // not a per-flavor breakdown yet — used as the fallback
            // for every flavor until individual shots arrive.
            image: '/images/ruh-hayati-hero.webp',
            flavors: ['Nutella', 'Lotus', 'Pistachio', 'Nutella Pistachio', 'Nutella Lotus', 'Pistachio Lotus'],
            flavorImages: {},
          },
        ],
      },
      {
        name: 'Newly Added',
        items: [
          { id: 101, slug: 'almazeya', name: 'Almazeya', price: 245, image: '/images/almazeya.webp', flavors: [] },
          { id: 102, slug: 'bomb', name: 'Bomb', price: 260, image: '/images/bomb.webp', flavors: [] },
          { id: 103, slug: 'de-paris', name: 'De Paris', price: 275, image: '/images/de-paris.webp', flavors: [] },
          { id: 104, slug: 'elsabika', name: 'Elsabika', price: 230, image: '/images/elsabika.webp', flavors: [] },
          { id: 105, slug: 'fazea-pistachio-cake', name: 'Fazea Pistachio Cake', price: 265, image: '/images/fazea-pistachio-cake.webp', flavors: [] },
          { id: 106, slug: 'hazelnut-bar', name: 'Hazelnut Bar', price: 250, image: '/images/hazelnut-bar.webp', flavors: [] },
          { id: 107, slug: 'kabsa', name: 'Kabsa', price: 240, image: '/images/kabsa.webp', flavors: [] },
          { id: 108, slug: 'kashkha', name: 'Kashkha', price: 270, image: '/images/kashkha.webp', flavors: [] },
          { id: 109, slug: 'london-love-story', name: 'London Love Story', price: 280, image: '/images/london-love-story.webp', flavors: [] },
          { id: 110, slug: 'qishta', name: 'Qishta', price: 255, image: '/images/qishta.webp', flavors: [] },
          { id: 111, slug: 'sankorita', name: 'Sankorita', price: 235, image: '/images/sankorita.webp', flavors: [] },
        ],
      },
    ],
  },
}

export default menuData
