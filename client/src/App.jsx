import { useState } from 'react'
import './App.css'
import { Route , Routes } from "react-router-dom"
import Login from './pages/login'
import IndexPage from './pages/IndexPage'
import Layout from './pages/Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Profile'
import Places from './pages/Places'
import PlacesForm from './pages/PlacesForm'
import PlacePage from './pages/placePage'
import Bookings from './pages/Bookings'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/places' element={<Places />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<PlacePage/>} />
          <Route path='/account/bookings' element={<Bookings />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
