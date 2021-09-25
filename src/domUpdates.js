// selectors
const viewBookings = document.getElementById("view-bookings");
const totalSpent = document.getElementById("total-spent");
const containerBookingCards = document.getElementById("container-booking-cards");

// methods
const domUpdates = {
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
