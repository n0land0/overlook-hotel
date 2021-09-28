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
  greeting, greetingContainer, viewBookings, totalSpent, containerBookingCards, startDate, endDate, showRooms, dateRangeSelect, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters, clearAllButton, modalTitle, modalContent, bookNowButton, loginForm, usernameField, passwordField, invalidUsername, invalidPassword
} = domUpdates;

// data classes
import Hotel from "./classes/Hotel"
import Customer from "./classes/Customer"
import Booking from "./classes/Booking"
import Room from "./classes/Room"

// global variables
let hotel;
let currentCustomer;
  // do I need these?
let customers;
let bookings;
let rooms;

let targetRoomNumber;

// event listeners
window.addEventListener("load", () => {
  MicroModal.init();
  Promise.all([
    getAll("customers"),
    getAll("bookings"),
    getAll("rooms")
  ])
  .then(responseArray => storeFetchedData(responseArray))
  .catch(error => domUpdates.showError(error, loginForm))
})

const storeFetchedData = (responseArray) => {
  hotel = new Hotel(responseArray[0], responseArray[1], responseArray[2]);
  hotel.instantiateAll();
}

loginForm.addEventListener("submit", () => {
  event.preventDefault();
  currentCustomer = hotel.customers.find(cust => cust.username === usernameField.value);

  if (!currentCustomer) {
    domUpdates.show(invalidUsername)
    domUpdates.hide(invalidPassword)
  }

  if (currentCustomer.password !== passwordField.value) {
    domUpdates.show(invalidPassword)
    domUpdates.hide(invalidUsername)
  }

  if (currentCustomer.password === passwordField.value) {
    currentCustomer.populateBookings(hotel.bookings)
    currentCustomer.calculateTotalSpent(hotel.rooms)

    domUpdates.renderUser(currentCustomer);
    domUpdates.renderBookings(currentCustomer, hotel.rooms);
    domUpdates.renderMinimumDates();

    domUpdates.hide(loginForm);
    domUpdates.show(greetingContainer);
    domUpdates.show(dashboardView);
  }
})


dateRangeSelect.addEventListener("submit", () => {
  event.preventDefault();
  hotel.populateAvailableRooms(
    hotel.generateDateRange(
      dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
    )
  );

  domUpdates.renderRoomCards(hotel);
})

filterByRoomType.addEventListener("click", () => {
  if (event.target.type === "button") {
    if (event.target.value !== "clear all") {
      domUpdates.toggleCheckedStatus(event.target);
      domUpdates.toggle(event.target, "button-selected");
      domUpdates.renderFilteredResults(hotel);
    } else if (event.target.value === "clear all" &&
      // Array.from(roomTypeFilters).some(roomTypeButton => roomTypeButton.checked)) {
      [...roomTypeFilters].some(roomTypeButton => roomTypeButton.checked)) {

      domUpdates.clearFilters();
      domUpdates.renderRoomCards(hotel);
    }
  }
})

// function postBookings(booking) {
//   Promise.all(
//     booking.singleBookings.map(booking => {
//       return updateBookings(booking.userID, booking.date, booking.roomNumber)
//     })).then(() => {
//     fetchData('bookings')
//       .then(data => hotel.bookings = data.bookings)
//       .then(() => showConfirmation())
//       .then(() => newCustomer.getBookings(hotel))
//       .then(() => displayDashboardInfo())
//       .catch(error => displayErrorMessage(error, bookingPreview))
//   })
// }

bookNowButton.addEventListener("click", () => {
  // let datesBooked = hotel.generateDateRange(dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD"))

  Promise.all(hotel.generateDateRange(
    dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
  ).map(date =>
    addBooking(currentCustomer.id, date, targetRoomNumber)
    // .then(data => console.log("After POST", data))
  ))
  .then(() => {
    getAll("bookings")
    .then(bookingsArray => hotel.updateBookings(bookingsArray))
    .then(() => {
      currentCustomer.populateBookings(hotel.bookings)
      currentCustomer.calculateTotalSpent(hotel.rooms)
      domUpdates.renderBookings(currentCustomer, hotel.rooms);
      // console.log("After GET", hotel.bookings)
      // console.log("After GET", currentCustomer.bookings)
    })
    .catch(error => domUpdates.showError(error, roomSelectView))
  })
})

// some of this should be in domUpdates
containerRoomCards.addEventListener("click", () => {
  if (event.target.parentNode.classList.contains("room-card") ||
  event.target.classList.contains("room-card")) {

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
  }
})

const checkData = dataSet => {
  return !Object.keys(dataSet).length || Object.values(dataSet).includes(undefined);
}
