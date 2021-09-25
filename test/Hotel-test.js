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

    // assert.property();
    // assert.equal();
    // assert.deepEqual();
    // assert.includeMembers();
});
