import logo from "./logo.svg";
import "./App.css";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import { Profile } from "./components/account/Profile";
import { Booking } from "./components/booking/Booking";
import { Info } from "./components/authentication/Info";
import { Otp } from "./components/authentication/Otp";
import { Ride1 } from "./components/ride/Ride1";
import { Ride2 } from "./components/ride/Ride2";
import { Home } from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Protect from "./protect";
import Dashboard from "./components/Admin/Dashboard";
import Controls from "./components/Admin/Controls";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            // <Protect>
              <Home />
            // </Protect>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route
          path="/profile"
          element={
            // <Protect>
              <Profile />
            // </Protect>
          }
        />
        <Route
          path="/bookings"
          element={
            // <Protect>
              <Booking />
            // </Protect>
          }
        />
        <Route path="/info" element={<Info />} />
        <Route path="/verification" element={<Otp />} />
        <Route path="/ridenow" element={<Ride1 />} />
        <Route path="/location" element={<Ride2 />} />
        <Route path="/admin_dashboard" element={<Dashboard />} />
        <Route path="/admin_dashboard/controls" element={<Controls />} />
      </Routes>
      
    </div>
  );
}

export default App;
