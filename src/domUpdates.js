import dayjs from "dayjs";

// selectors
const greeting = document.getElementById("greeting");
const viewBookings = document.getElementById("view-bookings");
const totalSpent = document.getElementById("total-spent");
const containerBookingCards = document.getElementById("container-booking-cards");
const dateRangeSelect = document.getElementById("date-range-select");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const showRooms = document.getElementById("show-rooms");

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

  greeting, viewBookings, totalSpent, containerBookingCards, dateRangeSelect, startDate, endDate, showRooms
};

export default domUpdates;
