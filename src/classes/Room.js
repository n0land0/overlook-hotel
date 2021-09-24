class Room {
  constructor(roomObj) {
    this.number = roomObj.number;
    this.roomType = roomObj.roomType;
    this.bidet = roomObj.bidet;
    this.bedSize = roomObj.bedSize;
    this.numBeds = roomObj.numBeds;
    this.costPerNight = roomObj.costPerNight;
    this.bookedDates = [];
  }
  populateBookedDates(bookingsArr) {
    // all-time history of bookings
    this.bookedDates = bookingsArr.filter(booking =>
      booking.roomNumber === this.number
    ).map(booking => booking.date)
  }
}

export default Room;
