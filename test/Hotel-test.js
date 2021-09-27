import {assert} from 'chai';

import {
  customers,
  bookings,
  rooms
} from './test-data.js'

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(customers, bookings, rooms);
  });

  it('should be a function', () => {
    assert.isFunction(Hotel);
  });

  it('should be an instance of Hotel', () => {
    assert.instanceOf(hotel, Hotel);
  });

  it('should take in customer data', () => {
    assert.property(hotel.customers[0], "id");
    assert.property(hotel.customers[0], "name");
    assert.deepEqual(hotel.customers[0], customers[0]);
  });

  it('should take in booking data', () => {
    assert.property(hotel.bookings[0], "id");
    assert.property(hotel.bookings[0], "userID");
    assert.property(hotel.bookings[0], "date");
    assert.property(hotel.bookings[0], "roomNumber");
    assert.property(hotel.bookings[0], "roomServiceCharges");
    assert.deepEqual(hotel.bookings[0], bookings[0]);
  });

  it('should take in room data', () => {
    assert.property(hotel.rooms[0], "number");
    assert.property(hotel.rooms[0], "roomType");
    assert.property(hotel.rooms[0], "bidet");
    assert.property(hotel.rooms[0], "bedSize");
    assert.property(hotel.rooms[0], "numBeds");
    assert.property(hotel.rooms[0], "costPerNight");
    assert.deepEqual(hotel.rooms[0], rooms[0]);
  });

  it('should convert customer data to Customer class', () => {
    hotel.instantiateAll();

    assert.instanceOf(hotel.customers[0], Customer);
  });

  it('should convert booking data to Booking class', () => {
    hotel.instantiateAll();

    assert.instanceOf(hotel.bookings[0], Booking);
  });

  it('should convert room data to Room class', () => {
    hotel.instantiateAll();

    assert.instanceOf(hotel.rooms[0], Room);
  });

  it('should be able to list available rooms for a certain date', () => {
    hotel.instantiateAll();
    hotel.populateAvailableRooms(["2020/02/16"]);


    assert.equal(hotel.rooms[6].roomType, "single room");
    assert.includeDeepMembers(hotel.availableRooms["single room"], [hotel.rooms[2], hotel.rooms[3], hotel.rooms[4]]);
    assert.notIncludeDeepMembers(hotel.availableRooms["single room"], [hotel.rooms[6]]);
  });

  it('should be able to list available rooms for multiple dates', () => {
    hotel.instantiateAll();
    hotel.populateAvailableRooms(["2020/02/16", "2020/02/14"]);

    assert.equal(hotel.rooms[7].roomType, "residential suite");
    assert.includeDeepMembers(hotel.availableRooms["residential suite"], [hotel.rooms[0]]);
    assert.notIncludeDeepMembers(hotel.availableRooms["residential suite"], [hotel.rooms[7]]);
  });

  it('should be able to be able to retrieve an updated list of bookings after a new booking is made', () => {
    assert.notIncludeDeepMembers(hotel.bookings, [{
        "id": "1632770578001",
        "userID": 50,
        "date": "2020/01/27",
        "roomNumber": 10,
        "roomServiceCharges": []
    }])

    bookings.push({
        "id": "1632770578001",
        "userID": 50,
        "date": "2020/01/27",
        "roomNumber": 10,
        "roomServiceCharges": []
    });

    hotel.updateBookings(bookings);

    assert.includeDeepMembers(hotel.bookings, [{
        "id": "1632770578001",
        "userID": 50,
        "date": "2020/01/27",
        "roomNumber": 10,
        "roomType": "",
        "totalCost": 0,
        "roomServiceCharges": []
    }])
  });

  it('should be able to create a range of dates to be booked, based on trip start and end date', () => {
    let datesBooked = hotel.generateDateRange("2020/01/27", "2020/01/30");

    assert.deepEqual(datesBooked, ["2020/01/27", "2020/01/28", "2020/01/29"])
  });
    // assert.property();
    // assert.equal();
    // assert.deepEqual();
    // assert.includeMembers();
});
