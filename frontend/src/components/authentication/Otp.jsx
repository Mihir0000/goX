import { Container } from "@mui/system";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./form.css";

export const Otp = () => {
  const [otp, setOtp] = useState();
  const [error, setError] = useState({});
  console.log("error", error);

  const validation = () => {
    let error = {};
    if (!otp) {
      error.otp = "Please Enter OTP";
    }

    return error;
  };
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      {
        swal("Registration Successfull !", "Now add some information about you", "success");
        navigate("/info");
      }
    }
  };
  return (
    <div className="flex_otp">
      <div className="logo_otp">
        <div className="otp_body">
          <Container>
            <form className="otp_form">
              <p>Enter Verification Code</p>
              <div className="otp_input">
                <OtpInput
                  placeholder="none"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                />
                <p className="error">{error.otp}</p>
              </div>

              <Button className="otpBtn" onClick={submitHandler}>
                Submit OTP
              </Button>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};
