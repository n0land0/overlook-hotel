// GET all (customers, bookings, rooms)
const getAll = (dataCategory) => {
  return fetch(`http://localhost:3001/api/v1/${dataCategory}`)
  // .then(response => response.json())
  .then(response => checkResponse(response))
  .then(parsed => parsed[dataCategory])
  .catch(error => console.warn(error))
  // .then(data => console.log(data))
}

// GET single customer
const getSingleCustomer = (userID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
  .then(response => checkResponse(response))
  .catch(error => console.warn(error))
  // .then(response => response.json())
  // .then(parsed => console.log(parsed));
}

// POST add new booking
const addBooking = (userID, date, roomNumber) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify({
      userID,
      date,
      roomNumber
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => checkResponse(response))
  .catch(error => console.warn(error))
  // .then(response => response.json())
}

// DELETE remove booking
const removeBooking = (bookingID) => {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  // .then(data => console.log(data))
}

// error handling
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status} StatusText: ${response.status.text}`
    );
  }
  return response.json();
}

export {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
};
