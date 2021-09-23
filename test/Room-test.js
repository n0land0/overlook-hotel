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
    room = new Room(rooms);
  });

  it.skip('should be a function', () => {
    assert.isFunction(Room);
  });

  it.skip('should be an instance of Room', () => {
    assert.instanceOf(room, Room);
  });

  it.skip('should take in room data', () => {

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
