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
    -   **POST**: Pass in a `username` in the form data to create a new user. The response from this request will be an object withe username and \_id properties
    -   Response Example
    ```
    {
        username: "fcc_test",
        _id: "5fb5853f734231456ccb3b05"
    }
    ```
-   **/api/users/:\_id/exercises**
    -   **POST**: With form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used. It will create a new exercise for the user. The response from this request will be a `user` object with the exercise fields added.
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
    -   `router.post('/users/:\_id/exercises', createExercise);`
    -   `router.get('/users/:\_id/logs', getUserExerciseLog);`

### Lessons Learned

-   This was my first time using Prisma and it very easy to use. I noticed that when I created a new `Log` entity. It was automatically inserted into the `User` `log` field. I still need to investiage why that happend. Is it due to the `relation` that the `User` and `Log` schemas have with each other?

### Resources

-   Needed to learn how to distinguish between Prisma and Mongoose: https://www.prisma.io/docs/orm/more/comparisons/prisma-and-mongoose

### Demo

<img alt="Url Shortener Demo" src="./url_shortener_demo.mp4" width="600" />

# Technologies:

-   JavaScript
-   TypeScript
-   Render
-   MongoDB
-   Prisma
