import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axiosinstance from "../services/Axios";
import classNames from "classnames";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
 
  { name: "Newest",  current: false },
  { name: "Price: Low to High",  current: false },
  { name: "Price: High to Low", current: false },
];

const filters = [
  {
    id: "Property_Type",
    name: "Property Type",
    options: [
      { value: "Hotel", label: "Hotel", checked: false },
      { value: "Resort", label: "Resort", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "1-star", label: "1-star", checked: false },
      { value: "3-star", label: "3-star", checked: false },
      { value: "4-stat", label: "4-star", checked: false },
      {
        value: "deluxe_premium_luxury",
        label: "deluxe_premium_luxury",
        checked: false,
      },
    ],
  },
  {
    id: "Amenities",
    name: "Amenities",
    options: [
      { value: "Power Backup", label: "Power Backup", checked: false },
      { value: "AC", label: "AC", checked: false },
      {
        value: "Fire Extinguisher",
        label: "Fire Extinguisher",
        checked: false,
      },
      { value: "WiFi", label: "WiFi", checked: false },
      {
        value: "Daily House Keeping",
        label: "Daily House Keeping",
        checked: false,
      },
      {
        value: "Attached Bathroom",
        label: "Attached Bathroom",
        checked: false,
      },
      { value: "First Aid Kit", label: "First Aid Kit", checked: false },
      { value: "TV", label: "TV", checked: false },
    ],
  },
];
function LocationProperty() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const maplocation = location.state?.maplocation1;
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [propertytype, setpropertytype] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
  
    // Function to handle filter changes and fetch filtered data
    const handleFilterChange = (filterId, value) => {
        if (filterId === "Amenities") {
          setAmenities((amenities) => {
            if (amenities.includes(value)) {
              return amenities.filter((item) => item !== value);
            } else {
              return [...amenities, value];
            }
          });
        } else if (filterId === "category") {
          setCategory((category) => {
            if (category.includes(value)) {
              return category.filter((item) => item !== value);
            } else {
              return [...category, value];
            }
          });
        } else if (filterId === "Property_Type") {
          setpropertytype((propertytype) => {
            if (propertytype.includes(value)) {
              return propertytype.filter((item) => item !== value);
            } else {
              return [...propertytype, value];
            }
          });
        }
      };


const handlesortoption=(value)=>{
  if(value==="Price: Low to High"){
    const filteredProperty = properties.slice(); // Create a copy of the original properties
    filteredProperty.sort((a, b) => a.total_room_price - b.total_room_price);
    setProperties(filteredProperty);
  }
  if(value==="Price: High to Low"){
    const filteredProperty = properties.slice(); // Create a copy of the original properties
    filteredProperty.sort((a, b) => b.total_room_price - a.total_room_price);
    setProperties(filteredProperty);
  }
  if(value==="Newest"){
    const filteredProperty = properties.slice(); // Create a copy of the original properties
    filteredProperty.sort((a, b) => b.id - a.id);

    setProperties(filteredProperty);
  }
}

    useEffect(() => {
     
      let url = `partner/getpropertybylocation/${maplocation}`;
  
  

      const queryParams = [];

      if (amenities.length > 0) {
        queryParams.push(`Amenities=${amenities.join(',')}`);
      }
      if (category.length > 0) {
        queryParams.push(`category=${category.join(',')}`);
      }
      if (propertytype.length > 0) {
        queryParams.push(`Property_Type=${propertytype.join(',')}`);
      }
    
      // Check if there are query parameters to append
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

  
      const fetchData = async () => {
        try {
          const response = await Axiosinstance.get(url);
          if (response.data) {
            setProperties(response.data);
          } else {
            setError("No data available.");
          }
        } catch (error) {
          setError("Error fetching data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      if (maplocation) {
        fetchData();
      }
    }, [maplocation, amenities,category,propertytype]);
  
    console.log("selectedFilters", selectedFilters);
    console.log("properties------", properties);
    console.log("object",amenities,propertytype,category)
  
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Book Your Hotel
            </h1>
           
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
             
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                          
                              onClick={(e)=>{handlesortoption(option.name)}}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form   className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                              
                                <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={() => handleFilterChange(section.id, option.value)}
/>


                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Button type="submit" color="blue">Apply Filter</Button>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {" "}
                <div>
                  <section className="bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                      <h2 className="text-3xl font-semibold mb-6">
                        Popular Properties in {maplocation}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                        
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
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LocationProperty;
