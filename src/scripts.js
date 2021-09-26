// imports
import '../assets/Maud-4-1.png';

import dayjs from "dayjs";

import "./css/base.scss";
import {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
} from "./apiCalls"
import domUpdates from "./domUpdates";
const {greeting, viewBookings, totalSpent, containerBookingCards, startDate, endDate} = domUpdates;

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
  // hotel = new Hotel(customers, bookings, rooms);
  // currentCustomer = new Customer(responseArray[0]);
  // customers = responseArray[1].map(customerObj => new Customer(customerObj));
  customers = responseArray[1];
  // bookings = responseArray[2].map(bookingObj => new Booking(bookingObj));
  bookings = responseArray[2];
  // rooms = responseArray[3].map(roomObj => new Room(roomObj));
  rooms = responseArray[3];
  hotel = new Hotel(customers, bookings, rooms);
  hotel.instantiateAll();
  currentCustomer = hotel.customers.find(cust => cust.id === responseArray[0].id);

  console.log(hotel)

  console.log("Hotel rooms: ", hotel.rooms[0])
  console.log(currentCustomer);
  currentCustomer.populateBookings(hotel.bookings)
  console.log("Populate single customer bookings: ", currentCustomer.bookings)
  console.log("Calculate single customer spending: ", currentCustomer.calculateTotalSpent(hotel.rooms))
  console.log("Calculate single booking cost: ", hotel.bookings[1].calculateTotalCost(hotel.rooms))
  hotel.rooms[0].populateUnavailableDates(hotel.bookings)
  console.log("Populate room unavailability: ", hotel.rooms[0].unavailableDates);

  // console.log(hotel)
  // console.log(currentCustomer)
  // console.log(customers)
  // console.log(bookings)
  // console.log(rooms)

  // console.log(currentCustomer.id)
  // console.log(currentCustomer.name)
  // console.log(currentCustomer.bookings)
  // console.log(currentCustomer.totalSpent)

  // console.log(bookings[1])
  // console.log(rooms[0])

  domUpdates.renderUser(currentCustomer);
  domUpdates.renderBookings(currentCustomer, rooms);
  domUpdates.renderMinimumDates();
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

const checkData = dataSet => {
  return !Object.keys(dataSet).length || Object.values(dataSet).includes(undefined);
}
