# back-end

# Backend URL - https://foodtruck-trackr.herokuapp.com/

**Keep in mind that Heroku resets SQLite databases every so often, so if you don't see data you saved, you'll need
to add it again.**

**API Endpoints**

**Operator Registration**

POST - /operators/register

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |

Returns object with ‘id’, 'username', and empty array for 'trucks'

**Example Response**

```
{
  "id": 5,
  "username": "operator5",
  "trucks": []
}
```

**Operator Login**

POST - /operators/login

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

**Example Response**

```
{
  "id": 4,
  "username": "operator4",
  "trucks": [
    {
      "id": 7,
      "truckName": "Woo Chon"
      "imageOfTruck": "sample-url7",
      "cuisineType": "Korean",
      "menuItems": [
        {
          "id": 13,
          "itemName": "Samgyeopsal",
          "itemDescription": "pork strips",
          "itemPrice": 15.95,
          "itemPhoto": "url"
        },
        {
          "id": 14,
          "itemName": "Hoeddeok",
          "itemDescription": "sweet syrupy pancakes",
          "itemPrice": 9.95,
          "itemPhoto": "sample food url2"
        }
      ],
      "ratings": [
        4,
        5,
        5
      ],
      "ratingAvg": 4.666666666666667
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcklkIjo0LCJvcGVyYXRvck5hbWUiOiJvcGVyYXRvcjQiLCJpYXQiOjE1OTA2MTk2MDZ9.-nBj1FSHlqvTPMrwRu4EtwmLk8FQ0YAlsPGFfucZvN0"
}
```
**Update Operator (requires operator authentication)**

PUT - /operators/:operator_id

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |

Returns updated operator object

**Example**

```
{
  "id": 4,
  "username": "operator4",
  "trucks": [
    {
      "id": 7,
      "truckName": "Woo Chon",
      "imageOfTruck": "sample-url7",
      "cuisineType": "Korean",
      "menuItems": [
        {
          "id": 13,
          "itemName": "Samgyeopsal",
          "itemDescription": "pork strips",
          "itemPrice": 15.95,
          "itemPhoto": "url"
        },
        {
          "id": 14,
          "itemName": "Hoeddeok",
          "itemDescription": "sweet syrupy pancakes",
          "itemPrice": 9.95,
          "itemPhoto": "sample food url2"
        }
      ],
      "ratings": [
        4,
        5,
        5
      ],
      "ratingAvg": 4.666666666666667
    }
  ]
}
```
**Delete Operator (requires operator authentication)**

DELETE - /operators/:operator_id

Returns nothing

**Add Truck (requires operator authentication)**

POST - /operators/:operator_id/trucks

| Fields        | Type   | Required |
| ------------- | ------ | -------- | 
| truckName     | string | Yes      |
| imageOfTruck  | string | Yes      | 
| cuisineType   | string | Yes      |

**Example Response**

```
{
  "id": 7,
  "imageOfTruck": "sample-url7",
  "cuisineType": "Korean",
  "operatorId": 4
}
```
**Get Trucks Owned By Specific Operator (requires operator authentication)**

GET - /operators/:operator_id/trucks

**Example Response**

```
[
  {
    "id": 1,
    "truckName": "Tina's",
    "imageOfTruck": "sample-url1",
    "cuisineType": "Italian",
    "menuItems": [
      {
        "id": 1,
        "itemName": "Carbonara",
        "itemDescription": "Bacon Pasta",
        "itemPrice": 13.95,
        "itemPhoto": "sample-url1"
      },
      {
        "id": 2,
        "itemName": "Spaghetti & Meatballs",
        "itemDescription": "Old Classic",
        "itemPrice": 11.95,
        "itemPhoto": "sample-url2"
      }
    ],
    "ratings": [
      4,
      5,
      5
    ],
    "ratingAvg": 4.666666666666667
  },
  {
    "id": 2,
    "truckName": "Gyros",
    "imageOfTruck": "sample-url2",
    "cuisineType": "Mediterranean",
    "menuItems": [
      {
        "id": 3,
        "itemName": "Hummus Platter",
        "itemDescription": "Homemade hummus with vegetable dippers",
        "itemPrice": 7.95,
        "itemPhoto": "sample-url3"
      },
      {
        "id": 4,
        "itemName": "Chicken Souvlaki",
        "itemDescription": "Greek-style chicken with tzatziki sauce",
        "itemPrice": 12.95,
        "itemPhoto": "sample-url4"
      }
    ],
    "ratings": [
      3,
      4,
      5
    ],
    "ratingAvg": 4
  }
]
```

**Update Truck**

UPDATE - /operators/:operator_id/trucks/truck_id

| Fields        | Type   | Required |
| ------------- | ------ | -------- | 
| truckName     | string | Yes      |
| imageOfTruck  | string | Yes      | 
| cuisineType   | string | Yes      |

**Example Response**

```
{
  "id": 7,
  "truckName": "Woo Chon",
  "imageOfTruck": "sample-url7",
  "cuisineType": "Korean",
  "operatorId": 4
}
```

**Delete Truck**

DELETE - /operators/:operator_id/trucks/truck_id

**Add Menu-Item (requires operator authentication)**

POST - /operators/:operator_id/trucks/:truck_id/menu-items

| Fields            | Type   | Required |
| ----------------- | ------ | -------- | 
| itemName          | string | Yes      | 
| itemDescription   | string | Yes      |
| itemPhoto         | string | Yes      |
| itemPrice         | float  | Yes      |

**Example Response**

