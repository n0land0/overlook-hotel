# Overlook Hotel

## Abstract

What's Cookin' is a recipe tracking / meal planning application that allows users to view their favorite recipes and plan shopping trips around them. The idea is similar to sites like All Recipes or New York Times Cooking. Users should view a list of recipes, favorite their own recipes, and choose recipes to cook.

## Installation

1. Clone the [client-side application](https://github.com/n0land0/overlook-hotel) to your local machine.
2. Clone the [Overlook API](https://github.com/turingschool-examples/overlook-api) to a separate directory.
3. In the API's root directory, run `npm install` to install dependencies, then `npm start` to launch the server for the API.
4. In the application's root directory, run `npm install` to install dependencies, then `npm start` to launch the app server.
5. Copy the `http://localhost:<number>` URL returned by the previous step and visit the URL in your browser.
6. Start messing around on the page!

## Usage and Demonstration

Please see our demo video [here](https://www.youtube.com/watch?v=aHChq0GsRFE).

## Programming Languages and Dependencies

**This app was developed using:**

- HTML5
- CSS/SCSS
- JavaScript
- Mocha and Chai testing frameworks
- DOM API
- Fetch API
- Webpack
- NPM
- Micromodal
- DayJS
- Postman

## Wins and Challenges

**Wins**

- We gained better understanding of asynchronous JS
  - We have used DOM API to some extent in previous projects, but by making extensive use of the fetch API, we had to learn how to control the flow and timing and events
- Our app achieved excellent accessiblity according to the Lighthouse score (97)
- We managed to dry our CSS file using SCSS
- We separate data structure (user info, recipes, ingredients)and DOM manipulations into different folders.

**Challenges**

- Error handling in our fetch POST and GET in response to different types of network errors
- Keeping a smooth project board workflow

## Future Additions

- Be able to tab through drop down menu
- Be able to filter recipes by tags based on search result.
- Display a featured blog post at page load.

## Contributions

**Developer:**

_This app was developed by:_

- [Nolan Caine](https://github.com/n0land0)

_Nolan is a student of front-end engineering at the [Turing School of Software & Design](https://turing.edu/)._

**Project Manager**

- [Hannah Hudson](https://github.com/hannahhch)

[Project spec](https://frontend.turing.edu/projects/overlook.html) and assets provided by the [Turing School of Software & Design](https://turing.edu/).
