import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
function Adminprivet(props) {
    const {user}=useContext(AuthContext) 
  if (user&& user.role==='admin'){
    return props.children
  }
  else{
    return <Navigate to="/Adminlogin" />
  }

}

export default Adminprivet