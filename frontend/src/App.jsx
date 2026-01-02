import './App.css'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Events from './pages/Events'
import Cart from './pages/Cart'
import {Toaster} from 'react-hot-toast';


function App() {


  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/events' element={<Events /> } />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
