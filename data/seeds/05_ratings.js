
exports.seed = async function(knex) {
  await knex("ratings").insert([
    {rating: 4, truckId: 1},
    {rating: 5, truckId: 1},
    {rating: 5, truckId: 1},
    {rating: 3, truckId: 2},
    {rating: 4, truckId: 2},
    {rating: 5, truckId: 2},
    {rating: 4, truckId: 3},
    {rating: 3, truckId: 3},
    {rating: 4, truckId: 3},
    {rating: 1, truckId: 4},
    {rating: 5, truckId: 4},
    {rating: 2, truckId: 4},
    {rating: 5, truckId: 5},
    {rating: 5, truckId: 5},
    {rating: 3, truckId: 5},
    {rating: 3, truckId: 6},
    {rating: 3, truckId: 6},
    {rating: 2, truckId: 6},
  ])
  
};
