import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
function Userpublic(props) {
  const {user}=useContext(AuthContext)
  if (user){
    return <Navigate to="/"/>
  }
  else{
   return  props.children
  }
}

export default Userpublic
