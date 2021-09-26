import Customer from "./Customer";
import Booking from "./Booking";
import Room from "./Room";

import dayjs from "dayjs";

class Hotel {
  constructor(customers, bookings, rooms) {
    this.customers = customers; //just customer ids?
    this.bookings = bookings; //just booking ids?
    this.rooms = rooms; //just room #s?
    // this.availableRooms = [];
    this.availableRooms = {};
  }

  instantiateAll() {
    this.customers = this.customers.map(customerObj => new Customer(customerObj));
    this.bookings = this.bookings.map(bookingObj => new Booking(bookingObj));
    this.rooms = this.rooms.map(roomObj => new Room(roomObj));
  }

  populateAvailableRooms(dates) {
    this.rooms.forEach(roomObj => {
      roomObj.populateUnavailableDates(this.bookings);
      if (!this.availableRooms[roomObj.roomType]) {
        this.availableRooms[roomObj.roomType] = [];
      }
      if (!this.availableRooms[roomObj.roomType].some(availRoom => availRoom.number === roomObj.number)) {
        this.availableRooms[roomObj.roomType].push(roomObj);
      }
      dates.forEach(date => {
        if (roomObj.unavailableDates.includes(date)) {
          this.availableRooms[roomObj.roomType].splice(this.availableRooms[roomObj.roomType].indexOf(roomObj), 1)
        }
      })
    });
    Object.keys(this.availableRooms).forEach(roomType => {
      this.availableRooms[roomType].sort((roomA, roomB) => roomA.number - roomB.number);
    })
  }

  generateDateRange(date1, date2) {
    let datesToFill = dayjs(date2).diff(date1, "day");
    let datesBooked = Array(datesToFill).fill().map((_, index) => dayjs(date1).add(index, 'day').format("YYYY/MM/DD"));
    return datesBooked;
    // datesToFill.
    // dayjs(date1).add(1, 'day')

  }

}

export default Hotel;
