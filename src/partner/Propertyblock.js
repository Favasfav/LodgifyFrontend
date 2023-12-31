
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "antd";
import moment from "moment";
import Axiosinstance from "../services/Axios";
import { useLocation } from "react-router-dom";


export default function Propertyblock() {
    const location = useLocation();
   
    const propertyId = location.state.propertyId;
    
  const { RangePicker } = DatePicker;
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const disabledDate = (current) => {
    
    return current && current < moment().add(3, "months");
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const onChangerange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setstartdate(dateString[0]);
    setenddate(dateString[1]);
  };
  const handleSubmit=()=>{
    
    try{
       
Axiosinstance.post(`booking/blockproperty/${propertyId}/`,{
    enddate:enddate,
    startdate:startdate

})
    }
    catch{

    }
  }
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
       
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Please read the Terms And condition .{" "}
            </div>
          </div>
         
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Policy To Block The Property
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The Company agrees to provide you with a minimum of 30 days'
              notice before blocking access to your property. This notice will
              be communicated through the contact information associated with
              your account, including but not limited to email or other
              electronic means.{" "}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <RangePicker
                required
                format="YYYY-MM-DD "
                onChange={onChangerange}
                disabledDate={disabledDate}
              />

              <button
               onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Click Here To Proceed
              </button>
            </div>
            
              {/* <div className="relative bg-white px-4 sm:px-10 md:px-[76px] py-6 sm:py-9 md:py-[70px] mt-5 sm:-mt-[166px] shadow-lg rounded-xl flex flex-col gap-4 sm:gap-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    
                    <div className="flex-1">
                      <label for="pickUpDate" className="text-blue-500">
                        From
                      </label>
                      <div className="relative h-12 rounded-[4px]">
                        <input
                          type="date"
                          id="pickUpDate"
                          placeholder="22/12/23"
                          onChange={(e) => {
                            const formattedDate = formatDate(e.target.value);
                            setfromdate(formattedDate);
                          }}
                          min={new Date().toISOString().split("T")[0]}
                          className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px] border-gray-300 py-2 sm:py-[14px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label for="returnDate" className="text-blue-500">
                        To
                      </label>
                      <div className="relative h-12 rounded-[4px]">
                        <input
                          type="date"
                          id="returnDate"
                          placeholder="31/12/223"
                          onChange={(e) => {
                            const formattedDate = formatDate(e.target.value);
                            settodate(formattedDate);
                          }}
                          className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px] border-gray-300 py-2 sm:py-[14px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  
                </div> */}
















             
          </div>
         
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
