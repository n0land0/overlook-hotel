class Booking {
  constructor(bookingObj) {
    this.id = bookingObj.id;
    this.userID = bookingObj.userID;
    this.date = bookingObj.date;
    this.roomNumber = bookingObj.roomNumber;
    this.roomServiceCharges = bookingObj.roomServiceCharges;
    this.totalCost = 0;
  }
}

export default Booking;
