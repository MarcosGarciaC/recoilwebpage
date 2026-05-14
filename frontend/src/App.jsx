import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Genders from './pages/Genders/Genders';
import News from './pages/News/News';
import Premium from './pages/Premium/Premium';

function App() {
   const [count, setCount] = useState(0)

   return (
      <section>
         <Navbar></Navbar>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/genders' element={<Genders/>} />
            <Route path='/news' element={<News/>} />
            <Route path="/premium" element={<Premium />} />
         </Routes>
         <Footer></Footer>
      </section>
   )
}

export default App
