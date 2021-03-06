// DEPENDENCIES
import dayjs from "dayjs";
import MicroModal from 'micromodal';

// SELECTORS
// login
const loginView = document.getElementById("login-view");
const loginForm = document.getElementById("login-form");
const usernameField = document.getElementById("username-field");
const invalidUsername = document.getElementById("invalid-username");
const passwordField = document.getElementById("password-field");
const invalidPassword = document.getElementById("invalid-password");

// dashboard
const dashboardView = document.getElementById("dashboard-view");
  // user-specific greeting
const greetingContainer = document.getElementById("greeting-container");
const greeting = document.getElementById("greeting");
const navDashboardButton = document.getElementById("nav-dashboard-button");
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
const modalFooter = document.querySelector(".modal__footer");
const returnToDashboardButton = document.getElementById("return-to-dashboard");

// METHODS
const domUpdates = {
  renderUser(currentCustomer) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`;
  },

  renderBookings(currentCustomer, roomsArr) {
    containerBookingCards.innerHTML = "";
    currentCustomer.bookings.forEach(bookingObj => {
      bookingObj.getRoomType(roomsArr);
      containerBookingCards.innerHTML += `
        <article class="booking-card" tabindex="0">
          <p>${bookingObj.date}</p>
          <p>id #${bookingObj.id}</p>
          <p>${bookingObj.roomType}</p>
          <p>room #${bookingObj.roomNumber}</p>
          <p>$${bookingObj.totalCost.toFixed(2)}</p>
        </article>
      `
    })
    totalSpent.innerText = `${currentCustomer.totalSpent.toLocaleString('en-US', {style: 'currency', currency:'USD'})}`;
  },

  renderMinimumDates() {
    startDate.min = dayjs().subtract(1, "year").subtract(8, "month").format("YYYY-MM-DD");
    startDate.value = startDate.min;

    endDate.min = dayjs(startDate.value).add(1, "day").format("YYYY-MM-DD");
    endDate.value = endDate.min;
  },

  renderMinimumEndDate() {
    event.preventDefault();
    endDate.min = dayjs(startDate.value).add(1, "day").format("YYYY-MM-DD");
    if (dayjs(startDate.value) >= dayjs(endDate.value)) {
      endDate.value = endDate.min;
    }
  },

  renderRoomCards(hotel, roomTypes = Object.keys(hotel.availableRooms)) {
    this.hide(dashboardView);
    this.show(roomSelectView);
    containerRoomCards.innerHTML = "";
    roomTypes.forEach(key => {
      if (hotel.availableRooms[key].length) {
        hotel.availableRooms[key].forEach(roomObj => {
          containerRoomCards.innerHTML += `
            <article id="${roomObj.number}" class="room-card" data-micromodal-trigger="modal-1" tabindex="0">
              <p>room #${roomObj.number}</p>
              <img src="../images/${roomObj.roomType}.png" alt="" data-micromodal-trigger="modal-1">
              <p>${roomObj.roomType} - from ${roomObj.costPerNight.toLocaleString('en-US', {style: 'currency', currency:'USD'})}/night</p>
            </article>
          `
        })
      }
    })
    if (!containerRoomCards.innerHTML.length) {
      this.hide(filterByRoomType);
      containerRoomCards.innerHTML = `
        <article class="no-results-msg">
          <p>we're sorry, but we don't have any available rooms matching your current search.</p>
          <p>would you like to start another search?</p>
          <div class="no-results-options">
            <button id="yes-please">yes please!</button>
            <button id="no-thanks">no thanks.</button>
          </div>
        </article>
      `;
    }
  },

  renderFilteredResults(hotel) {
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
    });

    clearAllButton.classList.add("inactive");
  },

  getTargetRoomDetails(hotel, targetRoomNumber) {
      let targetRoom = hotel.rooms.find(roomObj => roomObj.number === targetRoomNumber)
      let bidetStatus = targetRoom.bidet ? "bidet included" : "bidet not included";
      let bedPlural = (targetRoom.numBeds > 1) ? "beds" : "bed"

      return [targetRoom, bidetStatus, bedPlural];
  },

  fillModalDetails([targetRoom, bidetStatus, bedPlural]) {
    modalTitle.innerText = `room #${targetRoom.number} - ${targetRoom.roomType} - from ${targetRoom.costPerNight.toLocaleString('en-US', {style: 'currency', currency:'USD'})}/night`
    modalContent.innerHTML = `
      <img src="../images/${targetRoom.roomType}.png" alt="">
      <p>${targetRoom.numBeds} ${targetRoom.bedSize} ${bedPlural}</p>
      <p>${bidetStatus}</p>
    `;
    this.show(modalFooter);
    MicroModal.show("modal-1");
  },

  confirmBooking() {
    domUpdates.hide(modalFooter);
    modalTitle.innerText = "Thanks, your booking is confirmed!";
    modalContent.innerHTML = `<button id="return-to-dashboard" class="return-to-dashboard" data-micromodal-close tabindex="1">take me back to my dashboard</button>`;
  },

  toggleCheckedStatus(element) {
    element.checked
      ? element.checked = false
      : element.checked = true;
  },

  showError(error, container) {
    console.warn(error);
    container.innerHTML = `<span class="server-error-message">aw heck, our server is not being a good boi right now. aw jeez. we're really sorry. plz try reloading the page.</span>`;
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

  greetingContainer, greeting, viewBookings, totalSpent, containerBookingCards, dateRangeSelect, startDate, endDate, showRooms, dashboardView, roomSelectView, containerRoomCards, filterByRoomType, roomTypeFilters, clearAllButton, modalTitle, modalContent, bookNowButton, modalFooter, returnToDashboardButton, loginForm, usernameField, passwordField, invalidUsername, invalidPassword, loginView, navDashboardButton
};

export default domUpdates;
