import React from 'react'
import {BrowserRouter , Route, Routes , } from 'react-router-dom'
import Signup from '../Auth/Signup'

const AppRoute = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/questions/:id" element={<QuestionDetail />} />

  </Routes>
   </BrowserRouter>
  )
}

export default AppRoute