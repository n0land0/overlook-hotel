class Customer {
  constructor(customerObj) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.bookings = []; //any room bookings I have made
  }
  //any room bookings I have made
  populateBookings(bookingsArr) {
    this.bookings = bookingsArr.filter(bookingObj => bookingObj.userID === this.id)
  }
  // the total amount I have spent on rooms
  totalSpent() {
    return this.bookings.reduce((amountSpent, bookingObj) => {
      
      return amountSpent;
    }, 0)
  }
}

export default Customer;
