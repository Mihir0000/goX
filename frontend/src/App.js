import './App.css';
import Login from './components/authentication/Login';
import Registration from './components/authentication/Registration';
import { Profile } from './components/sharedModule/Profile';
import { Booking } from './components/booking/Booking';
import { Ride } from './components/ride/Ride';
import { Home } from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import { AdminProtect, DriverProtect, Protect, UserProtect } from './protect';
import Dashboard from './components/Admin/Dashboard';
import Controls from './components/Admin/Controls';
import UserTable from './components/Admin/UserTable';
import DriverDash from './components/driver/DriverDash';
import AllTrips from './components/Admin/AllTrips';
import TripHistory from './components/driver/TripHistory';
import ActiveTrips from './components/Admin/ActiveTrips';
import ActiveTrip from './components/driver/ActiveTrip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingStatus from './components/booking/BookingStatus';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:5000/sendStripeApiKey')
      .then((data) => {
        setStripeApiKey(data.data.stripeApiKey);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(stripeApiKey);
  return (
    <>
      <div className="App">
        <Routes>
          {stripeApiKey && (
            <Route
              path="/ridenow"
              element={
                <Protect>
                  <UserProtect>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Ride />
                    </Elements>
                  </UserProtect>
                </Protect>
              }
            />
          )}
          <Route
            exact
            path="/"
            element={
              <Protect>
                <UserProtect>
                  <Home />
                </UserProtect>
              </Protect>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/profile"
            element={
              <Protect>
                <Profile />
              </Protect>
            }
          />
          <Route
            path="/bookings"
            element={
              <Protect>
                <Booking />
              </Protect>
            }
          />
          <Route
            path="/booking_status"
            element={
              <Protect>
                <UserProtect>
                  <BookingStatus />
                </UserProtect>
              </Protect>
            }
          />
          <Route
            path="/admin_dashboard"
            element={
              <Protect>
                <AdminProtect>
                  <Dashboard />
                </AdminProtect>
              </Protect>
            }
          />
          <Route
            path="/driver_dashboard"
            element={
              <Protect>
                <DriverProtect>
                  <DriverDash />
                </DriverProtect>
              </Protect>
            }
          />
          <Route
            path="/admin_dashboard/controls"
            element={
              <Protect>
                <AdminProtect>
                  <Controls />
                </AdminProtect>
              </Protect>
            }
          />
          <Route
            path="/all_users"
            element={
              <Protect>
                <AdminProtect>
                  <UserTable />
                </AdminProtect>
              </Protect>
            }
          />

          <Route
            path="/admin/active_trip"
            element={
              <AdminProtect>
                <ActiveTrips />
              </AdminProtect>
            }
          />
          <Route
            path="/admin/allTrips"
            element={
              <AdminProtect>
                <AllTrips />
              </AdminProtect>
            }
          />
          <Route
            path="/trip_history"
            element={
              <DriverProtect>
                <TripHistory />
              </DriverProtect>
            }
          />
          <Route
            path="/activeTrip"
            element={
              <DriverProtect>
                <ActiveTrip />
              </DriverProtect>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
