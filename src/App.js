// import React, { useContext } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import Otppage from "./components/Otppage";
// import SignupPartner from "./components/SignupPartner";
// import Partnerdashboard from "./components/Partnerdashboard";
// import Addproperty from "./components/Addproperty";
// import Adminlogin from "./components/admin/Adminlogin";
// import Admindashboard from "./components/admin/Admindashbord";
// import Userlist from "./components/admin/Userlist";
// import Profileview from "./components/Profileview";
// import ProfileUpdateModel from "./components/ProfileUpdateModel";
// import Partnerroomsadd from "./partner/Partnerroomsadd";
// import "./App.css";
// import Verificationrequest from "./components/admin/Verificationrequest";
// import Detailedproperty from "./components/admin/Detailedproperty";
// import Allpropertylist from "./components/admin/Allpropertylist";
// import Detailedpropertyuser from "./user/Detailedpropertyuser";
// import Partnerproperties from "./partner/Partnerproperties";
// import Detailedviewpartner from "./partner/Detailedviewpartner";
// import Editproperty from "./partner/Editproperty";
// import LocationProperty from "./user/LocationProperty";
// import Searchedproperty from "./user/Searchedproperty";
// import BookingPage from "./user/BookingPage";
// import Chatmessage from "./user/Chatmessage";
// import Mybookings from "./user/Mybookings";
// import Bookinglistall from "./components/Bookinglistall";
// import AuthContext from "./context/AuthContext";

// function PrivateRouteuser({ children }) {
//   let { user } = useContext(AuthContext);
//   if (user ) {
//     return children
//   }

//   return <Navigate to="/login" />
// }

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <div className="content-container">
//         <Routes>

