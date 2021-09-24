// import './images/turing-logo.png'
import './css/base.scss';
import {
  getAll,
  getSingleCustomer,
  addBooking,
  removeBooking
} from './apiCalls'

getAll("customers")
getAll("bookings")
getAll("rooms")

getSingleCustomer(11)

addBooking(1, "2020/01/01", 1)

removeBooking(1632451293145)
