class Room {
  constructor(roomObj) {
    this.number = roomObj.number;
    this.roomType = roomObj.roomType;
    this.bidet = roomObj.bidet;
    this.bedSize = roomObj.bedSize;
    this.numBeds = roomObj.numBeds;
    this.costPerNight = roomObj.costPerNight;
    this.bookings = [];
    this.unavailableDates = [];
  }

  populateBookings(bookingsArr) {
    this.unavailableDates = bookingsArr.filter(booking =>
      booking.roomNumber === this.number
    ).sort((bookingA, bookingB) => new Date(bookingB.date) - new Date(bookingA.date));
  }

  // break into 2 methods?
  populateUnavailableDates(bookingsArr) {
    // all-time history of bookings, starting with most recent
    this.unavailableDates = bookingsArr.filter(booking =>
      booking.roomNumber === this.number
    ).map(booking => booking.date).sort((dateA, dateB) => new Date(dateB) - new Date(dateA));
  }
}

export default Room;