//         <Route
//           path="/profileviwe"
//           element={
//             <PrivateRouteuser>
//               <Profileview />
//             </PrivateRouteuser>
//           }
//         />
//         <Route
//           path="/Partnerdashboard"
//           element={
//             <PrivateRouteuser>
//               <Partnerdashboard />
//             </PrivateRouteuser>
//           }
//         />
//         <Route
//           path="/admindashbord"
//           element={
//             <PrivateRouteuser>
//               <Admindashboard />
//             </PrivateRouteuser>
//           }
//         />
//         <Route
//           path="/ProfileUpdateModel"
//           element={
//             <PrivateRouteuser>
//               <ProfileUpdateModel />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/partnerroomsadd"
//           element={
//             <PrivateRouteuser>
//               <Partnerroomsadd />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/pendingproperty"
//           element={
//             <PrivateRouteuser>
//               <Verificationrequest />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/propertylist"
//           element={
//             <PrivateRouteuser>
//               <Allpropertylist />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/partnerproperties"
//           element={
//             <PrivateRouteuser>
//               <Partnerproperties />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/Detailedpropertiespartner"
//           element={
//             <PrivateRouteuser>
//               <Detailedviewpartner />
//             </PrivateRouteuser>
//           }
//         />
//          <Route
//           path="/editproperty"
//           element={
//             <PrivateRouteuser>
//               <Editproperty />
//             </PrivateRouteuser>
//           }
//         />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/SignupPartner" element={<SignupPartner />} />
//           <Route path="/otppage" element={<Otppage />} />
//           <Route path="/Partnerdashboard" element={<Partnerdashboard />} />
//           <Route path="/Addproperty" element={<Addproperty />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/Adminlogin" element={<Adminlogin />} />
//           {/* <Route path="/admindashbord" element={<Admindashboard />} /> */}
//           <Route path="/userlist" element={<Userlist />} />
//           {/* <Route path="/profileviwe" element={<Profileview />} /> */}
//           {/* <Route path="/ProfileUpdateModel" element={<ProfileUpdateModel />} /> */}
//           {/* <Route path="/partnerroomsadd" element={<Partnerroomsadd />} /> */}
//           {/* <Route path="/pendingproperty" element={<Verificationrequest />} /> */}
//           <Route path="/detailedproperty" element={<Detailedproperty />} />
//           {/* <Route path="/propertylist" element={<Allpropertylist />} /> */}
//           <Route
//             path="/detailedpropertyuser"
//             element={<Detailedpropertyuser />}
//           />
//           {/* <Route path="/partnerproperties" element={<Partnerproperties />} /> */}
//           {/* <Route
//             path="/Detailedpropertiespartner"
//             element={<Detailedviewpartner />}
//           /> */}
//           {/* <Route path="/editproperty" element={<Editproperty />} /> */}
//           <Route path="/locationproperty" element={<LocationProperty />} />
//           <Route path="/searchedproperty" element={<Searchedproperty />} />
//           <Route path="/bookingpage" element={<BookingPage/>}/>
//           <Route path="/chatmessage" element={<Chatmessage />} />
//           <Route path="/bookinglist" element={<Mybookings />} />
//           <Route path="/bookinglistall" element={<Bookinglistall />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// // export default App;
// // import React, { useContext } from "react";
// // import { Route, Routes, Navigate } from "react-router-dom";
// // import Header from "./components/Header";
// // import Footer from "./components/Footer";
// // import Login from "./components/Login";
// // import Signup from "./components/Signup";
// // import Home from "./components/Home";
// // import Otppage from "./components/Otppage";
// // import SignupPartner from "./components/SignupPartner";
// // import Partnerdashboard from "./components/Partnerdashboard";
// // import Addproperty from "./components/Addproperty";
// // import Adminlogin from "./components/admin/Adminlogin";
// // import Admindashboard from "./components/admin/Admindashbord";
// // import Userlist from "./components/admin/Userlist";
// // import Profileview from "./components/Profileview";
// // import ProfileUpdateModel from "./components/ProfileUpdateModel";
// // import Partnerroomsadd from "./partner/Partnerroomsadd";
// // import Verificationrequest from "./components/admin/Verificationrequest";
// // import Detailedproperty from "./components/admin/Detailedproperty";
// // import Allpropertylist from "./components/admin/Allpropertylist";
// // import Detailedpropertyuser from "./user/Detailedpropertyuser";
// // import Partnerproperties from "./partner/Partnerproperties";
// // import Detailedviewpartner from "./partner/Detailedviewpartner";
// // import Editproperty from "./partner/Editproperty";
// // import LocationProperty from "./user/LocationProperty";
// // import Searchedproperty from "./user/Searchedproperty";
// // import BookingPage from "./user/BookingPage";
// // import Chatmessage from "./user/Chatmessage";
// // import Mybookings from "./user/Mybookings";
// // import Bookinglistall from "./components/Bookinglistall";
// // import AuthContext from "./context/AuthContext";

// // function PrivateRouteuser({ element }) {
// //   const { user } = useContext(AuthContext);
// //   return user.role=="user" ? element : <Navigate to="/login" />;
// // }
// // function PrivateRoutepartner({ element }) {
// //   const { user } = useContext(AuthContext);
// //   return user.role=="partner" ? element : <Navigate to="/login" />;
// // }
// // function PrivateRouteadmin({ element }) {
// //   const { user } = useContext(AuthContext);
// //   return user ? element : <Navigate to="/login" />;
// // }

