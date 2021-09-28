class Customer {
  constructor(customerObj) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.username = `customer${this.id}`;
    this.password = "overlook2021";
    this.bookings = []; //any room bookings I have made
    this.totalSpent = 0;
  }
  //any room bookings I have made
  populateBookings(bookingsArr) {
    this.bookings = bookingsArr.filter(bookingObj =>
      bookingObj.userID === this.id
    ).sort((bookingObjA, bookingObjB) =>
      new Date(bookingObjB.date) - new Date(bookingObjA.date)
    )
  }
  // the total amount I have spent on rooms
  calculateTotalSpent(roomsArr) {
    this.totalSpent = this.bookings.reduce((amountSpent, bookingObj) => {
      amountSpent += bookingObj.calculateTotalCost(roomsArr);
      return amountSpent;
    }, 0)
    return this.totalSpent;
  }
}

export default Customer;
