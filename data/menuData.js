// Your real menu, structured so the app can render it. This lives here
// as a local file for now — simple to edit, no setup required to see
// it working. The README explains how to move this into Supabase later
// if you want non-technical staff to edit it without touching code.
//
// "dessert-house" below is just a placeholder restaurant id used in the
// URL (e.g. /menu/dessert-house/table-3). Rename it to match your
// actual brand slug once you decide on one.

const menuData = {
  'dessert-house': {
    name: 'Dessert House',
    categories: [
      {
        name: 'Cakes & Tiramisu',
        items: [
          { id: 1, name: 'Mango Cheese Cake', price: 209, veg: true, description: 'A silky cheese layer on a crumbly crust, topped with sweetness.' },
          { id: 2, name: 'Strawberry Cheese Cake', price: 209, veg: true, description: 'A silky cheese layer on a crumbly crust, topped with sweetness.' },
          { id: 3, name: 'Blueberry Cheese Cake', price: 209, veg: true, description: 'A silky cheese layer on a crumbly crust, topped with sweetness.' },
          { id: 4, name: 'Chocolate Cheese Cake', price: 209, veg: true, description: 'A silky cheese layer on a crumbly crust, topped with sweetness.' },
          { id: 5, name: 'OG Tiramisu', price: 209, veg: true, description: 'Layers of coffee-soaked lady finger, topped with a dusting of cocoa. Light, creamy, and irresistibly indulgent.' },
          { id: 6, name: 'Matilda Cake', price: 209, veg: true, description: 'A moist chocolate cake layered with smooth, creamy chocolate frosting. Rich, dreamy, and pure chocolate bliss in every bite.' },
          { id: 7, name: 'Tres Leches Cake', price: 195, veg: true, description: 'Soft sponge cake soaked in a rich blend of three milks, topped with whipped cream. Moist, melt-in-your-mouth, and perfectly sweet!' },
          { id: 8, name: 'Triple Chocolate Cake', price: 195, veg: true, description: 'Moist chocolate cake, drizzled with white, milk and dark chocolate. Gooey, creamy, and made for serious chocolate cravings!' },
        ],
      },
      {
        name: 'Cake Bowls',
        items: [
          { id: 9, name: 'Cake Bowl', price: 279, veg: true, description: 'A delightful bowl of soft cake and creamy frosting, layered to perfection for a rich and satisfying dessert experience.' },
          { id: 10, name: 'Oreo Cake Bowl', price: 321, veg: true, description: 'An indulgent dessert bowl packed with moist chocolate cake, creamy oreo filling, and crunchy oreo bits in every delicious spoonful.' },
          { id: 11, name: 'Mango Cake Bowl', price: 307, veg: true, description: 'Layers of soft cake, fresh mangoes, and creamy frosting packed into a delightful bowl for the ultimate mango dessert experience.' },
          { id: 12, name: 'Kanafa Cake Bowl', price: 335, veg: true, description: 'Crispy waffle topped with rich, bold dark, white & milk chocolate — deep flavor, pure delight!' },
          { id: 13, name: 'Crunch Cake Bowl', price: 335, veg: true, description: 'Indulge in layers of moist chocolate cake, rich chocolate filling, and a satisfying crunchy topping for the ultimate chocolate dessert experience.' },
        ],
      },
      {
        name: 'Brownies',
        items: [
          { id: 14, name: 'Classic Brownie', price: 98, veg: true, description: 'Soft, gooey, and packed with rich chocolate flavor. Rich, fudgy, and irresistibly chocolatey!' },
          { id: 15, name: 'Triple Chocolate Brownie', price: 139, veg: true, description: 'Fudgy brownie topped with rich layers of dark, milk, and white chocolate. A decadent treat for true chocolate lovers.' },
          { id: 16, name: 'Kunafa Brownie', price: 167, veg: true, description: 'Crispy golden pista flavoured kunafa layered beneath a rich, fudgy brownie slice.' },
          { id: 17, name: 'Lotus Biscoff Brownie', price: 195, veg: true, description: 'A dense, gooey chocolate brownie crowned with silky lotus biscoff spread and a classic biscoff biscuit on top.' },
          { id: 18, name: 'Banana Brownie Kebab', price: 125, veg: true, description: 'Fresh banana slices layered with soft, fudgy brownie pieces, skewered and served warm for a rich chocolatey treat.' },
        ],
      },
      {
        name: 'Mousses & Treats',
        items: [
          { id: 19, name: 'Sleeping Teddy', price: 279, veg: true, description: 'A soft, creamy chocolate mousse shaped like a sleeping teddy — smooth, rich, and irresistibly cute.' },
          { id: 20, name: 'Marshmallow Triple Chocolate', price: 97, veg: true, description: 'A rich trio of dark, milk, and white chocolate layered to perfection, topped with soft, toasted marshmallows.' },
          { id: 21, name: 'Little Heart Triple Chocolate', price: 98, veg: true, description: 'Crunchy little heart biscuits coated with three layers of rich chocolate — dark, milk, and white.' },
          { id: 22, name: 'Platter', price: 349, veg: true, description: 'An indulgent assortment of delights — rich brownies, soft vanilla sponge cake, gooey marshmallow bites, banana, and little heart cookies dipped in chocolate.' },
        ],
      },
    ],
  },
}

export default menuData
