import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';


const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Events = lazy(() => import('./pages/Events'));
const Staff = lazy(() => import('./pages/Staff'));
const Verify = lazy(() => import('./pages/Verify'));    
const StaffSuccessfulLogin = lazy(() => import('./pages/StaffSuccessfulLogin'));   
const Success = lazy(() => import('./pages/Success'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

function App() {


  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          {/* public routes */}
          <Route path='/' element={<Home />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/events' element={<Events /> } />
          <Route path='/cart' element={<Cart />} />

          {/* staff routes */}
          <Route path='/staff-setup' element={<Staff />}/>
          <Route path='/verify/:ticketId' element={<Verify />}/>
          <Route path='/successful-login' element={<StaffSuccessfulLogin
          />}/>
          <Route path='/success' element={<Success />}/>

          {/* Admin route / setup */}
          <Route path='/admin' element={<AdminDashboard />}/>
          
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
