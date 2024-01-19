import React from "react";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../constants";
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
  
    if (superuser === "True") {
      url = `${baseUrl}api/adminlogin/`;
    } else {
      url =
        itspartner === "False"
          ? `${baseUrl}api/token/`
          : `${baseUrl}api/partnerlogin/`;
    }
    
 
  
    try {
      const response = await axios.post(url, {
        email: email1,
        password: password1,
      });
       if (response.status === 200) {
        setUserdetails(response.data);
        const decodedToken = jwt_decode(response.data.access);
        setIsSuperuser(decodedToken.is_superuser);
        console.log("========",response.data)
        if (decodedToken.role==='admin') {
          console.log("User is a superuser");
        } else {
          console.log("User is not a superuser");
        }
  
        setAuthToken(response.data);
        setUser(jwt_decode(response.data.access));
  
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        console.log("decodedToken.role",decodedToken.role)
        if (itspartner === "True") {
          navigate("/Partnerdashboard");
        } else if (decodedToken.role==='admin') {
          console.log("heretonavigateadmin");
          
          navigate("/admindashbord");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Invalid Credentials Or U ser is blocked !',
        text: 'I will close in 2 seconds.',
        timer: 2000
      })
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
