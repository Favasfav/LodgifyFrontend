
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Otppage from "./components/Otppage";
import SignupPartner from "./components/SignupPartner";
import Partnerdashboard from "./components/Partnerdashboard";

import Adminlogin from "./components/admin/Adminlogin";
import Admindashboard from "./components/admin/Admindashbord";
import Userlist from "./components/admin/Userlist";
import Profileview from "./components/Profileview";
import ProfileUpdateModel from "./components/ProfileUpdateModel";
import Partnerroomsadd from "./partner/Partnerroomsadd";
import Verificationrequest from "./components/admin/Verificationrequest";
import Detailedproperty from "./components/admin/Detailedproperty";
import Allpropertylist from "./components/admin/Allpropertylist";
import Detailedpropertyuser from "./user/Detailedpropertyuser";
import Partnerproperties from "./partner/Partnerproperties";
import Detailedviewpartner from "./partner/Detailedviewpartner";
import Editproperty from "./partner/Editproperty";
import LocationProperty from "./user/LocationProperty";
import Searchedproperty from "./user/Searchedproperty";
import BookingPage from "./user/BookingPage";
import Chatmessage from "./user/Chatmessage";
import Mybookings from "./user/Mybookings";
import Bookinglistall from "./components/Bookinglistall";
import AuthContext from "./context/AuthContext";
import Chat from "./components/Chats/Chat";
import Chatpartner from "./components/Chats/Chatpartner";
import Chatlist from "./components/Chats/Chatlist";
import Chatlistpartner from "./components/Chats/Chatlistpartner";
import Propertyblock from "./partner/Propertyblock";
import NotFound from "./Pages/NotFound";
import Getpartnerbooking from "./partner/Getpartnerbooking";
import Userprivet from "./Routes/Userprivet";
import Partnerprivet from "./Routes/Partnerprivet";
import Userpublic from "./Routes/Userpublic";
import Loginedprivet from "./Routes/Loginedprivet";
import Adminprivet from "./Routes/Adminprivet";
function PrivateRouteuser({ element }) {
  console.log("hi");

  const { userdetails } = useContext(AuthContext);
  userdetails ? console.log("userdetails", userdetails.role) : <p></p>;
  // console.log(userdetails.role, 'this is user')
  return userdetails && userdetails.role === "user" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}
function PrivateRoutepartner({ element }) {
  const { userdetails } = useContext(AuthContext);
  return userdetails && userdetails.role == "partner" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}
function PrivateRouteadmin({ element }) {
  const { userdetails } = useContext(AuthContext);
  return userdetails && userdetails.role === "admin" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}
// function PrivateRouteuserpartner({ element }) {
//   const { userdetails } = useContext(AuthContext);
//   return userdetails.role!=='admin' ? element : <Navigate to="/login" />;
// }

function App() {
  const { user, userdetails } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="/chat" element={<Userprivet><Chat /></Userprivet>} />
          <Route path="/chatpartner" element={<Partnerprivet><Chatpartner /></Partnerprivet>} /> 
          <Route path="/login" element={<Userpublic><Login /></Userpublic>} />
          <Route path="/signup" element={<Userpublic><Signup /></Userpublic>} />
          <Route path="/SignupPartner" element={<Userpublic><SignupPartner /></Userpublic>} />
          <Route path="/otppage" element={<Userpublic><Otppage /></Userpublic>} />
          <Route path="/" element={<Home />} />
          <Route path="/Adminlogin" element={<Userpublic><Adminlogin /></Userpublic>} />
          <Route path="/bookingpage" element={<Userprivet><BookingPage /></Userprivet>} />
          <Route path="/profileviwe"element={<Loginedprivet ><Profileview /></Loginedprivet>} />
          <Route path="/Partnerdashboard" element= {<Partnerprivet><Partnerdashboard /></Partnerprivet>}/>
          <Route path="/admindashbord" element={<Adminprivet><Admindashboard  /></Adminprivet>}/>
          <Route path="/userlist" element={<Adminprivet><Userlist /></Adminprivet>} />
          <Route path="/ProfileUpdateModel" element={<Loginedprivet><ProfileUpdateModel /></Loginedprivet>} />
          <Route path="/partnerroomsadd" element={<Partnerprivet><Partnerroomsadd /></Partnerprivet>} />
          <Route path="/pendingproperty" element={<Adminprivet><Verificationrequest /></Adminprivet>} />
          <Route path="/propertylist" element={<Adminprivet><Allpropertylist /></Adminprivet>} />
          <Route path="/partnerproperties" element={<Partnerprivet><Partnerproperties /></Partnerprivet>} />
          <Route
            path="/Detailedpropertiespartner"
           element={<Partnerprivet><Detailedviewpartner /></Partnerprivet>}
          />
          <Route path="/editproperty" element={<Partnerprivet><Editproperty /></Partnerprivet>} />
          <Route
            path="/detailedproperty"
            element={<PrivateRouteadmin element={<Detailedproperty />} />}
          />
          <Route
            path="/detailedpropertyuser"
            element={<Detailedpropertyuser />}
          />
          <Route path="/locationproperty" element={<LocationProperty />} />
          <Route
            path="/searchedproperty"
            element={<PrivateRouteuser element={<Searchedproperty />} />}
          />
          <Route path="/chatmessage" element={<Chatmessage />} />
          <Route path="/bookinglist" element={<Userprivet><Mybookings /></Userprivet>} />
          <Route path="/bookinglistall" element={<Adminprivet><Bookinglistall /></Adminprivet>} />
          <Route path="/chatlist" element={<Userprivet><Chatlist /></Userprivet>} />
          <Route path="/getchatlistpartner" element={<Partnerprivet><Chatlistpartner /></Partnerprivet>} />
          <Route path="/getchatpartner" element={<Partnerprivet><Chatpartner /></Partnerprivet>} />
          <Route path="/partnerbooking" element={<Partnerprivet><Getpartnerbooking /></Partnerprivet>} />
          <Route
            path="Detailedpropertiespartner/blockpropertypartner"
            element={<Partnerprivet><Propertyblock /></Partnerprivet>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
