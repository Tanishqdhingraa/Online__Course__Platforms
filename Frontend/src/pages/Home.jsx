import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Continueyourlearning from '../components/Continueyourlearning'
import Topratedcourses from '../components/Topratedcourses'
import Youridentity from '../components/Youridentity'
import Footer from '../components/Footer'


function Home() {
  return (
    <>
    <Navbar/>
    <Youridentity/>
    <Banner/>
    <Continueyourlearning/>
    
    <Topratedcourses/>
    <Footer/>
    </>
  )
}

export default Home
