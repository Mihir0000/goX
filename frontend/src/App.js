import logo from "./logo.svg";
import "./App.css";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import { Profile } from "./components/sharedModule/Profile";
import { Booking } from "./components/booking/Booking";
import { Ride1 } from "./components/ride/Ride1";
import { Home } from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import { AdminProtect, DriverProtect, Protect, UserProtect } from "./protect";
import Dashboard from "./components/Admin/Dashboard";
import Controls from "./components/Admin/Controls";
import UserTable from "./components/Admin/UserTable";
import DriverDash from "./components/driver/DriverDash";
import AllTrips from "./components/Admin/AllTrips";
import TripHistory from "./components/driver/TripHistory";
import ActiveTrips from "./components/Admin/ActiveTrips";
import ActiveTrip from "./components/driver/ActiveTrip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
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
            path="/ridenow"
            element={
              <Protect>
                <UserProtect>
                  <Ride1 />
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
