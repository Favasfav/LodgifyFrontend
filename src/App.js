
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
import Addproperty from "./components/Addproperty";
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

function PrivateRouteuser({ element }) {
  const { user } = useContext(AuthContext);
  return user.role=="user" ? element : <Navigate to="/login" />;
}
function PrivateRoutepartner({ element }) {
  const { user } = useContext(AuthContext);
  return user.role=="partner" ? element : <Navigate to="/login" />;
}
function PrivateRouteadmin({ element }) {
  const { user } = useContext(AuthContext);
  return user.role==='admin' ? element : <Navigate to="/login" />;
}


function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SignupPartner" element={<SignupPartner />} />
          <Route path="/otppage" element={<Otppage />} />
          <Route path="/Addproperty" element={<Addproperty />} />
          <Route path="/" element={<Home />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/bookingpage" element={<PrivateRouteuser element={<BookingPage />} />} />
          <Route path="/profileviwe" element={<PrivateRouteuser element={<Profileview />} />} />
          <Route path="/Partnerdashboard" element={<PrivateRoutepartner element={<Partnerdashboard />} />} />
          <Route path="/admindashbord" element={<PrivateRouteadmin element={<Admindashboard />} />} />
          <Route path="/userlist" element={<PrivateRouteuser element={<Userlist />} />} />
          <Route path="/ProfileUpdateModel" element={<PrivateRouteuser element={<ProfileUpdateModel />} />} />
          <Route path="/partnerroomsadd" element={<PrivateRoutepartner element={<Partnerroomsadd />} />} />
          <Route path="/pendingproperty" element={<PrivateRouteadmin element={<Verificationrequest />} />} />
          <Route path="/propertylist" element={<PrivateRouteuser element={<Allpropertylist />} />} />
          <Route path="/partnerproperties" element={<PrivateRoutepartner element={<Partnerproperties />} />} />
          <Route path="/Detailedpropertiespartner" element={<PrivateRoutepartner element={<Detailedviewpartner />} />} />
          <Route path="/editproperty" element={<PrivateRoutepartner element={<Editproperty />} />} />
          <Route path="/detailedproperty" element={<PrivateRouteadmin          element={<Detailedproperty />} />} />
          <Route path="/detailedpropertyuser" element={<PrivateRouteuser element={<Detailedpropertyuser />} />} />
          <Route path="/locationproperty" element={<PrivateRouteuser element={<LocationProperty />} />} />
          <Route path="/searchedproperty" element={<PrivateRouteuser element={<Searchedproperty />} />} />
          <Route path="/chatmessage" element={<PrivateRouteuser element={<Chatmessage />} />} />
          <Route path="/bookinglist" element={<PrivateRouteuser element={<Mybookings />} />} />
          <Route path="/bookinglistall" element={<PrivateRouteadmin element={<Bookinglistall />} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
