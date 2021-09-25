import Customer from "./Customer";
import Booking from "./Booking";
import Room from "./Room";

class Hotel {
  constructor(customers, bookings, rooms) {
    this.customers = customers; //just customer ids?
    this.bookings = bookings; //just booking ids?
    this.rooms = rooms; //just room #s?
    this.availableRooms = [];
  }

  instantiateAll() {
    this.customers = this.customers.map(customerObj => new Customer(customerObj));
    this.bookings = this.bookings.map(bookingObj => new Booking(bookingObj));
    this.rooms = this.rooms.map(roomObj => new Room(roomObj));
  }

  populateAvailableRooms(date) {
    this.rooms.forEach(roomObj => {
      roomObj.populateUnavailableDates(this.bookings);
      if (!roomObj.unavailableDates.includes(date)) {
        // would I want to just keep track of dates? 🤔
        this.availableRooms.push(roomObj);
      }
    })
  }
}

export default Hotel;
