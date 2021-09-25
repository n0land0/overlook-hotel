import Customer from "./Customer";
import Booking from "./Booking";
import Room from "./Room";

class Hotel {
  constructor(customers, bookings, rooms) {
    this.customers = customers; //just customer ids?
    this.bookings = bookings; //just booking ids?
    this.rooms = rooms; //just room #s?
  }

  instantiateAll() {
    this.customers = this.customers.map(customerObj => new Customer(customerObj));
    this.bookings = this.bookings.map(bookingObj => new Booking(bookingObj));
    this.rooms = this.rooms.map(roomObj => new Room(roomObj));
  }
}

export default Hotel;
