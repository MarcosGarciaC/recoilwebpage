import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Genders from './pages/Genders/Genders';

function App() {
   const [count, setCount] = useState(0)

   return (
      <section>
         <Navbar></Navbar>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/genders' element={<Genders/>} />
         </Routes>
         <Footer></Footer>
      </section>
   )
}

export default App
