
'use client';

import { Table } from 'flowbite-react';
import React,{useState,useEffect, useContext} from 'react';
import Axiosinstance from '../services/Axios';
import AuthContext from '../context/AuthContext';
import { request } from 'websocket';

export default function Mybookings() {
    const [bookinglist,setBookinglist]=useState([])
    const {user}=useContext(AuthContext)
    useEffect(() => {
      
        const fetchUserList = async () => {
          try {
            const response =await Axiosinstance.get(`booking/bookinglist/${user.user_id}`);
            console.log("response.data",response.data)

            setBookinglist(response.data);
            
            
    
          } catch (error) {
            console.error('Error fetching data:', error);
            
            
          }
        };
        console.log("bookinglist",bookinglist)
        fetchUserList();
      }, []);
    
      
      const cancelorder = async (booking_id) => {
        console.log(booking_id);
        const data = {
            "booking_id": booking_id
        };
    
        try {
            const response = await Axiosinstance.post('booking/cancelbooking/', data);
    
            if (response.status === 200) {
                // Create a new array with the updated booking status
                const updatedBookings = bookinglist.map(booking =>
                    booking.id === booking_id ? { ...booking, is_cancelled: true } : booking
                );
    
                setBookinglist(updatedBookings);
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };
    


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
            <Table.HeadCell>Cancel</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
  
          <Table.Body className="divide-y">
            {bookinglist.map((booking) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={booking.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {booking.room && booking.room.property_name ? booking.room.property_name : 'N/A'}
                </Table.Cell>
                <Table.Cell>{booking.check_in_date}</Table.Cell>
                <Table.Cell>{booking.check_out_date}</Table.Cell>
                <Table.Cell>{booking.room_qty_booked}</Table.Cell>
                <Table.Cell>{booking.total_amount}</Table.Cell>
                {booking.is_cancelled === false ? (
                  <Table.Cell>
                    <button className="btn-primary" onClick={() => cancelorder(booking.id)}>
                      CANCEL
                    </button>
                  </Table.Cell>
                ) : (
                  <Table.Cell>
                    <p style={{ color: 'red' }}>Cancelled</p>
                  </Table.Cell>
                )}
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
