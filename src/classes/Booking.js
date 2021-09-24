class Booking {
  constructor(bookingObj) {
    this.id = bookingObj.id;
    this.userID = bookingObj.userID;
    this.date = bookingObj.date;
    this.roomNumber = bookingObj.roomNumber;
    this.roomServiceCharges = bookingObj.roomServiceCharges;
    this.totalCost = 0;
  }
  calculateTotalCost(roomsArr) {
    if (typeof this.date === "string") {
      // one night
        this.totalCost = roomsArr.find(room =>
          room.number === this.roomNumber
        ).costPerNight + this.roomServiceCharges;
    } else {
      // multiple nights
      this.totalCost = (roomsArr.find(room =>
        room.number === this.roomNumber
      ).costPerNight) * this.date.length + this.roomServiceCharges;
    }
    return this.totalCost;
  }
}

export default Booking;
