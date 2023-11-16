
'use client';

import { Table } from 'flowbite-react';
import React,{useState,useEffect, useContext} from 'react';
import Axiosinstance from '../services/Axios';
import AuthContext from '../context/AuthContext';

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
    
      
const cancelorder=async(booking_id)=>{
    console.log(booking_id)
    const data={
        "booking_id":booking_id

    };
    await Axiosinstance.post('booking/cancelbooking/',data).then(function(response){
        console.log(response.data)
    }
    )
}


return (
    <div className="p-20 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:max-w-full">
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
                  {booking.room.property_name}
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
