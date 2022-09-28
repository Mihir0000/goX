import { Container } from "@mui/system";
import React from "react";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import "./home.css";

export const Home = () => {
  return (
    <div id="home_body">
      <div className="home_body2">
        <Container style={{ height: "80vh" }}>
          <Header />
          <div id="body_heading">
            <img src="/assets/G.png" alt="logo" style={{height:"80px", width:"200px", marginBottom:"10px"}}/>
            <h6 className="text-white">Hello {localStorage.getItem("name")}</h6>
          </div>

          <div id="booking_section">
            <a href="/ridenow" className="card">
              <div className="d-flex">
                <div className="lottie">
                  Book a Ride <br /> <span>NOW</span>
                </div>
                <lottie-player
                  src="https://assets8.lottiefiles.com/packages/lf20_8NYY2Y.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "70px",
                    height: "70px",
                    marginLeft: "10px",
                  }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </a>
            <a className="card" href="/#">
              <div className="d-flex">
                <div className="lottie">
                  Plan a <span>FUTURE</span>
                  <br />
                  Trip
                </div>
                <lottie-player
                  src="https://assets3.lottiefiles.com/packages/lf20_yyqxnhaq.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "60px", height: "60px" }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </a>
            <a className="card" href="/#">
              <div className="d-flex">
                <div className="lottie">
                  <span>OUTSTATION</span>
                  <br />
                  Journey Book
                </div>
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_svy4ivvy.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                  }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </a>
          </div>
        </Container>
        <Bnav />
      </div>
    </div>
  );
};
