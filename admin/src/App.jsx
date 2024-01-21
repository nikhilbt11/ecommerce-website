import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Admin from './pages/Admin/admin'

function App() {

  return (
    <div className='app-container'>
      <Navbar/>
     <Admin/>
    </div>
  )
}

export default App
