import { useState, useEffect, useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Grid from './components/grid/Grid';
import SideNavDrawer from './components/side_nav/SideNavDrawer';
import Navbar from './components/navbar/Navbar';
import { initializeApp } from "firebase/app";
import { AppContext} from './contexts/AppContext';
import { DBContext } from './contexts/DBContext';
import { NavbarContextProvider } from './contexts/NavbarContext';
import Register from './components/register/Register';
import './App.css'
import ProductDetail from './components/product_detail/ProductDetail';
import Login from './components/login/Login';
import CustomerService from './components/customer_service/CustomerService';

import { 
  getAuth, 
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY ,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();

function App() {
  
  const {
    cart, setCart,
    isItemDeleted
    } = useContext(AppContext);

  const {
    onAppLoad,
    setCurrentUser } = useContext(DBContext);

  useEffect(() => {

    onAppLoad();

    const storage = localStorage.getItem("ShoppingCart");
    if (storage !== null) {
      setCart(JSON.parse(storage));
    }

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })
  }, []);

  useEffect(() => {
    if (cart.length > 0 || isItemDeleted) {
      localStorage.setItem('ShoppingCart', JSON.stringify(cart));
    }
  }, [cart])


  return (
    <>
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
      <div style={{ display: 'flex'}}>
        <SideNavDrawer />
        <Routes>
          <Route path='/' element={<Grid />} >
            <Route path=':category' element={<Grid />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customerservice' element={<CustomerService />} />
          <Route path="*" element={<Grid /> } />
        </Routes>
      </div>   
    </>
  )
}

export default App
