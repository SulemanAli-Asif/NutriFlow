
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/page/Home'
import Pricing from './components/page/Pricing'
import Navbar from './components/Shared/Navbar'
import Footer from './components/Shared/Footer'
import { SignedIn } from '@clerk/clerk-react'
import UserInterface from './components/page/UserInterface'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path='/user-interface' element={
        <SignedIn >
          <UserInterface />
          </SignedIn>
      } />
    </Routes>
    <Footer />
    </>
  )
}

export default App
