import dayjs from "dayjs";

// selectors
const greeting = document.getElementById("greeting");
const viewBookings = document.getElementById("view-bookings");
const totalSpent = document.getElementById("total-spent");
const containerBookingCards = document.getElementById("container-booking-cards");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");

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
          <p>${bookingObj.totalCost}</p>
        </article>
      `
    })
    totalSpent.innerText = `$${currentCustomer.totalSpent}`;
  },

  renderMinimumDates() {
    startDate.value = dayjs().format("YYYY-MM-DD");
    startDate.min = dayjs().format("YYYY-MM-DD");
    endDate.value = dayjs().format("YYYY-MM-DD");
    endDate.min = dayjs().format("YYYY-MM-DD");
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

  greeting, viewBookings, totalSpent, containerBookingCards, startDate, endDate
};

export default domUpdates;
