import dayjs from "dayjs";

// import '../assets/1Carly-on-bellcart.png';
// import '../assets/Dog-KD0C4465a.png';
// import '../assets/Maud-4-1.png';
// import '../assets/Pearl_Rooms-Pictures_©James-Bedford-6.png';
// import '../assets/Roxy-2.png';

// selectors
const greeting = document.getElementById("greeting");
const dashboardView = document.getElementById("dashboard-view");
const viewBookings = document.getElementById("view-bookings");
const totalSpent = document.getElementById("total-spent");
const containerBookingCards = document.getElementById("container-booking-cards");
const dateRangeSelect = document.getElementById("date-range-select");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const showRooms = document.getElementById("show-rooms");
const roomSelectView = document.getElementById("room-select-view");
const containerRoomCards = document.getElementById("container-room-cards");

// methods
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

  renderRoomCards(hotel) {
    this.hide(dashboardView);
    this.show(roomSelectView);
    Object.values(hotel.availableRooms).forEach(array => {
      if (array.length) {
        array.forEach(roomObj => {
          // roomObj.populateImage();
          containerRoomCards.innerHTML += `
            <article class="room-card">
              <img src="../images/${roomObj.roomType}.png" id="room-preview-${roomObj.number}" alt="">
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
  },

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  toggle(element) {
    element.classList.toggle('hidden');
  },

  resetClassList(element) {
    element.classList = '';
  },

  greeting, viewBookings, totalSpent, containerBookingCards, dateRangeSelect, startDate, endDate, showRooms, dashboardView, roomSelectView, containerRoomCards
};

export default domUpdates;