```
{
  "id": 14,
  "itemName": "Hoeddeok",
  "itemDescription": "sweet syrupy pancakes",
  "itemPhoto": "sample food url2",
  "itemPrice": 9.95,
  "truckId": 7
}
```

**Update Menu-Item (requires operator authentication)**

PUT - /operators/:operator_id/trucks/:truck_id/menu-items/menu_id

| Fields            | Type   | Required |
| ----------------- | ------ | -------- | 
| itemName          | string | Yes      | 
| itemDescription   | string | Yes      |
| itemPhoto         | string | Yes      |
| itemPrice         | float  | Yes      |

**Example Response**

```
{
  "id": 13,
  "itemName": "Samgyeopsal",
  "itemDescription": "pork strips",
  "itemPhoto": "url",
  "itemPrice": 15.95,
  "truckId": 7
}
```
**Delete Menu-Item (requires operator authentication)**

DELETE - /operators/:operator_id/trucks/:truck_id/menu-items/menu_id

Returns Nothing

**Diner Registration**

POST - /diners/register

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |

Returns object with ‘id’  and 'username'. 

**Example Response**

{
  "id": 4,
  "username": "diner4"
}

**Diner Login**

POST - /diners/login

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

**Example Response**

```
{
  "message": "Welcome diner4",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaW5lcklkIjo0LCJkaW5lck5hbWUiOiJkaW5lcjQiLCJpYXQiOjE1OTA2MTk3MzV9.oasKtWIcmt0fEhU0tR4loWOQHgPoHT-xBRNXMhYpaqg"
}
```

**Update Diner (requires diner authentication)**

PUT - /diners/:diner_id

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |

Returns updated diner object

**Example**

```
{
  "id": 2,
  "username": "diner2"
}
```
**Delete Diner (requires diner authentication)**

DELETE - /diners/:diner_id

Returns nothing

**Get Trucks (requires diner or operator authentication)**

GET - /trucks

**Example Response**

```
[
  {
    "id": 1,
    "truckName": "Tina's",
    "imageOfTruck": "sample-url1",
    "cuisineType": "Italian",
    "operatorId": 1,
    "menuItems": [
      {
        "id": 1,
        "itemName": "Carbonara",
        "itemDescription": "Bacon Pasta",
        "itemPrice": 13.95,
        "itemPhoto": "sample-url1"
      },
      {
        "id": 2,
        "itemName": "Spaghetti & Meatballs",
        "itemDescription": "Old Classic",
        "itemPrice": 11.95,
        "itemPhoto": "sample-url2"
      }
    ],
    "ratings": [
      4,
      5,
      5
    ],
    "ratingAvg": 4.666666666666667
  },
  {
    "id": 2,
    "truckName": "Gyros",
    "imageOfTruck": "sample-url2",
    "cuisineType": "Mediterranean",
    "operatorId": 1,
    "menuItems": [
      {
        "id": 3,
        "itemName": "Hummus Platter",
        "itemDescription": "Homemade hummus with vegetable dippers",
        "itemPrice": 7.95,
        "itemPhoto": "sample-url3"
      },
      {
        "id": 4,
        "itemName": "Chicken Souvlaki",
        "itemDescription": "Greek-style chicken with tzatziki sauce",
        "itemPrice": 12.95,
        "itemPhoto": "sample-url4"
      }
    ],
    "ratings": [
      3,
      4,
      5
    ],
    "ratingAvg": 4
  },
  {
    "id": 3,
    "truckName": "Salsarita's",
    "imageOfTruck": "sample-url3",
    "cuisineType": "Mexican",
    "operatorId": 2,
    "menuItems": [
      {
        "id": 5,
        "itemName": "Enchiladas",
        "itemDescription": "Chicken or Beef with mole sauce",
        "itemPrice": 9.95,
        "itemPhoto": "sample-url5"
      },
      {
        "id": 6,
        "itemName": "Chimichanga",
        "itemDescription": "Deep Fried Burrito",
        "itemPrice": 11.95,
        "itemPhoto": "sample-url6"
      }
    ],
    "ratings": [
      4,
      3,
      4
    ],
    "ratingAvg": 3.6666666666666665
  }
]
```
**Get Truck By Id (requires diner or operator authentication)**

GET - /trucks/:truck_id

**Example Response**
```
{
  "id": 2,
  "truckName": "Gyros",
  "imageOfTruck": "sample-url2",
  "cuisineType": "Mediterranean",
  "operatorId": 1,
  "menuItems": [
    {
      "id": 3,
      "itemName": "Hummus Platter",
      "itemDescription": "Homemade hummus with vegetable dippers",
      "itemPhoto": "sample-url3",
      "itemPrice": 7.95,
      "truckId": 2
    },
    {
      "id": 4,
      "itemName": "Chicken Souvlaki",
      "itemDescription": "Greek-style chicken with tzatziki sauce",
      "itemPhoto": "sample-url4",
      "itemPrice": 12.95,
      "truckId": 2
    }
  ],
  "ratings": [
    3,
    4,
    5
  ],
  "ratingAvg": 4
}
```

**Add Rating (requires diner authentication)**

POST - /trucks/:truck_id/ratings

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| rating   | integer| Yes      |

**Example Response**

```
{
  "id": 21,
  "rating": 5,
  "truckId": 7
}
```

**Upate Rating (requires diner authentication)**

PUT - /trucks/:truck_id/ratings/rating_id

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| rating   | integer| Yes      |

**Example Response**

```
{
  "id": 1,
  "rating": 5,
  "truckId": 4
}
```
**Delete Rating (requires diner authentication)**

DELETE - /trucks/:truck_id/ratings/rating_id

| Fields   | Type   | Required |

Returns Nothing

