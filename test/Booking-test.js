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
    booking = new Booking(bookings);
  });

  it.skip('should be a function', () => {
    assert.isFunction(Booking);
  });

  it.skip('should be an instance of Booking', () => {
    assert.instanceOf(booking, Booking);
  });

  it.skip('should take in booking data', () => {

  });

  it.skip('', () => {});

  it.skip('', () => {});

  it.skip('', () => {});

  it.skip('', () => {});

  it.skip('', () => {});

  // assert.property();
  // assert.equal();
  // assert.deepEqual();
  // assert.includeMembers();
});
