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

describe('Booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(bookings[2]);
  });

  it('should be a function', () => {
    assert.isFunction(Booking);
  });

  it('should be an instance of Booking', () => {
    assert.instanceOf(booking, Booking);
  });

  it('should take in booking data', () => {
    assert.equal(booking.id, bookings[2].id);
    assert.equal(booking.userID, bookings[2].userID);
    assert.equal(booking.date, bookings[2].date);
    assert.equal(booking.roomNumber, bookings[2].roomNumber);
    assert.equal(booking.roomServiceCharges, bookings[2].roomServiceCharges);
  });

  it('should start without cost information, which is not provided by the API', () => {
    assert.equal(booking.totalCost, 0);
  });

  it('should be able to calculate its own cost', () => {
    booking.calculateTotalCost(rooms);

    assert.equal(booking.totalCost, rooms[6].costPerNight);
  });

  it('should be able to update its own cost', () => {
    booking.calculateTotalCost(rooms);
    booking.roomServiceCharges.push(5);
    booking.calculateTotalCost(rooms);

    assert.equal(booking.totalCost, rooms[6].costPerNight + 5);
  });

  it('should start without room type information, which is not provided by the API', () => {
    assert.equal(booking.roomType, "");
  });

  it('should be able to retrieve the room type of the booked room', () => {
    booking.getRoomType(rooms);

    assert.equal(booking.roomType, rooms[6].roomType);
  });

  it.skip('', () => {});

  it.skip('', () => {});

  // assert.property();
  // assert.equal();
  // assert.deepEqual();
  // assert.includeMembers();
});
