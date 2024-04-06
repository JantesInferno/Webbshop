import { Routes, Route } from 'react-router-dom'
import LayoutContainer from './components/layout_container/LayoutContainer';
import SideNavDrawer from './components/side_nav/SideNavDrawer';
import Navbar from './components/navbar/Navbar';
import { NavbarContextProvider } from './contexts/NavbarContext';
import Register from './components/register/Register';
import './App.css'
import ProductDetail from './components/product_detail/ProductDetail';
import Login from './components/login/Login';
import CustomerService from './components/customer_service/CustomerService';

function App() {

  return (
    <>
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
      <div style={{ display: 'flex'}}>
        <SideNavDrawer />
        <Routes>
          <Route path='/' element={<LayoutContainer />} >
            <Route path='/:category' element={<LayoutContainer />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customerservice' element={<CustomerService />} />
          <Route path="*" element={<LayoutContainer /> } />
        </Routes>
      </div>   
    </>
  )
}

export default App