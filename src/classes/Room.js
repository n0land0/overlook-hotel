// import '../assets/1Carly-on-bellcart.png';
// import '../assets/Dog-KD0C4465a.png';
// import '../assets/Maud-4-1.png';
// import '../assets/Pearl_Rooms-Pictures_©James-Bedford-6.png';
// import '../assets/Roxy-2.png';

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
    // this.img = "";
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

  // populateImage() {
  //   switch(this.roomType) {
  //     case "single room":
  //       this.img = "../assets/1Carly-on-bellcart.png";
  //       break;
  //     case "junior suite":
  //       this.img = "../assets/Pearl_Rooms-Pictures_©James-Bedford-6.png";
  //       break;
  //     case "suite":
  //       this.img = "../assets/Maud-4-1.png"
  //       break;
  //     case "residential suite":
  //       this.img = "../assets/Roxy-2.png"
  //       break;
  //     }
  // }
}

export default Room;
