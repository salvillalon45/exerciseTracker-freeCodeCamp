# Exercise Tracker

freeCodeCamp - Back End Development and APIs | Project: Exercise Tracker

# Summary

Create a Exercise Tracker REST API that does the follwing:

-   Create new users
-   Create new exercise for users
-   Creates a log of the exercises a user has done

It has the following routes:

-   **/api/users**
    -   **GET**: Get a list of users
    -   **POST**: Pass in a `username` in the form data to create a new user. The response from this request will be an object withe `username` and `_id` properties
    -   Response Example
    ```
    {
        username: "fcc_test",
        _id: "5fb5853f734231456ccb3b05"
    }
    ```
-   **/api/users/:\_id/exercises**
    -   **POST**: With form data `description`, `duration`, and optionally `date`. If no `date` is supplied, the current `date` will be used. It will create a new exercise for the user. The response from this request will be a `user` object with the `exercise fields` added.
    -   Response Example
    ```
    {
        username: "fcc_test",
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
        _id: "5fb5853f734231456ccb3b05"
    }
    ```
-   **/api/users/:\_id/logs**
    -   **GET**: To retrieve a full exercise log of any user. The response object from this request will contain
        -   `count`: total exercises in the log
        -   `log`: array of all exercises added
        -   `username` and `id`
        -   Example of Response
        ```
        {
            username: "fcc_test",
            count: 1,
            _id: "5fb5853f734231456ccb3b05",
            log: [{
                description: "test",
                duration: 60,
                date: "Mon Jan 01 1990",
            }]
        }
        ```

**[Learn more about the Project Task.](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker)**

### Implementation

-   Created a TypeScript + Express API
-   Created the `routes/api.ts` to organize the routes that the api will use
-   Created the `controllers/userController.ts`. It contains all the api handlers that the routes will use to do the logic on each api call
-   Trying for the first time Prisma as an ORM. Connected Prisma with MongoDB
-   Created three prisma schemas: `Log`, `User`, and `Exercise`. Where `Log` has a relation to `User`.
-   Created the `apiUtils.ts` to contain five functions that connect to the `MongoDB` using the Prisma client.
-   Created `utils/index.ts` that has two functions to organize and validate dates
-   Created four routes along with their api handlers:
    -   `router.post('/users', createNewUser);`
    -   `router.get('/users', getUsers);`
    -   `router.post('/users/:_id/exercises', createExercise);`
    -   `router.get('/users/:_id/logs', getUserExerciseLog);`

### Lessons Learned

-   This was my first time using Prisma and it very easy to use. I noticed that when I created a new `Log` entity. It was automatically inserted into the `User` `log` field. I still need to investiage why that happend. Is it due to the `relation` that the `User` and `Log` schemas have with each other?
-   Object-Relational Mapping (ORM): It is a programming technique that allows developers to interact with a relational database using an object-oriented programming language. Here we use Prisma to bridge the gap between `MongoDB` and `TypeScript`. With Prisma I could use `TypeScript` code to make queries! This is different from just doing straight SQL queries in the code.
-   Object-Document Mapping (ODM): A concept similar to ORM, but ODM is for `NoSQL` databases. I will use `Mongoose` in my projects a lot. Using `Mongoose` with `MongoDB` is a better developer experience since `Mongoose` is intended for `MongoDB`! While Prisma supports mainly relational dbs.
-   MongoDB stores their `id` field with an underscore like so `_id`. Prisma keeps their `id` with no underscore. For the tests to pass I had to switch each `id` to `_id`.
    -   Example
    ```
    const users = usersDB.map(({ username, id }) => {
    	return {
    		username,
    		_id: id
    	};
    })
    ```

### Resources

-   Use the [Prisma Quickstart guide](https://www.prisma.io/docs/getting-started/quickstart)!
-   Needed to learn how to distinguish between Prisma and Mongoose. Use this [documenation](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-mongoose) to learn from!
-   `Date.parse()`: This parses the string representation of a date and returns the date timestamp in a number! This is great when trying to compare two dates! This was done in the `getUserExerciseLog` api handler where I was comparing the `to` and `from` query params to filter out the dates
-   `Number.isInteger()`: Did not use it in the code, but this determines whether the input is an integer or not!
-   Use [this repo](https://replit.com/@juanrozo89/exercise-tracker#index.js) for guidance on the to, from, and limit query. Thank you @juanrozo89!

### Demo

<img alt="Exercise Tracker Demo" src="./docs/exercise_tracker_demo.mp4" width="600" />

# Technologies:

-   JavaScript
-   TypeScript
-   Render
-   MongoDB
-   Prisma
