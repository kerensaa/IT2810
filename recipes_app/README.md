# Prosjekt 2

This project is created for the course IT2810 by team 32. 

Vite has been used to set up the react project, as advised. 


This team consists of four collaborators: 
 * Alf Berger Husem
 * Kirsten-Elise Hanssen Rensaa
 * Pantea Joobanian
 * Åshild Tenold Fridtun

## Project set-up

### Cloning the project
 
 Create an access token, you will need to use this token a a password to access the project

 Clone the project to a local folder

 Open project in desired IDE 

 ### Run project 

#### Frontend
Make sure to cd into /recipes_app. Then run the following commands:
1. Run `npm install`
2. Run `npm run dev`

#### Backend
Make sure to cd into /server. Then run the following command: 

`node server.js`

## About our project

Our project displays different recipes, with a view of all recipes and possibility to click on each recipe. 

The current functionality includes:

- An AutoComplete search bar with complete search functionality

- Pagination implemented with navigation functionality at the bottom fo the page. A limited subset of data is fetched at a time from the database

- Detailed information about each recipe on their dedicated recipe pages. A user can click on a recipe on the landing page and see more detailed information.

- Sorting and filtering functionality is implemented, complete with api calls sorting and filtering the whole dataset before it is loaded to the client

- Review/comments can be made by users and are stored in the database, making it possible for anyone to write comments and everyone to see. 
- Favorite and rating functionality stored locally using IndexedDB. The user is able to favorite recipes they want to save as well as give ratings. The ratings are to be combined with reviews for the next delivery.  

## Testing

To run the tests, make sure to cd into /recipes_app. Then run the following commands:
1. Run `npm install`
2. Run `npm run test`
