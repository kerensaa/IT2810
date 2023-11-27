# Prosjekt 2

This project is created for the course IT2810 by team 32. 

Vite has been used to set up the react project, as advised. 


This team consists of four collaborators: 
 * Alf Berger Husem
 * Kirsten-Elise Hanssen Rensaa
 * Pantea Joobanian
 * Åshild Tenold Fridtun

# Project set-up

## Cloning the project
 
 Create an access token, you will need to use this token a a password to access the project

 Clone the project to a local folder

 Open project in desired IDE 

 ## Run the project 

### Frontend
Make sure to cd into /recipes_app from the root level. Then run the following commands:
1. Run `npm install`
2. Run `npm run dev`

### Backend
Make sure to cd into /server in /recipes_app. Then run the following command: 

`node server.js`

# About

Our project displays different recipes, with a grid view of all recipes. The user has the possibility of clicking on and seeing more detailed information about each recipe. 

The current functionality includes:

- An AutoComplete search bar with complete search functionality.

- Pagination implemented with navigation functionality at the bottom of the page. A limited subset of data is fetched at a time from the database.

- Detailed information about each recipe on their dedicated recipe pages. A user can click on a recipe on the landing page and see more detailed information.

- Sorting and filtering functionality is implemented, completed with api calls which sort and filter the whole dataset before it is loaded to the client.

- Review/comments can be made by users and are stored in the database, making it possible for anyone to write comments and everyone to see. 
- Favorite and rating functionality stored locally using IndexedDB. The user is able to favorite recipes they want to save as well as give ratings. The ratings are to be combined with reviews for the next delivery. 

# Web Accessibility

- The web application can be operated fully from the keyboard. 

- React Fragments are used as an alternative to unstyled `<div>` elements. Sometimes, `<div>`elements break html sematics. React Fragments is therefore used to group elements together where needed.

- Accessible labels are included over input fields like the search bar and comment section. This is added so that it can be read by screen readers. 

- In order to expose error-text to screen readers as well, `aria-live="polite"`is included for simple errors like single recipes not being fetched correctly from the database. 



# Testing

To run the tests, make sure to cd into /recipes_app. Then run the following commands:
1. Run `npm install`
2. Run `npm run test`

This project uses cypress for end-to-end testing. To run cypress make sure to be in 
 /recipes_app and run `npm install` 
 Then to run the tests use: `npx cypress run`
 To see the test run in browser use `npx cypress open` 
 and choose the spec.cy.ts file.
