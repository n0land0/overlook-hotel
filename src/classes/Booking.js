class Booking {
  constructor(bookingObj) {
    this.id = bookingObj.id;
    this.userID = bookingObj.userID;
    this.date = bookingObj.date;
    this.roomNumber = bookingObj.roomNumber;
    this.roomServiceCharges = bookingObj.roomServiceCharges || [];
    this.roomType = "";
    this.totalCost = 0;
  }
  calculateTotalCost(roomsArr) {
    if (typeof this.date === "string") {
      // one night
        // = is less risky than += (if run multiple times)
        this.totalCost = roomsArr.find(room =>
          room.number === this.roomNumber
        ).costPerNight;
    } else {
      // multiple nights
        // = is less risky than += (if run multiple times)
      this.totalCost = (roomsArr.find(room =>
        room.number === this.roomNumber
      ).costPerNight) * this.date.length;
    }
    this.roomServiceCharges.forEach(charge => {
      this.totalCost += charge;
    });
    return this.totalCost;
  }
  getRoomType(roomsArr) {
    this.roomType = roomsArr.find(room =>
      room.number === this.roomNumber
    ).roomType;
  }
}

export default Booking;
