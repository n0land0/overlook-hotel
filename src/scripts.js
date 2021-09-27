// images
import '../assets/Dog-KD0C4465a.png';
import '../assets/single room.png';
import '../assets/junior suite.png';
import '../assets/suite.png';
import '../assets/residential suite.png';

// dependencies
import dayjs from "dayjs";
import MicroModal from 'micromodal';

// styles
import "./css/base.scss";

// data requests
import {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
} from "./apiCalls";

// DOM-related functions
import domUpdates from "./domUpdates";
const {
  greeting, viewBookings, totalSpent, containerBookingCards, startDate, endDate, showRooms, dateRangeSelect, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters
} = domUpdates;

// data classes
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
  MicroModal.init();
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

containerRoomCards.addEventListener("click", () => {
  if (event.target.parentNode.classList.contains("room-card") ||
  event.target.classList.contains("room-card")) {
    // temporarily launch POST from here, then style modal after
    let targetRoomNumber;
    if (event.target.parentNode.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.parentNode.id);
    }
    if (event.target.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.id);
    }

// async - some of this needs to be in .then()
    hotel.generateDateRange(
      dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
    ).forEach(date => {
      addBooking(currentCustomer.id, date, targetRoomNumber).then(data => console.log(data))
    })


    // getAll("bookings").then(bookingsArray => bookings = bookingsArray)
    getAll("bookings").then(bookingsArray => {
      bookings = bookingsArray;
      hotel.updateBookings(bookings)

      currentCustomer.populateBookings(hotel.bookings)
      currentCustomer.calculateTotalSpent(hotel.rooms)
      domUpdates.renderBookings(currentCustomer, rooms);

      console.log("After POST", hotel.bookings)
      console.log("After POST", currentCustomer.bookings)
    })
    // })
    // hotel.updateBookings(bookings)
    //
    // currentCustomer.populateBookings(hotel.bookings)
    // currentCustomer.calculateTotalSpent(hotel.rooms)
    // domUpdates.renderBookings(currentCustomer, rooms);
    // console.log("After POST", hotel.bookings)
    // console.log("After POST", currentCustomer.bookings)
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
  console.log("Page load", currentCustomer.bookings)
  currentCustomer.calculateTotalSpent(hotel.rooms)


  domUpdates.renderUser(currentCustomer);
  domUpdates.renderBookings(currentCustomer, rooms);
  domUpdates.renderMinimumDates();

  console.log("Page load", hotel.bookings)
}

// getAll("customers")
// getAll("bookings")
// getAll("rooms")
//
//
// console.log(addBooking(1, "2020/01/01", 1))
// console.log(getSingleCustomer(1))
//
// removeBooking(1632451293145)

const checkData = dataSet => {
  return !Object.keys(dataSet).length || Object.values(dataSet).includes(undefined);
}
