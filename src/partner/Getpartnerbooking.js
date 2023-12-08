"use client";

import { Table } from "flowbite-react";
import React, { useState, useEffect, useContext } from "react";
import Axiosinstance from "../services/Axios";
import AuthContext from "../context/AuthContext";
import { request } from "websocket";

export default function Getpartnerbooking() {
  const { user } = useContext(AuthContext);
  const [bookinglist, setmybooking] = useState([]);
  useEffect(() => {
    const allbooking = () => {
      try {
        Axiosinstance.get(`booking/partnerbooking/${user.user_id}`).then(
          (response) => {
            if (response) {
              setmybooking(response.data);
            }
          }
        );
      } catch {
        console.error("Error fetching data:");
      }
    };

    allbooking();
  }, []);

  return (
    <div className="p-10 bg-white rounded-xl shadow-md  md:max-w-2xl lg:max-w-full">
      {bookinglist ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Property Name</Table.HeadCell>
            <Table.HeadCell>DATE FROM</Table.HeadCell>
            <Table.HeadCell>DATE TO</Table.HeadCell>
            <Table.HeadCell>TOTAL ROOMS</Table.HeadCell>
            <Table.HeadCell>TOTAL PRICE</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {bookinglist.map((booking) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={booking.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {booking.room && booking.room.property_name
                    ? booking.room.property_name
                    : "N/A"}
                </Table.Cell>
                <Table.Cell>{booking.check_in_date}</Table.Cell>
                <Table.Cell>{booking.check_out_date}</Table.Cell>
                <Table.Cell>{booking.room_qty_booked}</Table.Cell>
                <Table.Cell>{booking.total_amount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>NO BOOKINGS</p>
      )}
    </div>
  );
}
