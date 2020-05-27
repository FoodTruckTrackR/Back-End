
exports.seed = async function(knex) {
  await knex("menu-items").insert([
    {
      itemName: "Carbonara", 
      itemDescription: "Bacon Pasta",
      itemPhoto: "sample-url1",
      itemPrice: 13.95,
      truckId: 1
    },
    {
      itemName: "Spaghetti & Meatballs", 
      itemDescription: "Old Classic",
      itemPhoto: "sample-url2",
      itemPrice: 11.95,
      truckId: 1
    },
    {
      itemName: "Hummus Platter", 
      itemDescription: "Homemade hummus with vegetable dippers",
      itemPhoto: "sample-url3",
      itemPrice: 7.95,
      truckId: 2
    },
    {
      itemName: "Chicken Souvlaki", 
      itemDescription: "Greek-style chicken with tzatziki sauce",
      itemPhoto: "sample-url4",
      itemPrice: 12.95,
      truckId: 2
    },
    {
      itemName: "Enchiladas", 
      itemDescription: "Chicken or Beef with mole sauce",
      itemPhoto: "sample-url5",
      itemPrice: 9.95,
      truckId: 3
    },
    {
      itemName: "Chimichanga", 
      itemDescription: "Deep Fried Burrito",
      itemPhoto: "sample-url6",
      itemPrice: 11.95,
      truckId: 3
    },
    {
      itemName: "Brazilian Steak", 
      itemDescription: "All-you-can-eat",
      itemPhoto: "sample-url7",
      itemPrice: 28.95,
      truckId: 4
    },
    {
      itemName: "Salad Bar Only", 
      itemDescription: "All-you-can-eat from our delicious salad bar",
      itemPhoto: "sample-url8",
      itemPrice: 16.95,
      truckId: 4
    },
    {
      itemName: "Kung Pao Chicken", 
      itemDescription: "Spicy Chicken",
      itemPhoto: "sample-url9",
      itemPrice: 8.95,
      truckId: 5
    },
    {
      itemName: "Orange Chicken", 
      itemDescription: "Chicken with our Tangy orange sauce",
      itemPhoto: "sample-url10",
      itemPrice: 9.95,
      truckId: 5
    },
    {
      itemName: "Philadelphia Roll", 
      itemDescription: "Tuna, Cream Cheese, Avocado",
      itemPhoto: "sample-url11",
      itemPrice: 5.95,
      truckId: 6
    },
    {
      itemName: "Spicy Seafood Salad", 
      itemDescription: "Assortment of fresh sushi with our signature spicy sauce",
      itemPhoto: "sample-url12",
      itemPrice: 9.95,
      truckId: 6
    }
  ])
};
