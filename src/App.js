import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
import Header from './Components/Header/Header'
import Login from './Components/Login/Login'
import ManageExpense from './Components/ManageExpense/ManageExpense'
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute'
import UpdateExpense from './Components/Update Expense/UpdateExpense'

const App = () => {
  return (
  <>
    <Header/>
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={ManageExpense} />} />
      <Route path="/add-expense" element={<ProtectedRoute Component={AddExpense} />} />
      <Route path='/update-expense/:item' element={<ProtectedRoute Component={UpdateExpense}/>}/>
      <Route path='/login' element={<Login/>} />   
    </Routes>
    </>
    )
}

export default App
