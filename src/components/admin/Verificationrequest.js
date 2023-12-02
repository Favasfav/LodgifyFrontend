import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/Axios";
import { baseUrl } from "../../constants";

function Verificationrequest() {
  const [propertylist, Setpropertylist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axiosInstance.get("partner/propertylist/");
        console.log(response.data);
        Setpropertylist(response.data);

        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  const aprovefunction = async (propertyId) => {
    try {
      const response = await axiosInstance.post(
        `partner/Verifypropertyaproval/${propertyId}/`
      );

      const updatedlist = propertylist.map((property) => {
        if (property.id === propertyId) {
          return { ...property, is_verified: !property.is_verified };
        }
        return property;
      });

      Setpropertylist(updatedlist);

      console.log("Data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-20">
      <ul role="list" className="divide-y divide-gray-100">
        {propertylist.map((property, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-2">
              {property && property.photos && property.photos.length > 0 ? (
                <div>
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={property.photos[0].photo} // Use the URL of the first photo
                    alt={`Property Photo 1`}
                  />
                </div>
              ) : (
                <p>No Images</p>
              )}

              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {property.property_name}
                </p>
                {property && property.category && property.category[0] ? (
                  <p className="mt-1 truncate text-xs leading-5 text-black-500">
                    {property.category[0].category}
                  </p>
                ) : (
                  <p>Not specified</p>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Address
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {property.maplocation}
              </p>
            </div>

            <div className="  sm:flex sm:flex-col sm:items-end">
              {property.is_verified ? (
                <button
                  onClick={() => aprovefunction(property.id)}
                  className="text-sm bg-red-500 leading-6  text-gray-100 rounded-md px-4 py-2"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => aprovefunction(property.id)}
                  className="text-sm leading-6 bg-green-500 text-gray-100 rounded-md px-4 py-2"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => {
                  console.log("property.id", property.id);
                  navigate("/detailedproperty", {
                    state: { propertyId: property.id },
                  });
                }}
                className="text-sm leading-6 bg-blue-500 text-gray-100 rounded-md px-4 py-2"
              >
                Detailed View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Verificationrequest;
