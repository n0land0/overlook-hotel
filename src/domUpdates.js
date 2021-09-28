import dayjs from "dayjs";

// SELECTORS
// login
const loginForm = document.getElementById("login-form");
const usernameField = document.getElementById("username-field");
const invalidUsername = document.getElementById("invalid-username");
const passwordField = document.getElementById("password-field");
const invalidPassword = document.getElementById("invalid-password");

// dashboard
const dashboardView = document.getElementById("dashboard-view");
  // user-specific greeting
const greeting = document.getElementById("greeting");
  // date search form
const dateRangeSelect = document.getElementById("date-range-select");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const showRooms = document.getElementById("show-rooms");

// user bookings
const viewBookings = document.getElementById("view-bookings");
const totalSpent = document.getElementById("total-spent");
const containerBookingCards = document.getElementById("container-booking-cards");

// search results
const roomSelectView = document.getElementById("room-select-view");
  // filters
const filterByRoomType = document.getElementById("filter-by-room-type");
const roomTypeFilters = document.querySelectorAll("input[type=button]");
const clearAllButton = document.getElementById("clear-all");
  // display area
const containerRoomCards = document.getElementById("container-room-cards");

// selected room rodal
const modalTitle = document.querySelector(".modal__title");
const modalContent = document.querySelector(".modal__content");
const bookNowButton = document.querySelector(".modal__btn");

// METHODS
const domUpdates = {
  renderUser(currentCustomer) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`;
  },

  renderBookings(currentCustomer, roomsArr) {
    currentCustomer.bookings.forEach(bookingObj => {
      bookingObj.getRoomType(roomsArr);
      containerBookingCards.innerHTML += `
        <article class="booking-card">
          <p>${bookingObj.date}</p>
          <p>${bookingObj.id}</p>
          <p>${bookingObj.roomType}</p>
          <p>${bookingObj.roomNumber}</p>
          <p>${bookingObj.totalCost.toFixed(2)}</p>
        </article>
      `
    })
    totalSpent.innerText = `$${currentCustomer.totalSpent.toFixed(2)}`;
  },

  renderMinimumDates() {
    startDate.value = dayjs().subtract(1, "year").subtract(8, "month").format("YYYY-MM-DD");
    startDate.min = dayjs().subtract(1, "year").subtract(8, "month").format("YYYY-MM-DD");
    endDate.value = dayjs().subtract(1, "year").subtract(8, "month").add(1, "day").format("YYYY-MM-DD");
    endDate.min = dayjs().subtract(1, "year").subtract(8, "month").add(1, "day").format("YYYY-MM-DD");
  },

  renderRoomCards(hotel, roomTypes = Object.keys(hotel.availableRooms)) {
    this.hide(dashboardView);
    this.show(roomSelectView);
    containerRoomCards.innerHTML = "";
    roomTypes.forEach(key => {
      if (hotel.availableRooms[key].length) {
        hotel.availableRooms[key].forEach(roomObj => {
          containerRoomCards.innerHTML += `
            <article id="${roomObj.number}" class="room-card" data-micromodal-trigger="modal-1">
              <img src="../images/${roomObj.roomType}.png" alt="" data-micromodal-trigger="modal-1">
              <p>${roomObj.number}</p>
              <p>${roomObj.costPerNight}</p>
              <p>${roomObj.roomType}</p>
              <p>${roomObj.numBeds} x ${roomObj.bedSize}</p>
              <p>${roomObj.bidet}</p>
            </article>
          `
        })
      }
    })
    if (!containerRoomCards.innerHTML.length) {
      containerRoomCards.innerHTML = `
        <p>we're sorry, but we don't have any available rooms matching your current search.</p>
        <p>would you like to start another search?</p>
        <button>yes please!</button>
        <button>no thanks.</button>
      `;
    }
  },

  renderFilteredResults(hotel) {
    // let filterCriteria = Array.from(roomTypeFilters).filter(roomTypeButton =>
    let filterCriteria = [...roomTypeFilters].filter(roomTypeButton =>
      roomTypeButton.checked
    ).map(roomTypeButton =>
      roomTypeButton.value
    );

    filterCriteria.length
      ? (this.renderRoomCards(hotel, filterCriteria), clearAllButton.classList.remove("inactive"))
      : (this.renderRoomCards(hotel), clearAllButton.classList.add("inactive"))
  },

  clearFilters() {
    roomTypeFilters.forEach(roomTypeButton => {
      roomTypeButton.checked = false;
      roomTypeButton.classList.remove("button-selected");
      console.log(roomTypeButton.classList)
      console.log(roomTypeButton.checked)
    });

    clearAllButton.classList.add("inactive");
  },

  toggleCheckedStatus(element) {
    element.checked
      ? element.checked = false
      : element.checked = true;
  },

  showError(error, container) {
    console.warn(error);
    container.innerHTML = `<span class="server-error-message">WHOA SERVER DOWN BRAH</span>`;
  },

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  toggle(element, className) {
    element.classList.toggle(className);
  },

  resetClassList(element) {
    element.classList = '';
  },

  greeting, viewBookings, totalSpent, containerBookingCards, dateRangeSelect, startDate, endDate, showRooms, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters, clearAllButton, modalTitle, modalContent, bookNowButton, loginForm, usernameField, passwordField, invalidUsername, invalidPassword
};

export default domUpdates;
