import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
function Partnerprivet(props) {
    const {user}=useContext(AuthContext) 
  if (user&& user.role==='partner'){
    return props.children
  }
  else{
    return <Navigate to="/login" />
  }

}

export default Partnerprivet
