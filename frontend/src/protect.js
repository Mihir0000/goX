import React from 'react'
import { Navigate } from 'react-router-dom';



const Protect = ({children}) => {
    
    let isLoggedIn=window.sessionStorage.getItem('email')
    return isLoggedIn
            ? children
            : (<Navigate to="/login"/>)
            
}

export default Protect;