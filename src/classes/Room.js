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
}

export default Room;
