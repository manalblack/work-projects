import './App.css'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Events from './pages/Events'
import Cart from './pages/Cart'


function App() {


  return (
    <>
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
