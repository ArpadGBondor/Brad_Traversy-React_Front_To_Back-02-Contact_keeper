# Brad Traversy - React Front To Back - 02 - Contact Keeper

## Udemy - [Brad Traversy - React Front To Back](https://www.udemy.com/course/modern-react-front-to-back/)

-   Section 6: Project 2 Start [Contact Keeper - MERN] & Express Server Setup
-   Section 7: Backend Users, Contacts & JWT Authentication
-   Section 8: Client Side Setup & Contacts UI
-   Section 9: React/Express Authentication
-   Section 10: Contacts API Integration & Deploy

## Deployed

-   Deployed on [Heroku](https://gabriel-contact-keeper.herokuapp.com/)

## Used Tools:

- Backend:
    - Node.js
    - Express.js
    - Mongoose + MongoDB Atlas
    - Authentication API
    - CRUD API
- Frontend:
    - React.js
    - Context API

## Mayor changes:

 - The project was created using the newest version (v6.0.0) of the `react-router-dom` package, so I had to improvise here and there. :)
 - I'm using `dotenv` package to hide my secrets, instead of the `config` package used by the tutorial.
 - I improved the error handling during the integration of the front- and the backend, because the tutorial didn't handle error messages from the backend's data validation.

## Environment variable:

-   Create a file named `.env` and set these variables:
    -   `DB_CONNECT=mongodb://localhost:27017/ContactKeeperDB`
    -   `JWT_SECRET=SecretKeyForJsonWebTokens`

## Original Course Code:

-   The original code for this project can be found in [this Github repo](https://github.com/bradtraversy/contact-keeper)
