# back-end

# Backend URL - https://anywhere-fitness-ptbw.herokuapp.com

**Keep in mind that Heroku resets SQLite databases every so often, so if you don't see data you saved, you'll need
to add it again.**

**API Endpoints**

**User Registration**

POST - /api/auth/register/user

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |
| name     | string | Yes      |                |
| email    | string | No       |                |
| bio      | string | No       |                |

**Instructor Registration**

POST - /api/auth/register/instructor

| Fields   | Type   | Required | Notes          |
| -------- | ------ | -------- | -------------- |
| username | string | Yes      | Must be unique |
| password | string | Yes      |                |
| name     | string | Yes      |                |
| email    | string | No       |                |
| bio      | string | No       |                |

Both registration endpoints return ‘id’ of new user or instructor

**User Login**

POST - /api/auth/login/user

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

**Example Response**

```
{
  "message": "Welcome {username}!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFicm9iaW5zIiwidXNlcklkIjo3LCJpYXQiOjE1OTA1MzQ2NTR9.z7Up6Qs4YqRu5wZqvuLFaTMAcbP2hQ-BgTo43TzMrek"
}
```

**Instructor Login**

POST - /api/auth/login/instructor

| Fields   | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

**Example Response**

```
{
  "message": "Welcome instructor1!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imluc3RydWN0b3IxIiwidXNlcklkIjo3LCJpYXQiOjE1OTA1MzQ3NTV9.LqVetxoUQB8iX027H5s2rfubFvGPehS_1Wb3Ixbm6iA"
}
```

Both user and instructor login endpoints return a json message and a token.

**Get all Classes (requires authentication)**

GET - /api/classes

Returns a list of all classes including instructor information for each class

**Example**

```{
    "id": 1,
    "location": "Durham, NC",
    "class_name": "Body Pump 2",
    "class_type": "Aerobics",
    "class_desc": "Quick workout to get the sweat flowing!",
    "start_time": "9AM",
    "duration": "30 Minutes",
    "intensity": "Moderate",
    "registered": 5,
    "max_size": 20,
    "instructor_name": "Hulk Hogan"
  },
  {
    "id": 2,
    "location": "Chapel Hill, NC",
    "class_name": "HIIT Express",
    "class_type": "HIIT",
    "class_desc": "Quick workout to get the sweat flowing!",
    "start_time": "10AM",
    "duration": "20 Minutes",
    "intensity": "Moderate",
    "registered": 4,
    "max_size": 12,
    "instructor_name": "Muscle Man"
  },
  {
    "id": 3,
    "location": "Raleigh, NC",
    "class_name": "Powerlifting Extreme",
    "class_type": "CrossFit",
    "class_desc": "Intense CrossFit type workout to get the sweat flowing!",
    "start_time": "11AM",
    "duration": "45 Minutes",
    "intensity": "Extreme",
    "registered": 6,
    "max_size": 10,
    "instructor_name": "Dwayne Johnson"
  }
```

**Get Class by ID (requires authentication)**

GET - /api/classes/:id

Returns a class for a particular ID

**Example**

```{
    "id": 1,
    "location": "Durham, NC",
    "class_name": "Body Pump 2",
    "class_type": "Aerobics",
    "class_desc": "Quick workout to get the sweat flowing!",
    "start_time": "9AM",
    "duration": "30 Minutes",
    "intensity": "Moderate",
    "registered": 5,
    "max_size": 20,
    "instructor_name": "Hulk Hogan"
  }
```

**Create class by Instructor ID (requires authentication)**

POST - /api/classes/instructor/:id

Id is required of the class instructor who will be teaching the class

| Fields     | Type   | Required | Notes |
| ---------- | ------ | -------- | ----- |
| class_name | string | Yes      |       |
| class_type | string | Yes      |       |
| class_desc | string | No       |       |
| start_time | string | Yes      |       |
| duration   | string | Yes      |       |
| intensity  | string | Yes      |       |
| location   | string | Yes      |       |
| registered | string | No       |       |
| max_size   | string | No       |       |

**Get list of Classes by Instructor ID**

GET - /api/instructors/classes/:id

This endpoint will return all of the classes for a particular instructor

**Example**

```

{
"id": 1,
"instructor_id": 1,
"class_name": "Body Pump 2",
"class_type": "Aerobics",
"class_desc": "Quick workout to get the sweat flowing!",
"start_time": "9AM",
"duration": "30 Minutes",
"intensity": "Moderate",
"location": "Durham, NC",
"registered": 5,
"max_size": 20
},
{
"id": 8,
"instructor_id": 1,
"class_name": "Extreme Weightlifting",
"class_type": "Weightlifting",
"class_desc": "Super Intense workout to get the sweat flowing!",
"start_time": "9AM",
"duration": "60 Minutes",
"intensity": "Extreme",
"location": "Graham, NC",
"registered": 5,
"max_size": 20
}

```

**Update class by ID (requires authentication)**

PUT - /api/classes/:id

**Delete Class by ID (requires authentication)**

DEL - api/classes/:id

**Get all Users (requires authentication)**

GET - /api/users

**Example**

```

{
"id": 1,
"username": "tom",
"name": "Tom Smith",
"email": "tom@yahoo.com",
"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend, diam interdum dapibus imperdiet, diam est sagittis mi, a mattis quam nulla et lacus."
},
{
"id": 2,
"username": "john",
"name": "John Roberts",
"email": "john@roberts.com",
"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend, diam interdum dapibus imperdiet, diam est sagittis mi, a mattis quam nulla et lacus."
},
{
"id": 3,
"username": "bill",
"name": "Bill Edwards",
"email": "bill@aol.com",
"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend, diam interdum dapibus imperdiet, diam est sagittis mi, a mattis quam nulla et lacus."
}

```

**Get User by ID (requires authentication)**

GET - /api/users/:id

**Get all Instructors (requires authentication)**

GET - /api/instructors

**Example**

```

{
"id": 1,
"username": "hulk",
"name": "Hulk Hogan",
"email": "hulk@hogan.com",
"bio": "World class wrestler ready to get you buff!"
},
{
"id": 2,
"username": "muscle",
"name": "Muscle Man",
"email": "muscle@muscle.com",
"bio": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
},
{
"id": 3,
"username": "rock",
"name": "Dwayne Johnson",
"email": "dwayne@therock.com",
"bio": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
}

```