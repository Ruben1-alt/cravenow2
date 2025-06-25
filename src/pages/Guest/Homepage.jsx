import React from 'react'
import Navbar from '../../components/Navbar'
import ContentSection from '../../components/contentsection'
import Footer from '../../components/footer'
import Content from '../../components/Content'
import Featured from '../../components/Featured'



function Homepage() {
  return (
    <>
    <Navbar/>
    <Content/>
    <ContentSection/>
    <Featured/>
    <Footer/>
    
    </>
)
}

export default Homepage