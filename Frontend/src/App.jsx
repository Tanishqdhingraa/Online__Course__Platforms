import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    {/* <Route path='/Admin' element={}/> */}

    {/* <Route path='/Login' element={<Login/>}/> */}

    {/* <Route path='/' element={<MyLea}/> */}

    {/* <Route path='/' element={}/> */}

  </Routes>
  </BrowserRouter>
  )
}

export default App