// // function App() {
// //   return (
// //     <div className="App">
// //       <Header />
// //       <div className="content-container">
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/SignupPartner" element={<SignupPartner />} />
// //           <Route path="/otppage" element={<Otppage />} />
// //           <Route path="/Addproperty" element={<Addproperty />} />
// //           <Route path="/" element={<Home />} />
// //           <Route path="/Adminlogin" element={<Adminlogin />} />
// //           <Route path="/bookingpage" element={<PrivateRouteuser element={<BookingPage />} />} />
// //           <Route path="/profileviwe" element={<PrivateRouteuser element={<Profileview />} />} />
// //           <Route path="/Partnerdashboard" element={<PrivateRoutepartner element={<Partnerdashboard />} />} />
// //           <Route path="/admindashbord" element={<PrivateRouteuser element={<Admindashboard />} />} />
// //           <Route path="/userlist" element={<PrivateRouteuser element={<Userlist />} />} />
// //           <Route path="/ProfileUpdateModel" element={<PrivateRouteuser element={<ProfileUpdateModel />} />} />
// //           <Route path="/partnerroomsadd" element={<PrivateRoutepartner element={<Partnerroomsadd />} />} />
// //           <Route path="/pendingproperty" element={<PrivateRouteuser element={<Verificationrequest />} />} />
// //           <Route path="/propertylist" element={<PrivateRouteuser element={<Allpropertylist />} />} />
// //           <Route path="/partnerproperties" element={<PrivateRoutepartner element={<Partnerproperties />} />} />
// //           <Route path="/Detailedpropertiespartner" element={<PrivateRoutepartner element={<Detailedviewpartner />} />} />
// //           <Route path="/editproperty" element={<PrivateRoutepartner element={<Editproperty />} />} />
// //           <Route path="/detailedproperty" element={<PrivateRouteuser          element={<Detailedproperty />} />} />
// //           <Route path="/detailedpropertyuser" element={<PrivateRouteuser element={<Detailedpropertyuser />} />} />
// //           <Route path="/locationproperty" element={<PrivateRouteuser element={<LocationProperty />} />} />
// //           <Route path="/searchedproperty" element={<PrivateRouteuser element={<Searchedproperty />} />} />
// //           <Route path="/chatmessage" element={<PrivateRouteuser element={<Chatmessage />} />} />
// //           <Route path="/bookinglist" element={<PrivateRouteuser element={<Mybookings />} />} />
// //           <Route path="/bookinglistall" element={<PrivateRouteuser element={<Bookinglistall />} />} />
// //         </Routes>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default App;
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
import Chat from "./components/Chats/Chat";
import Chatpartner from "./components/Chats/Chatpartner";
import Chatlist from "./components/Chats/Chatlist";
import Chatlistpartner from "./components/Chats/Chatlistpartner";
import Propertyblock from "./partner/Propertyblock";
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
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatpartner" element={<Chatpartner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SignupPartner" element={<SignupPartner />} />
          <Route path="/otppage" element={<Otppage />} />
          <Route path="/Addproperty" element={<Addproperty />} />
          <Route path="/" element={<Home />} />

          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/bookingpage" element={<BookingPage />} />
          <Route path="/profileviwe" element={<Profileview />} />

          <Route path="/Partnerdashboard" element={<Partnerdashboard />} />
          <Route
            path="/admindashbord"
            element={<Admindashboard />} 
          />
          <Route
            path="/userlist"
            element={<Userlist />} 
          />
          <Route path="/ProfileUpdateModel" element={<ProfileUpdateModel />} />
          <Route
            path="/partnerroomsadd"
             element={<Partnerroomsadd  />}
          />
          <Route
            path="/pendingproperty"
            element={<Verificationrequest  />}
          />
          <Route
            path="/propertylist"
            element={<Allpropertylist  />}
          />
          <Route
            path="/partnerproperties"
             element={<Partnerproperties />}
          />
          <Route
            path="/Detailedpropertiespartner"
            element={<Detailedviewpartner />}
          />
          <Route path="/editproperty" element={<Editproperty />} />
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
          <Route path="/bookinglist" element={<Mybookings />} />
          <Route path="/bookinglistall" element={<Bookinglistall />} />
          <Route path="/chatlist" element={<Chatlist />} />
          <Route path="/getchatlistpartner" element={<Chatlistpartner />} />
          <Route path="/getchatpartner" element={<Chatpartner />} />
          <Route path='Detailedpropertiespartner/blockpropertypartner' element={<Propertyblock/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
