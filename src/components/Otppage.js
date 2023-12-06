import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Signup from './Signup';
import { baseUrl } from '../constants';
import Axiosinstance from '../services/Axios';

function Otppage() {
  
  const [otp,setOtp]=useState('')
  //find who partner or user
  
  const navigate=useNavigate()
  const location = useLocation();
  const formData1 = location.state && location.state.formData1;
  
  
  const otpverification = async (e) => {
    e.preventDefault();
  
    if (otp === formData1.otp) {
      console.log("yesotp");
      console.log(formData1);
  
      try {
        const response = formData1.itsuser === 'True'
          ? await Axiosinstance.post('api/signup/', formData1)
          : await Axiosinstance.post('/api/Partnersignup/', formData1);
  
        console.log("data", response.data);
  
        if (response.status === 201) {
          console.log("data", response);
          Swal.fire({
            title: 'Success',
            text: 'Account created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
           navigate('/login');

          });
        } else {
         
          console.error('Unexpected status code:', response.status);
          Swal.fire({
            title: 'Unexpected Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error during API call:', error);
  
       
        if (error.response) {
          
          console.error('Server responded with:', error.response.data);
          Swal.fire({
            title: 'Server Error!',
            text: 'Something went wrong on the server side. Please try again later.',
            icon: 'error',
          });
        } else if (error.request) {
          
          console.error('No response received:', error.request);
          Swal.fire({
            title: 'Network Error!',
            text: 'Please check your internet connection and try again.',
            icon: 'error',
          });
        } else {
         
          console.error('Request setup error:', error.message);
          Swal.fire({
            title: 'Unexpected Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
          });
        }
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid OTP. Please enter the correct OTP.',
        icon: 'error',
        timer: 2000,
      });
      navigate('/Signup');
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
