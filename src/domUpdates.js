// selectors
const viewBookings = document.getElementById("view-bookings");
const containerBookingCards = document.getElementById("container-booking-cards");

// methods
const domUpdates = {
  renderBookings(currentCustomerBookings) {
    currentCustomerBookings.forEach(bookingObj => {
      containerBookingCards.innerHTML += `
        <article class="booking-card">
          <p>${bookingObj.date}</p>
          <p>${bookingObj.id}</p>
          <p>${bookingObj.roomNumber}</p>
          <p>${bookingObj.totalCost}</p>
        </article>
      `
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
  }
};

export default domUpdates;
