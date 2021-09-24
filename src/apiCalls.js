// GET all customers
const getAllCustomers = () => {
  return fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .then(parsed => parsed.customers)
  .then(data => console.log(data))
}

// GET single customer
const getOneCustomer = (userID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
  .then(response => response.json())
  // .then(parsed => console.log(parsed));
}

// GET all bookings
const getAllBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(parsed => parsed.bookings)
  .then(data => console.log(data))
}

// GET all rooms
const getAllRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(parsed => parsed.rooms)
  .then(data => console.log(data))
}

export {
  getAllCustomers,
  getOneCustomer,
  getAllBookings,
  getAllRooms
};
