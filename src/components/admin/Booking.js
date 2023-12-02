import * as React from 'react';
import {useState,useEffect} from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Axiosinstance from '../../services/Axios';
import AuthContext from '../../context/AuthContext';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Booking() {
  const [bookinglatest,setbookinglatest]=useState([])
  const {user}=React.useContext(AuthContext)
  useEffect(()=>{
    const fetchbooking=async()=>{
      try {
        const token = localStorage.getItem('authTokens');
        const data={token:token}
await Axiosinstance.get("booking/latestsale",data=data).then((response)=>{
  setbookinglatest(response.data)
  console.log("setbookinglatest",response.data)
})

      }
      catch{

      }
    }
fetchbooking()
  },[])
  return (
    <React.Fragment>
      <Title>Recent Booking</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell>Name of Property</TableCell>
            <TableCell>Ckeck in Date</TableCell>
            <TableCell>Check Out Date</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookinglatest.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.room.property_name}</TableCell>
              <TableCell>{row.check_in_date}</TableCell>
              <TableCell>{row.check_out_date}</TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              <TableCell align="right">{row.total_amount}</TableCell>
            </TableRow>
           
          ))}
        </TableBody>
      </Table>
    
    </React.Fragment>
  );
}