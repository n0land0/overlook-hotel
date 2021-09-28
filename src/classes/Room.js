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

  populateUnavailableDates(bookingsArr) {
    // all-time history of bookings, starting with most recent
    this.unavailableDates = bookingsArr.filter(booking =>
      booking.roomNumber === this.number
    ).map(booking => booking.date
    // for now I don't want to actually convert these to Date instances, but the descending-order sort doesn't seem to work otherwise
    ).sort((dateA, dateB) => new Date(dateB) - new Date(dateA));
  }
}

export default Room;
