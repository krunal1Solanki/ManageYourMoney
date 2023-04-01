import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {
  return (
    <div>
      {window.localStorage.getItem("token") ?
        <Component/> :
        <Navigate to="/login" replace />
      }
    </div>
  )
}

export default ProtectedRoute
