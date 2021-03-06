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
  greeting, greetingContainer, viewBookings, totalSpent, containerBookingCards, startDate, endDate, showRooms, dateRangeSelect, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters, clearAllButton, modalTitle, modalContent, bookNowButton, modalFooter, returnToDashboardButton, loginView, loginForm, usernameField, passwordField, invalidUsername, invalidPassword, navDashboardButton
} = domUpdates;

// data classes
import Hotel from "./classes/Hotel"
import Customer from "./classes/Customer"
import Booking from "./classes/Booking"
import Room from "./classes/Room"

// global variables
let hotel;
let currentCustomer;
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
  if ( 0 < usernameField.value.split("customer")[1] <= 50 ) {
    currentCustomer = hotel.customers.find(cust => cust.username === usernameField.value);
  }

  if (!currentCustomer || currentCustomer.password !== passwordField.value) {
    domUpdates.show(invalidPassword)
  }

  if (currentCustomer.password === passwordField.value) {
    currentCustomer.populateBookings(hotel.bookings)
    currentCustomer.calculateTotalSpent(hotel.rooms)

    domUpdates.renderUser(currentCustomer);
    domUpdates.renderBookings(currentCustomer, hotel.rooms);
    domUpdates.renderMinimumDates();

    domUpdates.hide(loginView);
    domUpdates.show(greetingContainer);
    domUpdates.show(dashboardView);
  }
})

navDashboardButton.addEventListener("click", () => {
  domUpdates.show(dashboardView);
  domUpdates.hide(roomSelectView);
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

startDate.addEventListener("change", () => {
  domUpdates.renderMinimumEndDate();
})

filterByRoomType.addEventListener("click", () => {
  if (event.target.type === "button") {
    if (event.target.value !== "clear all") {
      domUpdates.toggleCheckedStatus(event.target);
      domUpdates.toggle(event.target, "button-selected");
      domUpdates.renderFilteredResults(hotel);
    } else if (event.target.value === "clear all" &&
      [...roomTypeFilters].some(roomTypeButton => roomTypeButton.checked)) {

      domUpdates.clearFilters();
      domUpdates.renderRoomCards(hotel);
    }
  }
})

containerRoomCards.addEventListener("click", () => {
  if (event.target.parentNode.classList.contains("room-card") ||
  event.target.classList.contains("room-card")) {

    if (event.target.parentNode.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.parentNode.id);
    }
    if (event.target.classList.contains("room-card")) {
      targetRoomNumber = parseInt(event.target.id);
    }

    domUpdates.fillModalDetails(domUpdates.getTargetRoomDetails(hotel, targetRoomNumber));
  }

  if (event.target.id === "yes-please") {
    domUpdates.clearFilters();
    domUpdates.show(filterByRoomType);
    domUpdates.show(dashboardView);
    domUpdates.hide(roomSelectView);
  }
  if (event.target.id === "no-thanks") {
    domUpdates.clearFilters();
    domUpdates.renderRoomCards(hotel);
    domUpdates.show(filterByRoomType);
  }
})

bookNowButton.addEventListener("click", () => {
  Promise.all(
    hotel.generateDateRange(
      dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
    ).map(date =>
      addBooking(currentCustomer.id, date, targetRoomNumber)
      .catch(error => domUpdates.showError(error, roomSelectView))
    )
  )
  .then(() => {
    getAll("bookings")
    .then(bookingsArray => hotel.updateBookings(bookingsArray))
    .then(() => {
      currentCustomer.populateBookings(hotel.bookings)
      currentCustomer.calculateTotalSpent(hotel.rooms)

      hotel.populateAvailableRooms(
        hotel.generateDateRange(
          dayjs(startDate.value).format("YYYY/MM/DD"), dayjs(endDate.value).format("YYYY/MM/DD")
        )
      );
      domUpdates.renderRoomCards(hotel);

      domUpdates.renderBookings(currentCustomer, hotel.rooms);
      domUpdates.confirmBooking();
    })
    .catch(error => domUpdates.showError(error, modalContent))
  })
})

modalContent.addEventListener("click", () => {
  if (event.target.id === "return-to-dashboard") {
    domUpdates.show(modalFooter);
    domUpdates.show(dashboardView);
    domUpdates.hide(roomSelectView);
  }
})
