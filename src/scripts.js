// imports
import "./css/base.scss";
import {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
} from "./apiCalls"

import Hotel from "./classes/Hotel"
import Customer from "./classes/Customer"
import Booking from "./classes/Booking"
import Room from "./classes/Room"

// global variables
let hotel;
let currentCustomer;
let customers;
let bookings;
let rooms;

// event listeners
window.addEventListener("load", () => {
  Promise.all([
    getSingleCustomer(50),
    getAll("customers"),
    getAll("bookings"),
    getAll("rooms")
  ])
  .then(responseArray => storeFetchedData(responseArray))
})

const storeFetchedData = (responseArray) => {
  hotel = new Hotel();
  currentCustomer = new Customer(responseArray[0]);
  customers = responseArray[1].map(customerObj => new Customer(customerObj));
  bookings = responseArray[2].map(bookingObj => new Booking(bookingObj));
  rooms = responseArray[3].map(roomObj => new Room(roomObj));

  currentCustomer.populateBookings(bookings)
  bookings[1].calculateTotalCost(rooms)
  rooms[0].populateBookedDates(bookings)

  // console.log(hotel)
  // console.log(currentCustomer)
  // console.log(customers)
  // console.log(bookings)
  // console.log(rooms)
  console.log(currentCustomer.id)
  console.log(currentCustomer.name)
  console.log(currentCustomer.bookings)

  console.log(bookings[1])
  console.log(rooms[0])
}

// getAll("customers")
// getAll("bookings")
// getAll("rooms")
//
// getSingleCustomer(11)
//
// addBooking(1, "2020/01/01", 1)
//
// removeBooking(1632451293145)
