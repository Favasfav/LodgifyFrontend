import React, { useRef, useState,useContext ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking } from "@fortawesome/free-solid-svg-icons";
import MapComponent from "./MapComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Axiosinstance from "../services/Axios";
import { baseUrl } from "../constants";

function Partnerroomsadd() {
  const navigate = useNavigate();
  const {user} =useContext(AuthContext)
  console.log("user--------------------",user)
  let form = useRef(null);
  
  const [partner,setPartner]=useState(null)
  const [location, setLocation] = useState(null);
  const [propertyType, setPropertyType] = useState("Hotel");
  const [propertyname, setPropertyname] = useState("");
  const [categorytype, setCategoryType] = useState("1_star");
  const [totalroom, Settotalroom] = useState(0);
  const [singleroomprice, Setsingleroomprice] = useState(0);
  const [adultprice, Setadultprice] = useState(0);
  const [capacity, Setcapacity] = useState(0);
  const [total_room_price, Settotal_room_price] = useState(0);
  const [description, Setdescription] = useState(0);
  const [streetAddress, setstreetAddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [hasSwimmingPool, setHasSwimmingPool] = useState("False");
  const [hasParkingAvailable, setHasParkingAvailable] = useState("False");
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const[photo,setPhoto]=useState([])

  
  useEffect(() => {
    const fetchuserList = async () => {
      
  
        const response = await Axiosinstance.get(`api/Partnerprofile/${user.user_id}`)
        
        setPartner(response.data);
        
       
        

      
    };
   
    
    fetchuserList();
    
  }, []);



  console.log(partner,"partner----------")
  const amenityOptions = [
    "Power Backup",
    "AC",
    "Fire Extinguisher",
    "WiFi",
    "Daily House Keeping",
    "Attached Bathroom",
    "First Aid Kit",
    "TV",
    "Air Conditioner",
  ];

  const handleSwimmingPoolChange = () => {
    setHasSwimmingPool("True"); 
    console.log("user",user)
  };

  const handleParkingAvailableChange = () => {
    setHasParkingAvailable("True"); 
  };

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto([...photo,file])
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([...images, event.target.result]);
      };
      reader.readAsDataURL(file);

    }
  };

  const handleAmenityChange = (e) => {
    setSelectedAmenity(e.target.value);
    console.log("selectedAmenity",selectedAmenity)
  };

  const handleAddAmenity = (e) => {
    if (selectedAmenity && !selectedAmenities.includes(selectedAmenity)) {
      setSelectedAmenities([...selectedAmenities, selectedAmenity]);
      setSelectedAmenity("");
      console.log("selectedAmenities------------------------",selectedAmenities)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    // You can use the state variables to get the input values
    const formData = new FormData();
    formData.append("partner", partner.id);
    formData.append("property_type", propertyType);
    formData.append("property_name", propertyname);
    formData.append("maplocation", location.placeName);
    formData.append("total_rooms", totalroom);
    formData.append("single_room_price", singleroomprice);
    formData.append("adults_price", adultprice);
    formData.append("capacity", capacity);
    formData.append("total_room_price", total_room_price);
    formData.append("property_address", streetAddress);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip_code", zip);
    formData.append("parking", hasParkingAvailable);
    formData.append("swimming_pool", hasSwimmingPool);
    formData.append("room_description", description);
    formData.append("category", categorytype);
    formData.append("country", country);
  
    selectedAmenities.forEach((amenity) => {
      formData.append("amenities", amenity);
    });
  
    // Append images (assuming 'images' is an array of File objects)
    photo.map((image, index) => {
      formData.append(`photos`, image);
    });
    console.log("user--------------------",partner)
    console.log("formdata-----------------------------------vvvvvvvvvv-------", formData);
    formData.forEach(function(value, key) {
      console.log(key, value);
    });
    console.log("formdata-----------------------------------vvvvvvvvvv-------", formData);
    console.log(
      "LOCATION----------------------",
      location,
      "PROPERTYNAME--------------------",
      propertyname,
      "PROPERTY TYPE",
      propertyType,
      "CATEGORY TYPE",
      categorytype,
      "TOTAL ROOMS",
      totalroom,
      "SINGLE ROOM PRICE",
      singleroomprice,
      "DESCRIPTION",
      description,
      "STREET ADDRESS",
      streetAddress,
      "CITY",
      city,
      "STATE",
      state,
      "COUNTRY",
      country,
      "SWIMMING POOL",
      hasSwimmingPool,
      "PARKING AVAILABLE",
      hasParkingAvailable,
      "IMAGES",
      images,
      "SELECTED AMENITIES",
      selectedAmenities,
      "SELECTED AMENITY",
      selectedAmenity
    );
    console.log("formdata---------------------------------property_names---------",formData.get("photos"));
    
    let response = await fetch(`${baseUrl}partner/Addproperty/`, {
      method: "POST",
      body: formData, // Use the FormData object
      // headers: {
      //   'Content-Type': 'multipart/form-data', // Set the Content-Type header for multipart/form-data
      // },
      
    });
    let data = await response.json();
    console.log("hhhhhh", data);
    if (response.status === 201) {
      console.log("hhhhhh", data);

      Swal.fire({
        title: "Success",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
       
         navigate('/Partnerdashboard');
      });
    } else if (data.username) {
      Swal.fire({
        title: "There is a problem in These Days Or You Are Not Autherised ",
        text: data.username,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      alert("Something went wrong");
    }
  };

  // //   let response = await fetch('http://127.0.0.1:8000/api/signup/', {
  // //     method: 'POST',
  // //     headers: {
  // //       'Content-Type': 'application/json',
  // //     },
  // //     body: JSON.stringify(formData),
  // //   });
  //    let data = await response.json();
  //    console.log("hhhhhh",data)
  //    if (response.status === 200) {
  //     console.log("hhhhhh",data)


  return (
    <div
      className="mt-10 pl-10 "
      style={{
        overflowX: "auto", // Use camelCase for CSS properties
        whiteSpace: "nowrap",
        maxWidth: "100%",
      }}
    >
      <form id="login" onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Upload Your Property Details
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                <div className="rounded relative mt-8 h-48">
                  <img
                    src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
                    alt
                    className="w-full h-full object-cover rounded absolute shadow"
                  />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                  {/*                  
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                    <img
                      src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                      alt
                      className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                    <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <p className="text-xs text-gray-100">Edit Picture</p>
                    </div>
                  </div> */}
                </div>
                <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                  <label
                    htmlFor="property_type"
                    className="pb-2 pt-8 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Property Name 
                  </label>
                  <input
                    id="property_name"
                    name="property_name"
                    
                    onChange={(e) => setPropertyname(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent text-gray-500 dark:text-gray-400"
                  >
                    
                  </input>
                </div>
                <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                  <label
                    htmlFor="property_type"
                    className="pb-2 pt-8 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Property Type
                  </label>
                  <select
                    id="property_type"
                    name="property_type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent text-gray-500 dark:text-gray-400"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                  </select>
                </div>

                <div className="flex flex-row flex-wrap p-5">
                  <div className="w-1/2 pr-2 ">
                    <label
                      htmlFor="totalroom"
                      className="pb-2 p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Total Rooms
                    </label>
                    <input
                      type="number"
                      id="totalroom"
                      name="totalroom"
                      required
                      onChange={(e) => Settotalroom(e.target.value)}
                      className="border border-gray-300 dark:border-gray-700  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Available Rooms"
                    />
                  </div>

                  <div className="w-1/2 pl-2 ">
                    <label
                      htmlFor="singleroomprice"
                      className="pb-2  p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Single Room Price
                    </label>
                    <input
                      type="number"
                      id="singleroomprice"
                      name="singleroomprice"
                      required
                      onChange={(e) => Setsingleroomprice(e.target.value)}
                      className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Single Room Price"
                    />
                  </div>
                </div>

                <div className="flex flex-row flex-wrap p-5">
                  <div className="w-1/2 pr-2">
                    <label
                      htmlFor="totalroom"
                      className="pb-2 p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Adult Price
                    </label>
                    <input
                      type="number"
                      id="adultprice"
                      name="adultprice"
                      onChange={(e) => Setadultprice(e.target.value)}
                      required
                      className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Adult Price"
                    />
                  </div>

                  <div className="w-1/2 pl-2 ">
                    <label
                      htmlFor="singleroomprice"
                      className="pb-2  p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Capacity
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      onChange={(e) => Setcapacity(e.target.value)}
                      required
                      className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="capacity"
                    />
                  </div>
                </div>
                <div className="flex flex-row flex-wrap p-5">
                  <div className="w-1/2 pr-2">
                    <label
                      htmlFor="totalroom"
                      className="pb-2 p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      total_room_price
                    </label>
                    <input
                      type="number"
                      id="total_room_price"
                      name="total_room_price"
                      onChange={(e) => Settotal_room_price(e.target.value)}
                      required
                      className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="total_room_price"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                  <label
                    htmlFor="about"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Description About
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    onChange={(e) => Setdescription(e.target.value)}
                    className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="Let the world know who you are"
                    rows={5}
                    defaultValue={""}
                  />
                  <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">
                    Character Limit: 200
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-60" style={{ position: "relative" }}>
                        <MapComponent location={location} setLocation={setLocation} />
          </div>
          <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded pl-10 px-4">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Adress
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="container mx-auto">
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="StreetAddress"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="StreetAddress"
                    name="streetAddress"
                    required
                    onChange={(e) => {
                      setstreetAddress(e.target.value);
                    }}
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    City
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                    <input
                      type="text"
                      id="City"
                      name="city"
                      required
                      onChange={(e) => setcity(e.target.value)}
                      className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Los Angeles"
                    />
                    <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="State/Province"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="State"
                    name="state"
                    required
                    onChange={(e) => setState(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="California"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="Country"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="Country"
                    name="country"
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="United States"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <div className="flex items-center pb-2">
                    <label
                      htmlFor="ZIP"
                      className="text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      ZIP/Postal Code
                    </label>
                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                      >
                        <path
                          className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="zip"
                    required
                    id="ZIP"
                    onChange={(e) => setZip(e.target.value)}
                    className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder={86745}
                  />
                  {/* <div className="flex justify-between items-center pt-1 text-red-400">
                    <p className="text-xs">Incorrect Zip Code</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x-circle"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <line x1={15} y1={9} x2={9} y2={15} />
                      <line x1={9} y1={9} x2={15} y2={15} />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-6 mr-4">
              <input
                id="hasSwimmingPool"
                name="hasSwimmingPool"
                type="checkbox"
                // checked={hasSwimmingPool}
                onChange={handleSwimmingPoolChange}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                <FontAwesomeIcon
                  icon={faParking}
                  style={{
                    color: "blue",
                    fontSize: "24px",
                    width: "24px",
                    height: "24px",
                  }}
                />
                Swimming Pool
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-6 mr-4">
              <input
                id="hasParkingAvailable"
                name="hasParkingAvailable"
                type="checkbox"
                // checked={hasParkingAvailable}
                onChange={handleParkingAvailableChange}
              />
            </div>

            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                <FontAwesomeIcon
                  icon={faParking}
                  style={{
                    color: "green",
                    fontSize: "24px",
                    width: "24px",
                    height: "24px",
                  }}
                />
                Parking Available
              </label>
            </div>
          </div>
        

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* SVG Path */}
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              {images.map((pics, index) => (
                <img
                  key={index}
                  src={pics}
                  alt={`Image ${index + 1}`}
                  style={{ width: "20%", height: "20%" }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-5">
            <label
              htmlFor="property_type"
              className="pb-2 p-4 text-sm font-bold text-gray-800 dark:text-gray-100"
            >
              Category
            </label>
            <select
              id="category_type"
              name="category_type"
              value={categorytype}
              onChange={(e) => setCategoryType(e.target.value)}
              className="border border-gray-300 dark:border-gray-700  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent text-gray-500 dark:text-gray-400"
            >
              <option value="1_Star">1 star</option>
              <option value="3_Star">3 Star</option>
              <option value="4_Star">4 Star</option>
              <option value="deluxe_premium_luxury">
                deluxe_premium_luxury
              </option>
            </select>
          </div>

          <div>
  <label htmlFor="room-amenities">Room Amenities:</label>
  <select
    id="room-amenities"
    value={selectedAmenity}
    onChange={handleAmenityChange}
  >
    <option value="">Select an amenity</option>
    {amenityOptions.map((amenity, index) => (
      <option key={index} value={amenity}>
        {amenity}
      </option>
    ))}
  </select>
  <div
    onClick={handleAddAmenity}
    style={{
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'blue',
    }}
  >
    Add Amenity
  </div>
</div>

<div>
  <p>Selected Amenities:</p>
  <ul>
    {selectedAmenities.map((amenity, index) => (
      <li key={index}>{amenity}</li>
    ))}
  </ul>
</div>

         

          <div className="container mx-auto w-11/12 xl:w-full">
            <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
              <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">
                Cancel
              </button>
              <button
                className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Partnerroomsadd;
