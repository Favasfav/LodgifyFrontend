import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Otppage from './components/Otppage';
import SignupPartner from './components/SignupPartner';
import Partnerdashboard from './components/Partnerdashboard';
import Addproperty from './components/Addproperty';
import Adminlogin from './components/admin/Adminlogin';
import Admindashboard from './components/admin/Admindashbord';
import Userlist from './components/admin/Userlist';
import Profileview from './components/Profileview';
import ProfileUpdateModel from './components/ProfileUpdateModel';
import Partnerroomsadd from './partner/Partnerroomsadd';
import './App.css';
import Verificationrequest from './components/admin/Verificationrequest';
import Detailedproperty from './components/admin/Detailedproperty';
import Allpropertylist from './components/admin/Allpropertylist';
import Detailedpropertyuser from './user/Detailedpropertyuser';
import Partnerproperties from './partner/Partnerproperties';
import Detailedviewpartner from './partner/Detailedviewpartner'; 
import Editproperty from './partner/Editproperty';
import LocationProperty from './user/LocationProperty';
import Searchedproperty from './user/Searchedproperty';
import BookingPage from './user/BookingPage';
import Chatmessage from './user/Chatmessage';
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
          <Route path="/Partnerdashboard" element={<Partnerdashboard />} />
          <Route path="/Addproperty" element={<Addproperty />} />
          <Route path="/" element={<Home />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/admindashbord" element={<Admindashboard />} />
          <Route path="/userlist" element={<Userlist />} />
          <Route path="/profileviwe" element={<Profileview />} />
          <Route path="/ProfileUpdateModel" element={<ProfileUpdateModel />} />
          <Route path="/partnerroomsadd"  element={<Partnerroomsadd />} />
          <Route path="/pendingproperty"  element={<Verificationrequest />} />
          <Route path="/detailedproperty"  element={<Detailedproperty />} />
          <Route path="/propertylist"  element={<Allpropertylist />} />
          <Route path="/detailedpropertyuser"  element={<Detailedpropertyuser />} />
          <Route path="/partnerproperties"  element={<Partnerproperties />} />
          <Route path="/Detailedpropertiespartner"  element={<Detailedviewpartner />} />
          <Route path="/editproperty"  element={<Editproperty />} />
          <Route path="/locationproperty" element={<LocationProperty/>}/>
          <Route path="/searchedproperty" element={<Searchedproperty/>}/>
          <Route path="/bookingpage" element={<BookingPage/>}/>
          <Route path="/chatmessage" element={<Chatmessage/>}/>
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
