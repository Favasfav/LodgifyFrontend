import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
function Userprivet(props) {
    const {user}=useContext(AuthContext) 
  if (user&& user.role==='user'){
    return props.children
  }
  else{
    return <Navigate to="/login" />
  }

}

export default Userprivet
