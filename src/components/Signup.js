
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Otppage from './Otppage';

function Signup() {
  const navigate = useNavigate();
  const [itsuser,setUser]=useState("True")
  const [formname, setFormname] = useState('');
  const [formpassword1, setFormpassword1] = useState('');
  const [formpassword2, setFormpassword2] = useState('');
  const [formphno, setFormphno] = useState('');
  const [formemail,Setformemail]=useState('')
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFormname(value);
    } else if (name === 'password1') {
      setFormpassword1(value);
    } else if (name === 'password2') {
      setFormpassword2(value);
    }
    else if (name === 'email') {
        Setformemail(value);
      }
      else if (name === 'number') {
        setFormphno(value);
      }  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formname.trim() === '') {
      return Swal.fire({
        title: 'Error',
        text: 'Enter username!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    if (formemail.trim() === '') {
        return Swal.fire({
          title: 'Error',
          text: 'Enter email!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      if (formphno.trim() === '') {
        return Swal.fire({
          title: 'Error',
          text: 'Enter phone no!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }

    if (formpassword1.trim() === '' || formpassword2.trim() === '') {
      return Swal.fire({
        title: 'Error',
        text: 'Enter a strong password!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

    // if (isNaN(formphno) || formphno.toString().trim() === '') {
    //   return Swal.fire({
    //     title: 'Error',
    //     text: 'Enter a Mobile no!',
    //     icon: 'error',
    //     confirmButtonText: 'OK',
    //   });
    // }

    if (formpassword1 !== formpassword2) {
      return Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

    let formData = {
      username: formname,
      email:formemail,
      password: formpassword1,
      phone_no: formphno,
    };
   
    

    let response = await fetch('http://127.0.0.1:8000/api/signup/otp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:formData.email}),
    });
    

  //   let response = await fetch('http://127.0.0.1:8000/api/signup/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });
     let data = await response.json();
     console.log("hhhhhh",data)
     if (response.status === 200) {
      console.log("hhhhhh",data)
     }
  //     Swal.fire({
  //       title: 'Success',
  //       text: 'Account created successfully!',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     }).then(() => {
  //       navigate('/login');
  //     });
  //   } else if (data.username) {
  //     Swal.fire({
  //       title: 'Error',
  //       text: data.username,
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   } else {
  //     alert('Something went wrong');
  //   }
  let formData1 = {
    username: formname,
    email:formemail,
    password: formpassword1,
    phone_no: formphno,
    otp:data.otp,
    itsuser:itsuser
  };
  navigate('/otppage',{ state: { formData1 } })
   
   };
  //  let formData = {
  //   username: formname,
  //   email:formemail,
  //   password: formpassword1,
  //   phone_no: formphno,
  // };


  
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="number"
                  name="number"
                  type="tel"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password1"
                  name="password1"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password2"
                  name="password2"
                  type="password"
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </div>
  );
}

export default Signup;
