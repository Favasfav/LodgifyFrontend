import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Signup from './Signup';
function Otppage() {
  
  const [otp,setOtp]=useState('')
  //find who partner or user
  
  const navigate=useNavigate()
  const location = useLocation();
  const formData1 = location.state && location.state.formData1;
  
  
  const otpverification = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    
      try {
        if (otp === formData1.otp) {
        
        const response = await fetch(formData1.itsuser==='True'?'http://127.0.0.1:8000/api/signup/':'http://127.0.0.1:8000/api/Partnersignup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData1),
        });
  
        if (response.status === 201) {
          console.log("data",response)
          Swal.fire({
          
            title: 'Success',
            text: 'Account created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
             navigate('/')
          });
         }
        }
        else(
          Swal.fire({
            title: 'Otp incorrect!',
            text: 'I will close in 2 seconds.',
            timer: 2000
          })
        
         
          
        )
        
   
      } catch (error) {
        Swal.fire({
          title: 'Incorrect Error!',
          text: 'I will close in 2 seconds.',
          timer: 2000 
        })
        
      
    }
  };
  
  return (
    <div>
       {/* Left half with content */}
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e)=>{otpverification(e)}}  className="space-y-6" action="#" method="POST">
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  OTP Recieved From Email
                </label>
                
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=>{
                  setOtp(e.target.value)
                }}
                  id="OTP"
                  name="otp"
                  type="number"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

          
        </div>
      </div>

    </div>
    
  )
}

export default Otppage
