import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
function Loginedprivet(props) {
    const {user}=useContext(AuthContext)
  if (user){
        return <Navigate to='/login'/>
  }
  else{
    return props.children
  }
}

export default Loginedprivet
