
exports.seed = async function(knex) {
  await knex("trucks").insert([
    {truckName: "Tina's", imageOfTruck: "sample-url1", cuisineType: "Italian", operatorId: 1},
    {truckName: "Gyros", imageOfTruck: "sample-url2", cuisineType: "Mediterranean", operatorId: 1},
    {truckName: "Salsarita's", imageOfTruck: "sample-url3", cuisineType: "Mexican", operatorId: 2},
    {truckName: "Blanka's", imageOfTruck: "sample-url4", cuisineType: "Brazilian", operatorId: 2},
    {truckName: "New Dragon", imageOfTruck: "sample-url5", cuisineType: "Chinese", operatorId: 3},
    {truckName: "Kyoto's", imageOfTruck: "sample-url6", cuisineType: "Japanese", operatorId: 3},
  ])
};
