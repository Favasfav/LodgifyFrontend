import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axiosinstance from "../services/Axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useRazorpay from "react-razorpay";
import { DatePicker, Space, InputNumber } from "antd";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Carousel,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import MapComponent from "../partner/MapComponent";
const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
};

const columnStyle = {
  flex: 1,
  padding: "20px",
  textAlign: "center",
};

const oddColumnStyle = {
  ...columnStyle,
  backgroundColor: "#cfd8dc",
  color: "black",
};

const evenColumnStyle = {
  ...columnStyle,
  backgroundColor: "#ffff",
  color: "black",
};

const mediaQueryStyle = {
  "@media (max-width: 768px)": {
    flex: "100%",
  },
};

export default function BookingPage() {
  console.log("Location state:");
  const location = useLocation();
  console.log("Location state:-------------", location.state);
  const propertyId = location.state.propertyId;
  const roomqty1 = location.state.roomqty;
  const checkindate1 = location.state.checkindate;
  const checkoutdate1 = location.state.checkoutdate;
  const [property, Setproperty] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [checkindate, setCheckindate] = useState(checkindate1);
  const [checkoutdate, setCheckoutdate] = useState(checkoutdate1);
  const [roomqty, setroomqty] = useState(roomqty1);

  const [Razorpay] = useRazorpay();
  console.log("property-----------", property);
  
  const onChange = (value: number) => {
    console.log("changed", value);
    setroomqty(value);
  };

  const { RangePicker } = DatePicker;
  const onChangerange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setCheckindate(dateString[0]);
    setCheckoutdate(dateString[1]);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  console.log("checkoutdate,checkindate", checkoutdate, checkindate);
  useEffect(() => {
    
    const fetchUserList = async () => {
      try {
        
        Axiosinstance.get(`partner/propertyview/${propertyId}/`)
          .then((response) => {
            if (response.data) {
              console.log("Data:=====================", response.data);
              Setproperty(response.data);
            } else {
              console.error("Error in response:", response);
            }
          })
          .catch((error) => {
            console.error("API request failed with error:", error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
      }
    };

    fetchUserList();
  }, []);
  const checkforRooms = async (propertyId) => {
    const myparams = {
      propertyId: propertyId,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      roomqty: roomqty,
    };
    Axiosinstance.post(
      `booking/checkroomavailblity/${propertyId}/${checkindate}/${checkoutdate}/${roomqty}`
    )
      .then((response) => {
        console.log("Data:", response.data);
        Swal.fire({
          title: "Success",
          text: " Rooms Available Now",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire({
          title: "Error",
          text: "No Rooms Available Now",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

 

  const compleate_payment = (payment_id, order_id, signature) => {
    Axiosinstance.post(
      `apirazorpay/order/compleate/${propertyId}/${checkindate}/${checkoutdate}/${roomqty}/${user.user_id}`,
      {
        amount: amt,
        currency: "INR",
        payment_id: payment_id,
        order_id: order_id,
        signature: signature,
      }
    )
      // .then(

      //   Swal.fire({
      //     title: 'Booked Sucessfully',
      // text: 'I will close in 5 seconds.',
      // timer: 5000
      //   })

      // )
      .then((response) => {
        console.log("Data:", response.data);
        Swal.fire({
          title: "Success",
          text: " Rooms Booked Sucessfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      })
      .catch((response) => {
        Swal.fire({
          title: "Error While Booking !",
          text: "I will close in 2 seconds.",
          timer: 2000,
        });
      });
  };

  const no_of_days=()=>{
    const checkindates=checkindate.split('-')
    const checkoutdates=checkoutdate.split('-')
    const days=checkoutdates[2]-checkindates[2]
return days+1
    
  }
  const amt = (roomqty * property.single_room_price * 100*no_of_days());
  console.log("amt", amt);
  const razorpayPayment = () => {
    Axiosinstance.post(
      `apirazorpay/order/create/${propertyId}/${checkindate}/${checkoutdate}/${roomqty}/${user.user_id}`,
      {
        amount: amt,
        currency: "INR",
      }
    )
      .then(function (response) {
        console.log("response",response);
        const order_id = response.data.data.id;

        const options = {
          key: "rzp_test_GlidMFhzhQAugp", // Enter the Key ID generated from the Dashboard
          amount: amt, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            compleate_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Muhammed favas",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch(function (response) {
        console.log("error");
      });
  };
  
  return (
    <div className="p-10  ">
      {property.is_verified ? (
        <div style={containerStyle}>
          <div style={oddColumnStyle}>
            <div class="w-full max-w-[26rem] shadow-lg">
              <div class="bg-gradient-to-tr from-transparent via-transparent to-black/60 relative rounded-xl overflow-hidden">
                <Carousel class="w-96">
                  {property &&
                  property.photos &&
                  Array.isArray(property.photos) ? (
                    property.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.photo}
                        alt={`image ${index + 1}`}
                        class="h-full w-full object-cover"
                      />
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </Carousel>

                <IconButton
                  size="sm"
                  color="red"
                  variant="text"
                  class="absolute top-4 right-4 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </IconButton>
              </div>

              <CardBody>
                <div class="mb-3 flex items-center justify between">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    class="font-medium"
                  >
                    {property.property_name}
                  </Typography>
                </div>
                <Typography color="gray">
                  {property.room_description}
                </Typography>
                <Card class="p-4">
                  <List>
                    <ListItem>
                      Property Type
                      <ListItemSuffix>
                        <Chip
                          value={property.property_type}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      Single Room Price
                      <ListItemSuffix>
                        <Chip
                          value={property.single_room_price}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      Total Rooms
                      <ListItemSuffix>
                        <Chip
                          value={property.total_rooms}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      Adult Price
                      <ListItemSuffix>
                        <Chip
                          value={property.adults_price}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      Capacity
                      <ListItemSuffix>
                        <Chip
                          value={property.capacity}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      Total Room Price
                      <ListItemSuffix>
                        <Chip
                          value={property.total_room_price}
                          variant="ghost"
                          size="sm"
                          class="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                  </List>
                </Card>

                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                  <span
                    data-tooltip-target="money"
                    className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      />
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                    </svg>
                  </span>

                  <span
                    data-tooltip-target="wifi"
                    className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div
                    data-tooltip="wifi"
                    className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                  >
                    Free wifi
                  </div>
                  <span
                    data-tooltip-target="bedrooms"
                    className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </span>
                  {/* <div
                  data-tooltip="bedrooms"
                  className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                >
                  2 bedrooms
                </div> */}
                  <span
                    data-tooltip-target="tv"
                    className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M19.5 6h-15v9h15V6z" />
                      <path
                        fillRule="evenodd"
                        d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div
                    data-tooltip="tv"
                    className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                  >
                    64" HDTV
                  </div>
                  <span
                    data-tooltip-target="fire"
                    className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </CardBody>

              <CardFooter class="pt-3">
                {user ? (
                  <button
                    className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white active:scale-95"
                    onClick={() => {
                      navigate("/chatmessage");
                    }}
                  >
                    Chat with Hotel Exicutive
                  </button>
                ) : (
                  <p></p>
                )}
                {user ? (
                  <p></p>
                ) : (
                  // <Space direction="horizontal" style={{ padding: 15 }}>
                  //   <p>from</p>
                  //   <DatePicker onChange={onChange} />
                  //   <p>to</p>
                  //   <DatePicker onChange={onChange1} />
                  //   <Button
                  //     color="purple"
                  //     onClick={() => {if (checkindate && checkoutdate) {  checkforRooms(property.id)}else( Swal.fire({
                  //       title: "Error",
                  //       text: "Please Check The Date",
                  //       icon: "error",
                  //       confirmButtonText: "OK",
                  //     }))}}
                  //     size="lg"
                  //     fullWidth={true}
                  //   >
                  //     Book
                  //   </Button>
                  // </Space>
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    color="green"
                  >
                    Clich Here To Login
                  </Button>
                )}
              </CardFooter>
            </div>
          </div>
          <div style={evenColumnStyle}>
            <div class="w-full max-w-[26rem] shadow-lg">
              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Room Address Information
                  </h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>Street:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.property_address}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>Map Location:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.maplocation}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>City:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.city}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>State:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {" "}
                        {property.state}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>ZIP Code:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.zip_code}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>Parking:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.parking ? (
                          <IconButton variant="outlined" color="green">
                            <i className="fas fa-tik" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                          </IconButton>
                        ) : (
                          <IconButton variant="outlined" color="green">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                              />
                            </svg>
                          </IconButton>
                        )}
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <strong>Swimming pool:</strong>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {property.swimming_pool ? (
                          <IconButton variant="outlined" color="green">
                            <i className="fas fa-tik" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                          </IconButton>
                        ) : (
                          <IconButton variant="outlined" color="green">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                              />
                            </svg>
                          </IconButton>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  {property &&
                  property.amenities &&
                  Array.isArray(property.amenities) ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {property.amenities.map((amenity, index) => (
                        <button
                          key={index}
                          className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white active:scale-95 text-center"
                        >
                          {amenity.amenities}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>No amenities available.</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <form>
                <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
                  <div className="">
                    <p className="font-serif p-10 text-xl font-bold text-blue-900">
                      Select Date And Book
                    </p>
                  </div>
                  <p>
                    You Are Looking For Date From {checkindate} To{" "}
                    {checkoutdate} For {roomqty} of Rooms
                  </p>
                  <CardFooter class="pt-3">
                    <p>Or change Date/Room</p>

                    {user ? (
                      <Space direction="horizontal" style={{ padding: 15 }}>
                        <RangePicker
                          format="YYYY-MM-DD"
                          onChange={onChangerange}
                          disabledDate={disabledDate}
                        />

                        <InputNumber
                          min={1}
                          max={property.total_rooms}
                          onChange={onChange}
                        />

                        <Button
                          color="purple"
                          onClick={() => {
                            if (checkindate && checkoutdate && roomqty) {
                              checkforRooms(property.id);
                            } else
                              Swal.fire({
                                title: "Error",
                                text: "Please Check The Date",
                                icon: "error",
                                confirmButtonText: "OK",
                              });
                          }}
                          size="lg"
                          fullWidth={true}
                        >
                          Check Availablity
                        </Button>
                      </Space>
                    ) : (
                      <Button
                        onClick={() => {
                          navigate("/login");
                        }}
                        color="green"
                      >
                        Clich Here To Login
                      </Button>
                    )}
                  </CardFooter>
                  {roomqty ? (
                    <p>total Amount:{roomqty * property.single_room_price*no_of_days()}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </form>
              <div></div>
              <button
                onClick={razorpayPayment}
                className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-black transition hover:translate-y-1"
              >
                Book Now
              </button>
              <script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></script>
            </div>
          </div>
        </div>
      ) : (
        <p>NO PROPERTIES</p>
      )}
    </div>
  );
}
