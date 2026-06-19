import { useState } from 'react'
import { Routes, Route, useLocation} from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Genders from './pages/Genders/Genders';
import GameCatalogFiltered from './components/GameCatalogFiltered/GameCatalogFiltered';
import GamePage from './pages/GamePage/GamePage';
import News from './pages/News/News';
import ArticleNews from './pages/ArticleNews/ArticleNews';
import Premium from './pages/Premium/Premium';
import Login from './pages/LoginRegister/LoginRegister';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import EasterEgg from './pages/EasterEgg/EasterEgg';
import Payment from './pages/Payment/Payment';
import PaymentMethods from './pages/PaymentMethods/PaymentMethods'
import Subscription from './pages/Subscription/Subscription'

function App() {
   const location = useLocation();
   const isAuthPage = location.pathname ==="/login" || location.pathname === "/register" ||
   location.pathname === "/payment" || location.pathname === "/paymentmethods" || location.pathname === "/chochita" ;

   return (
      <section>
         {!isAuthPage && <Navbar />}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/genders' element={<Genders />} />
            <Route path='/gamecatalogfiltered' element={<GameCatalogFiltered />} />
            <Route path='/game/:id' element={<GamePage />} />
            <Route path='/news' element={<News />} />
            <Route path='/news/article' element={<ArticleNews />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chochita" element={<EasterEgg />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paymentmethods" element={<PaymentMethods />} />
            <Route path="/Subscription" element={<Subscription />}  />
         </Routes>
         {!isAuthPage && <Footer />}
      </section>
   )
}

export default App
