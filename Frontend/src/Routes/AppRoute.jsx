import React from 'react'
import {BrowserRouter , Navigate, Route, Routes , } from 'react-router-dom'
import Signup from '../Auth/Signup'
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Login from '../Auth/Login';
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';

const AppRoute = () => {
  const isLoggedIn = localStorage.getItem('token');
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/home" element={<Home />} />
    <Route path="/questions/:id" element={<QuestionDetail />} />
    <Route path="/ask" element={isLoggedIn ? <AskQuestion /> : <Navigate to="/login" />} />

  </Routes>
   </BrowserRouter>
  )
}

export default AppRoute