import logo from "./logo.svg";
import "./App.css";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import { Profile } from "./components/account/Profile";
import { Booking } from "./components/booking/Booking";
import { Ride1 } from "./components/ride/Ride1";
import { Home } from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Protect from "./protect";
import Dashboard from "./components/Admin/Dashboard";
import Controls from "./components/Admin/Controls";
import UserTable from "./components/Admin/UserTable";
import DriverDash from "./components/driver/DriverDash";
import ActiceTrip from './components/Admin/ActiveTrip';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Protect>
              <Home />
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
              <Ride1 />
            </Protect>
          }
        />
        <Route
          path="/admin_dashboard"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        />
        <Route
          path="/driver_dashboard"
          element={
            <Protect>
              <DriverDash />
            </Protect>
          }
        />
        <Route
          path="/admin_dashboard/controls"
          element={
            <Protect>
              <Controls />
            </Protect>
          }
        />
        <Route
          path="/all_users"
          element={
            <Protect>
              <UserTable />
            </Protect>
          }
        />
      </Routes>
      <Route path="/admin/active_trip" element={<ActiceTrip />} />
    </div>
  );

}

export default App;
