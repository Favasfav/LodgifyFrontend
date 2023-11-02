import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../services/Axios";
import MapComponent from "../partner/MapComponent";

function Home() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '13vh',
    padding: '12px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black', // Text color for the form
    fontFamily: 'Arial, sans-serif', // Specify your desired font family
  };

  const inputStyle = {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    marginRight: '1rem',
    color:'#263238',
    fontFamily: 'Arial, sans-serif', // Specify your desired font family
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: 'white', // Text color for the button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: 'Arial, sans-serif', // Specify your desired font family
  };

  const handleSearch = () => {
    // Handle search logic here
  };
  useEffect(() => {
    const fetchpropertyList = async () => {
      try {
        Axiosinstance.get(`partner/propertylistview`)
          .then((response) => {
            if (response.data) {
              console.log("Data:=====================", response.data);
              setProperties(response.data);
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

    fetchpropertyList();
  }, []);

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.tailwindcss.com/2.2.16/tailwind.min.css"
          rel="stylesheet"
        />
        {/* stylesheet */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css"
          rel="stylesheet"
        />
        {/* script */}
        <title>Document</title>
        {/* <nav className="sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
    <div className="flex items-center text-gray-900">
      <a
        href="#"
        className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
      >
        Material Tailwind
      </a>
      <ul className="ml-auto mr-8 hidden items-center gap-6 lg:flex">
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Pages
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Account
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Blocks
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Docs
          </a>
        </li>
      </ul>
      <button
        className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
        type="button"
        data-ripple-light="true"
      >
        <span>Buy Now</span>
      </button>
      <button
        className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
        data-collapse-target="sticky-navar"
      >
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokewidth={2}
          >
            <path
              strokelinecap="round"
              strokelinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
      </button>
    </div>
    <div
      className="block h-0 w-full basis-full overflow-hidden text-blue-gray-900 transition-all duration-300 ease-in lg:hidden"
      data-collapse="sticky-navar"
    >
      <ul className="mt-2 mb-4 flex flex-col gap-2 pb-2">
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Pages
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Account
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Blocks
          </a>
        </li>
        <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
          <a className="flex items-center" href="#">
            Docs
          </a>
        </li>
        <button
          className="mb-2 block w-full rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          <span>Buy Now</span>
        </button>
      </ul>
    </div>
  </nav> */}
        <section className="bg-center bg-no-repeat bg-[url('https://familyvacationist.com/wp-content/uploads/2020/12/Hard-Rock-Hotel-Riviera-Maya.jpg')] bg-gray-400 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              We invest in the world’s potential
            </h1>
            
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Get started
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
              >
                Learn more
              </a>
            </div>
            <div style={containerStyle}>
      <form style={formStyle}>
        
        {/* <label htmlFor="location" className="text-gray-900 dark:text-white">Location</label>
        <input type="text" id="location" style={inputStyle} placeholder="Location" />
        <MapComponent></MapComponent> */}

        <label htmlFor="startDate" className="text-gray-900 dark:text-white">Starting Date</label>
        <input type="date" id="startDate" style={inputStyle} placeholder="Starting Date" />

        <label htmlFor="endDate" className="text-gray-900 dark:text-white">Ending Date</label>
        <input type="date" id="endDate" style={inputStyle} placeholder="Ending Date" />
        
        <button type="submit" style={buttonStyle} onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
          </div>
          
        </section>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* Flex Item 1 */}
          <div className="text-white p-4 m-2 md:flex-1">
            <div className="p-4 rounded">
              <a
                href="#"
                className="block max-w-sm p-6 bg-yellow-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div>
          </div>
          {/* Flex Item 2 */}
          <div className="text-white p-4 m-2 md:flex-1">
            <div className="p-4 rounded">
              <a
                href="#"
                className="block max-w-sm p-6 bg-green-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div>
          </div>
          {/* Flex Item 3 */}
          <div className=" p-4 m-2 md:flex-1">
            <div className="p-4 rounded ">
              <a
                href="#"
                className="block max-w-sm p-6 bg-red-500 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div>
          </div>
        </div>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Popular Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {properties &&
                properties.map((property, index) => (
                  <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                    <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                      <img
                        src={property.photos[0].photo}
                        alt="ui/ux review check"
                      />
                      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                      <button
                        className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-dark="true"
                      >
                        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                          >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                          {property.property_name}
                        </h5>

                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                          5.0
                        </p>
                      </div>
                      <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {property.city}
                      </h5>
                      <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased"></p>
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
                        <div
                          data-tooltip="money"
                          className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                        >
                          $129 per night
                        </div>
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
                        <div
                          data-tooltip="bedrooms"
                          className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                        >
                          2 bedrooms
                        </div>
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
                        <div
                          data-tooltip="fire"
                          className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                        >
                          Fire alert
                        </div>
                        <span
                          data-tooltip-target="more"
                          className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                        >
                          +20
                        </span>
                        <div
                          data-tooltip="more"
                          className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                        >
                          And +20 more
                        </div>
                      </div>
                    </div>
                    <div className="p-6 ">
                      <h5 className="text-md pb-3 font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                        Price per Night: {property.single_room_price}
                      </h5>
                      <div className="flex">
                        <button
                          onClick={() => {
                            console.log("property.id", property.id);
                            navigate("/detailedpropertyuser", {
                              state: { propertyId: property.id },
                            });
                          }}
                          className="flex-1 min-w-0 select-none rounded-lg bg-pink-500 py-2 px-4 text-center font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                        >
                          View Details
                        </button>
                        <button
                          className="flex-1 min-w-0 select-none rounded-lg bg-blue-500 py-3.5 px-4 text-center font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Latest Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Course Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold mb-2">Course Title 1</h3>
                <p className="text-gray-600 mb-4">Description of Course 1.</p>
                <a href="#" className="text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
              {/* Course Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold mb-2">Course Title 2</h3>
                <p className="text-gray-600 mb-4">Description of Course 2.</p>
                <a href="#" className="text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
              {/* Course Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold mb-2">Course Title 3</h3>
                <p className="text-gray-600 mb-4">Description of Course 3.</p>
                <a href="#" className="text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
              {/* Add more Course Cards as needed */}
            </div>
          </div>
        </section>

{/*        
        <div className="flex w-full">
  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
<form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>
  <div className="divider divider-horizontal">OR</div>
  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
    <form>
    <label for="from-date" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">From Date</label>
    <input type="date" id="from-date" name="from-date" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="From Date" required/>

    <label for="to-date" class="mt-2 mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">To Date</label>
    <input type="date" id="to-date" name="to-date" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="To Date" required/>

    <button type="submit" class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">Search</button>
  </form>
</div>
</div>
        */}

       

      </>
    </div>
  );
}

export default Home;
