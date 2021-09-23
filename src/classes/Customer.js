class Customer {
  constructor(customerObj) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.bookings = []; //auto-populate?
  }
}

export default Customer;
