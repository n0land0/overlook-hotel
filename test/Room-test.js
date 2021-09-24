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

describe('Room', () => {
  let room;
  beforeEach(() => {
    room = new Room(rooms[6]);
    // room.populateBookedDates(bookings);
  });

  it('should be a function', () => {
    assert.isFunction(Room);
  });

  it('should be an instance of Room', () => {
    assert.instanceOf(room, Room);
  });

  it('should take in room data', () => {
    assert.property(room, 'bidet');
  });

  it('should start without booked dates, which are not provided by the API', () => {
    assert.equal(room.unavailableDates.length, 0);
  });

  it('should be able to keep track of the dates for which it\'s booked', () => {
    room.populateUnavailableDates(bookings);

    assert.equal(room.unavailableDates.length, 1)
  });

  it('should not contain bookings from other rooms', () => {
    room.populateBookings(bookings);

    let didFilterFail = room.unavailableDates.some(booking => booking.roomNumber !== room.number);

    assert.equal(didFilterFail, false);
  });

  it.skip('', () => {});

  it.skip('', () => {});

    // assert.property();
    // assert.equal();
    // assert.deepEqual();
    // assert.includeMembers();
});
