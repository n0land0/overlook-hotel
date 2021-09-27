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
  greeting, viewBookings, totalSpent, containerBookingCards, startDate, endDate, showRooms, dateRangeSelect, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters, clearAllButton, modalTitle, modalContent, bookNowButton, loginForm, usernameField, passwordField
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
let targetRoomNumber;

// event listeners
window.addEventListener("load", () => {
  MicroModal.init();
  Promise.all([
    // getSingleCustomer(50),
    getAll("customers"),
    getAll("bookings"),
    getAll("rooms")
  ])
  .then(responseArray => storeFetchedData(responseArray))
  .catch(error => domUpdates.showError(error, loginForm))
})

loginForm.addEventListener("submit", () => {
  event.preventDefault();
  // adjust for invalid usernames later
  if (hotel.customers.find(cust => cust.username === usernameField.value).password === passwordField.value) {
    currentCustomer = hotel.customers.find(cust => cust.username === usernameField.value);
    currentCustomer.populateBookings(hotel.bookings)
    // console.log("Page load", currentCustomer.bookings)
    currentCustomer.calculateTotalSpent(hotel.rooms)
    //
    //
    domUpdates.renderUser(currentCustomer);
    domUpdates.renderBookings(currentCustomer, rooms);
    domUpdates.renderMinimumDates();

    domUpdates.hide(loginForm);
    domUpdates.show(dashboardView);
  }
})

const storeFetchedData = (responseArray) => {
  // do I actually need to store these, or just use them to instantiate hotel?
  customers = responseArray[0];
  bookings = responseArray[1];
  rooms = responseArray[2];

  hotel = new Hotel(customers, bookings, rooms);
  hotel.instantiateAll();

  // create customer & populate bookings so they can be rendered
    // may have to move this to login event listener
  // currentCustomer = hotel.customers.find(cust => cust.id === responseArray[0].id);
  // currentCustomer.populateBookings(hotel.bookings)
  // console.log("Page load", currentCustomer.bookings)
  // currentCustomer.calculateTotalSpent(hotel.rooms)
  //
  //
  // domUpdates.renderUser(currentCustomer);
  // domUpdates.renderBookings(currentCustomer, rooms);
  // domUpdates.renderMinimumDates();
  //
  // console.log("Page load", hotel.bookings)
  //
  // console.log(currentCustomer.username)
}

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
  // move some of this to domUpdates
     // domUpdates.inactivate(btn) fxn?
  if (event.target.type === "button") {
    if (event.target.value !== "clear all") {

      event.target.checked
        ? event.target.checked = false
        : event.target.checked = true;

      domUpdates.toggle(event.target, "button-selected");

      let filterCriteria = Array.from(roomTypeFilters).filter(roomTypeButton =>
        roomTypeButton.checked
      ).map(roomTypeButton =>
        roomTypeButton.value
      );

      filterCriteria.length
        ? (domUpdates.renderRoomCards(hotel, filterCriteria), clearAllButton.classList.remove("inactive"))
        : (domUpdates.renderRoomCards(hotel), clearAllButton.classList.add("inactive"))

    } else if (event.target.value === "clear all" &&
      Array.from(roomTypeFilters).some(roomTypeButton => roomTypeButton.checked)) {

      roomTypeFilters.forEach(roomTypeButton => {
        roomTypeButton.checked = false;
        roomTypeButton.classList.remove("button-selected");
      });

      clearAllButton.classList.add("inactive");
      domUpdates.renderRoomCards(hotel);
    }
  }
})

bookNowButton.addEventListener("click", () => {
  // async - some of this needs to be in .then()
  hotel.generateDateRange(
    dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
  ).forEach(date => {
    addBooking(currentCustomer.id, date, targetRoomNumber).then(data => console.log(data))
  })


  // getAll("bookings").then(bookingsArray => bookings = bookingsArray)
  getAll("bookings")
  .then(bookingsArray => {
    bookings = bookingsArray;
    hotel.updateBookings(bookings)

    currentCustomer.populateBookings(hotel.bookings)
    currentCustomer.calculateTotalSpent(hotel.rooms)
    domUpdates.renderBookings(currentCustomer, rooms);

    console.log("After POST", hotel.bookings)
    console.log("After POST", currentCustomer.bookings)
  })
  .catch(error => domUpdates.showError(error, roomSelectView))
})


// some of this should be in domUpdates
containerRoomCards.addEventListener("click", () => {
  if (event.target.parentNode.classList.contains("room-card") ||
  event.target.classList.contains("room-card")) {
    // temporarily launch POST from here, then style modal after
    // let targetRoomNumber;
    if (event.target.parentNode.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.parentNode.id);
    }
    if (event.target.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.id);
    }

    let targetRoom = hotel.rooms.find(roomObj => roomObj.number === targetRoomNumber)
    let bidetStatus = targetRoom.bidet ? "Bidet included" : "Bidet not included";
    let bedPlural = (targetRoom.numBeds > 1) ? "beds" : "bed"

    modalTitle.innerText = `Room #${targetRoom.number} - ${targetRoom.roomType} - from $${targetRoom.costPerNight.toFixed(2)}/night`
    modalContent.innerHTML = `
      <img src="../images/${targetRoom.roomType}.png" alt="">
      <p>${targetRoom.numBeds} ${targetRoom.bedSize} ${bedPlural}</p>
      <p>${bidetStatus}</p>
    `;
    MicroModal.show("modal-1");

// async - some of this needs to be in .then()
    // hotel.generateDateRange(
    //   dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
    // ).forEach(date => {
    //   addBooking(currentCustomer.id, date, targetRoomNumber).then(data => console.log(data))
    // })
    //
    //
    // // getAll("bookings").then(bookingsArray => bookings = bookingsArray)
    //
    // getAll("bookings").then(bookingsArray => {
    //   bookings = bookingsArray;
    //   hotel.updateBookings(bookings)
    //
    //   currentCustomer.populateBookings(hotel.bookings)
    //   currentCustomer.calculateTotalSpent(hotel.rooms)
    //   domUpdates.renderBookings(currentCustomer, rooms);
    //
    //   console.log("After POST", hotel.bookings)
    //   console.log("After POST", currentCustomer.bookings)
    // })

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

// const storeFetchedData = (responseArray) => {
//   // do I actually need to store these, or just use them to instantiate hotel?
//   customers = responseArray[1];
//   bookings = responseArray[2];
//   rooms = responseArray[3];
//
//   hotel = new Hotel(customers, bookings, rooms);
//   hotel.instantiateAll();
//
//   // create customer & populate bookings so they can be rendered
//   currentCustomer = hotel.customers.find(cust => cust.id === responseArray[0].id);
//   currentCustomer.populateBookings(hotel.bookings)
//   console.log("Page load", currentCustomer.bookings)
//   currentCustomer.calculateTotalSpent(hotel.rooms)
//
//
//   domUpdates.renderUser(currentCustomer);
//   domUpdates.renderBookings(currentCustomer, rooms);
//   domUpdates.renderMinimumDates();
//
//   console.log("Page load", hotel.bookings)
//
//   console.log(currentCustomer.username)
// }

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
