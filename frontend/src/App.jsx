import { Suspense, lazy } from 'react'
import './App.css'
// import Home from './pages/Home'
// import Checkout from './pages/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Events from './pages/Events'
// import Cart from './pages/Cart'
import {Toaster} from 'react-hot-toast';
// import Admin from './pages/Admin'
// import Verify from './pages/Verify'

const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Events = lazy(() => import('./pages/Events'));
const Admin = lazy(() => import('./pages/Admin'));
const Verify = lazy(() => import('./pages/Verify'));      


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
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
