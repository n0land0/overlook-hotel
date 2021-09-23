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
    hotel = new Hotel();
  });

  it('should be a function', () => {
    assert.isFunction(Hotel);
  });

  it('should be an instance of Hotel', () => {
    assert.instanceOf(hotel, Hotel);
  });

  it('should take in ? data', () => {

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
