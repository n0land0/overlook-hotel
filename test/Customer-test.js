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

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(customers);
  });

  it('should be a function', () => {
    assert.isFunction(Customer);
  });

  it('should be an instance of Customer', () => {
    assert.instanceOf(customer, Customer);
  });

  it('should take in customer data', () => {

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
