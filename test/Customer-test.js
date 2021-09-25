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
    customer = new Customer(customers[0]);
  });

  it('should be a function', () => {
    assert.isFunction(Customer);
  });

  it('should be an instance of Customer', () => {
    assert.instanceOf(customer, Customer);
  });

  it('should take in customer data', () => {
    assert.equal(customer.id, customers[0].id);
    assert.equal(customer.name, customers[0].name);
  });

  it('should start without booking information, which is not provided by the API', () => {
    assert.equal(customer.bookings.length, 0);
  });

  it('should keep track of any bookings a customer has made', () => {
    customer.populateBookings(bookings);

    assert.equal(customer.bookings.length, bookings.filter(booking => booking.userID === customer.id).length);
  });

  it('should not keep track of bookings from other customers', () => {
    customer.populateBookings(bookings);

    let didFilterFail = customer.bookings.some(booking => booking.userID !== customer.id);

    assert.equal(didFilterFail, false);
  });

  it.skip('', () => {});

  it.skip('', () => {});

  it.skip('', () => {});

  it.skip('', () => {});

  // assert.property();
  // assert.equal();
  // assert.deepEqual();
  // assert.includeMembers();
});
