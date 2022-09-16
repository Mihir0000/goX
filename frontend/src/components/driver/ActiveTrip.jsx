import React from "react";
import { Header } from "../header/Header";
import Sidebar from "../sharedModule/Sidebar";
import "./driver.css"

const ActiveTrip = () => {
  
  return (
    <div className="active_trip_body">
      <Sidebar />
      <Header />
      <div className="trip_card">
        <div className="card trip_card1">
          <div className="card-body trip_card_body">This is some text within a card body.</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTrip;
