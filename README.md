# Hötel for Dögs

## Abstract

Hötel for Dögs is a hotel booking application allowing a user to plan future hotel stays and view their booking history. Like most hotel sites, the app allows the user to search for specific dates and room types, and shares price and amenity information as well.

## Installation

1. Clone the [client-side application](https://github.com/n0land0/overlook-hotel) to your local machine.
2. Clone the [Overlook API](https://github.com/turingschool-examples/overlook-api) to a separate directory.
3. In the API's root directory, run `npm install` to install dependencies, then `npm start` to launch the server for the API.
4. In the application's root directory, run `npm install` to install dependencies, then `npm start` to launch the app server.
5. Copy the `http://localhost:<number>` URL returned by the previous step and visit the URL in your browser.
6. Start messing around on the page!

## Usage and Demonstration

## Programming Languages and Dependencies

**This app was developed using:**

- HTML5
- CSS/SCSS
- JavaScript
- Mocha 
- Chai
- DOM API
- Fetch API
- Webpack
- NPM
- Micromodal
- DayJS
- Postman

## Wins and Challenges

**Wins**

- Class architecture turned out to be quite modular and powerful - hotel had storage capabilites, but giving each class access to the others turned out to make implementation code easier to write
- Repeated successful use of POST requests, iteratively and in a timely manner, to display updated API info for multiple bookings on the page without refresh
- Perfect accessibility score from Lighthouse
- Use of multiple partial files for JS and SCSS code for improved organization

**Challenges**

- Experimenting with the structure of event handlers helped in some ways and hurt in others
- In hindsight, use of a Login class and reimagined implementation of Customer class would have made some excessive conditionals cleaner
- Lots of styling was necessary to make even the MVP

## Future Additions

- Manager functionality
- Advanced filtering and adjustable dates on search results
- Smoother transitions

## Contributions

**Developer:**

_This app was developed by:_

- [Nolan Caine](https://github.com/n0land0)

_Nolan is a student of front-end engineering at the [Turing School of Software & Design](https://turing.edu/)._

**Project Manager**

- [Hannah Hudson](https://github.com/hannahhch)

[Project spec](https://frontend.turing.edu/projects/overlook.html) and assets provided by the [Turing School of Software & Design](https://turing.edu/).
