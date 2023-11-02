
import React, {useEffect ,useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ProfileUpdateModal from './ProfileUpdateModel';
import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';
function Profileview() {
  const {user,setUser}=useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [user1,setuser1]=useState('');
  const navigate=useNavigate()
  useEffect(() => {
    const fetchuserList = async () => {
      
      console.log("user111111111111111",user)
        const response = await axios.get(`http://127.0.0.1:8000/api/userprofile/${user.user_id}`)
        console.log("user",user)
        console.log("response.data",response.data)
        setuser1(response.data);
        setLoading(false);
        

      
    };
    console.log("useraaaaaaaaaaaaa",user)
    fetchuserList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  // const {user}=useContext(AuthContext)
  
  const splitfile = () => {
    if (user1&&user1.email ) {
        console.log("jjjjjj",user1)
      const usermail = user1.email;
      const finalmail = usermail.split('-');
      console.log("objfinalmail", finalmail);
      return finalmail[1];
    }
    return "";
  };
  
  const splitfiles = () => {
    console.log("jjjjjj",user1)
    if (user1 ) {
      const userno = user1.phone_no;
      console.log("userno",userno)
      const final = userno.split('-');
      console.log("phoneno----------",final[1])
      return final;
    }
    return "";
  };
  
  
  return (
    <div>
    <div className="flex justify-center items-center h-screen">
  <div className="relative flex flex-col text-gray-700 bg-grey shadow-md w-80 rounded-xl bg-clip-border"></div>

  <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
  {user1.profile_photo ? (
  <div className="h-full w-full flex items-center justify-center">
    <img
      src={user1.profile_photo}
      className="max-h-full max-w-full"
      alt="Profile"
    />
  </div>
) : (
  <img
    src=""
    alt="img-blur-shadow"
    className="w-full h-full"
  />
)}
</div>




  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {user1.username}
    </h5>
    {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      My Role is {user.role}
    </p> */}
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      My Email : {splitfile()}  
    </p>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      My Contact No : {user1.phone_no}
    </p>
  </div>
  <div className="p-6 pt-0">
    <button 
        onClick={()=>{navigate('/ProfileUpdateModel')}}
      className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-light="true"
    >
      Edit Profile
    </button>
    
  </div>
  
</div>

    </div>
    
  )
}

export default Profileview
