import React from "react";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const[userdetails,setUserdetails]=useState()
  const [partner, SetPartner] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let navigate = useNavigate();
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [is_superuser, setIsSuperuser] = useState(false);
  const [itspartner, setItspartner] = useState("False");
  let [superuser, setsuperuser] = useState("False");

  const handlePartnerLogin = () => {
    console.log("handlepartnerlogin");
    setItspartner("True");

    console.log("handlepartnerlogin", itspartner);
  };

  let loginUser = async (e) => {
    e.preventDefault();
    const email1 = e.target.email.value;
    const password1 = e.target.password.value;
    let url;
    console.log("superuser,,,,,,,,,,,");

    if (superuser === "True") {
      // If superuser is 'True', use this URL
      url = "http://127.0.0.1:8000/api/adminlogin/";
    } else {
      // If not a superuser, check itspartner and choose the URL
      url =
        itspartner === "False"
          ? "http://127.0.0.1:8000/api/token/"
          : "http://127.0.0.1:8000/api/partnerlogin/";
    }

    console.log("submitted", email1, password1);

    const response = await axios.post(url, {
      email: email1,
      password: password1,
    });

    console.log("fronend");
    let data = response.data;
    console.log("data", data);
    console.log("respose", response.status);

    try {
      if (response.status === 400 ) {
        Swal.fire({
          title: "User Blocked",
          text: "Your account has been blocked. Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      if (response.status === 404 ) {
        Swal.fire({
          title: "User Blocked or Not Defined",
          text: "Your account has been blocked. Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      if (response.status === 200) {
       
        setUserdetails(response.data)
        const decodedToken = jwt_decode(data.access);
        console.log(decodedToken, "----------------------->token");
        setIsSuperuser(decodedToken.is_superuser);
        if (decodedToken.is_superuser) {
          // The user is a superuser
          console.log("User is a superuser");
        } else {
          // The user is not a superuser
          console.log("User is not a superuser");
        }
        console.log("======================userdetails",userdetails)
        setAuthToken(data);
        setUser(jwt_decode(data.access));

        console.log(
          "data:.....username......partnername..",
          jwt_decode(data.access)
        );
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("istapartner", itspartner);
        if (itspartner === "True") {
          navigate("/Partnerdashboard");
        } else if (superuser === "True") {
          console.log("heretonavigate");
          navigate("/admindashbord");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          title: "User Blocked",
          text: "Your account has been blocked or Not a member . Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "User Blocked",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
   
  };
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setItspartner("False");
    setsuperuser("False");
    navigate("/");
  };


  let contextData = {
    loginUser: loginUser,
    user: user,
    partner: partner,
    logoutUser: logoutUser,
    handlePartnerLogin: handlePartnerLogin,
    itspartner: itspartner,
    superuser: superuser,
    setsuperuser: setsuperuser,
    setUser:setUser,
    userdetails:userdetails,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
