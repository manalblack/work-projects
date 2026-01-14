import { Suspense, lazy } from 'react'
import './App.css'
// import Home from './pages/Home'
// import Checkout from './pages/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Events from './pages/Events'
// import Cart from './pages/Cart'
import {Toaster} from 'react-hot-toast';
// import StaffSuccessfulLogin from './pages/StaffSuccessfulLogin';
// import Success from './pages/Success';
// import Admin from './pages/Admin'
// import Verify from './pages/Verify'

const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Events = lazy(() => import('./pages/Events'));
const Admin = lazy(() => import('./pages/Admin'));
const Verify = lazy(() => import('./pages/Verify'));    
const StaffSuccessfulLogin = lazy(() => import('./pages/StaffSuccessfulLogin'));   
const Success = lazy(() => import('./pages/Success'));


function App() {


  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/events' element={<Events /> } />
          <Route path='/cart' element={<Cart />} />

          <Route path='/admin-setup' element={<Admin />}/>
          <Route path='/verify/:ticketId' element={<Verify />}/>
          <Route path='/successful-login' element={<StaffSuccessfulLogin
          />}/>
          <Route path='/success' element={<Success />}/>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
