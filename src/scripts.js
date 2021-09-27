// imports
import '../assets/Dog-KD0C4465a.png';
import '../assets/single room.png';
import '../assets/junior suite.png';
import '../assets/suite.png';
import '../assets/residential suite.png';

import dayjs from "dayjs";
import MicroModal from 'micromodal';

import "./css/base.scss";
import {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
} from "./apiCalls"
import domUpdates from "./domUpdates";
const {
  greeting, viewBookings, totalSpent, containerBookingCards, startDate, endDate, showRooms, dateRangeSelect, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters
} = domUpdates;

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

dateRangeSelect.addEventListener("submit", () => {
  event.preventDefault();
  hotel.populateAvailableRooms(
    hotel.generateDateRange(
      dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
    )
  );
  console.log(hotel.availableRooms);
  domUpdates.renderRoomCards(hotel);
})

filterByRoomType.addEventListener("click", () => {
  if (event.target.type === "button") {
    if (event.target.value !== "clear all") {
      event.target.checked
        ? event.target.checked = false
        : event.target.checked = true;
      let filterCriteria = Array.from(roomTypeFilters).filter(roomTypeButton =>
        roomTypeButton.checked
      ).map(roomTypeButton =>
        roomTypeButton.value
      );
      filterCriteria.length
        ? domUpdates.renderRoomCards(hotel, filterCriteria)
        : domUpdates.renderRoomCards(hotel)
    } else if (event.target.value === "clear all" &&
      Array.from(roomTypeFilters).some(roomTypeButton =>
        roomTypeButton.checked)
      )
    {
      roomTypeFilters.forEach(roomTypeButton =>
        roomTypeButton.checked = false
      );
      domUpdates.renderRoomCards(hotel);
    } else {
      console.log("something\'s broken");
    }
  }
})

const storeFetchedData = (responseArray) => {
  // do I actually need to store these, or just use them to instantiate hotel?
  customers = responseArray[1];
  bookings = responseArray[2];
  rooms = responseArray[3];

  hotel = new Hotel(customers, bookings, rooms);
  hotel.instantiateAll();

  // create customer & populate bookings so they can be rendered
  currentCustomer = hotel.customers.find(cust => cust.id === responseArray[0].id);
  currentCustomer.populateBookings(hotel.bookings)

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
