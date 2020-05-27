
exports.seed = async function(knex) {
  await knex("trucks").insert([
    {imageOfTruck: "sample-url1", cuisineType: "Italian", operatorId: 1},
    {imageOfTruck: "sample-url2", cuisineType: "Mediterranean", operatorId: 1},
    {imageOfTruck: "sample-url3", cuisineType: "Mexican", operatorId: 2},
    {imageOfTruck: "sample-url4", cuisineType: "Brazilian", operatorId: 2},
    {imageOfTruck: "sample-url5", cuisineType: "Chinese", operatorId: 3},
    {imageOfTruck: "sample-url6", cuisineType: "Japanese", operatorId: 3},
  ])
};
