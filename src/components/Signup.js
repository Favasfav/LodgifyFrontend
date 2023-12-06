import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { baseUrl } from "../constants";


function Signup() {
  const navigate = useNavigate();
  const [itsuser, setUser] = useState("True");
  const [formname, setFormname] = useState("");
  const [formpassword1, setFormpassword1] = useState("");
  const [formpassword2, setFormpassword2] = useState("");
  const [formphno, setFormphno] = useState("");
  const [formemail, Setformemail] = useState("");
 

  function validatePhoneNumber(phoneNumber) {
    console.log("haiii");
    const phoneRegex = /^\d{10}$/;

    return phoneRegex.test(phoneNumber);
  }

  function passwordvalidator(pass) {
    console.log("hjhjhhh");

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = pass.length;
    const uppercasePassword = uppercaseRegExp.test(pass);
    const lowercasePassword = lowercaseRegExp.test(pass);
    const digitsPassword = digitsRegExp.test(pass);
    const specialCharPassword = specialCharRegExp.test(pass);
    const minLengthPassword = minLengthRegExp.test(pass);
    let errMsg = "";
    if (passwordLength === 0) {
      Swal.fire({
        title: "Auto close alert!",
        text: "Password is empty.",
        timer: 2000,
      });
    } else if (!uppercasePassword) {
      Swal.fire({
        title: "Auto close alert!",
        text: "At least one Uppercase",
        timer: 2000,
      });
    } else if (!lowercasePassword) {
      Swal.fire({
        title: "Auto close alert!",
        text: "At least one Lowercase.",
        timer: 2000,
      });
    } else if (!digitsPassword) {
      Swal.fire({
        title: "Auto close alert!",
        text: "At least one digit.",
        timer: 2000,
      });
    } else if (!specialCharPassword) {
      Swal.fire({
        title: "Auto close alert!",
        text: "At least one Special Characters",
        timer: 2000,
      });
    } else if (!minLengthPassword) {
      Swal.fire({
        title: "Auto close alert!",
        text: "At least minumum 8 characters",
        timer: 2000,
      });
    } else {
      return true;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormname(value);
    } else if (name === "password1") {
      // Phone number is valid

      setFormpassword1(value);
      console.log("Valid pass number:", formpassword1);
    } else if (name === "password2") {
      setFormpassword2(value);
    } else if (name === "email") {
      Setformemail(value);
    } else if (name === "number") {
      if (validatePhoneNumber(value)) {
        // Phone number is valid
        setFormphno(value);
        console.log("Valid phone number:", formphno);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formpassword1) {
      if (passwordvalidator(formpassword1)) {
      } else {
        return;
      }
    }
    if (formname.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter username!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (formemail.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter email!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (formphno.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter phone no!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (formpassword1.trim() === "" || formpassword2.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Enter a strong password!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (isNaN(formphno) || formphno.toString().trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter a Mobile no!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      let formData = {
        username: formname,
        email: formemail,
        password: formpassword1,
        phone_no: formphno,
      };

      try {
        let response = await fetch(`${baseUrl}api/signup/otp/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        });

        let data = await response.json();
        console.log("hhhhhh", data);
        if (response.status === 200) {
          console.log("hhhhhh", data);
        }

        let formData1 = {
          username: formname,
          email: formemail,
          password: formpassword1,
          phone_no: formphno,
          otp: data.otp,
          itsuser: itsuser,
        };
        navigate("/otppage", { state: { formData1 } });
      } catch (error) {
        console.log("jj", error);
        // Handle error as needed
      }
    }
  };

  //  let formData = {
  //   username: formname,
  //   email:formemail,
  //   password: formpassword1,
  //   phone_no: formphno,
  // };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        
          <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="https://lodgifyproject.s3.amazonaws.com/logo.png"
              alt="Your Company"
            />

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
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
