import React from 'react'
import AppRoute from './Routes/AppRoute'
import Navbar from './Others/Navbar'

const App = () => {
  return (
    <div className='w-screen h-screen'>
      <Navbar/>
   <AppRoute/>
   </div>
  )
}

export default App