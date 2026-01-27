import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
// import CustomerTicket from './pages/admin/CustomerTicket';


const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Events = lazy(() => import('./pages/Events'));
const Staff = lazy(() => import('./pages/Staff'));
const Verify = lazy(() => import('./pages/Verify'));    
const StaffSuccessfulLogin = lazy(() => import('./pages/StaffSuccessfulLogin'));   
const Success = lazy(() => import('./pages/Success'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CustomerTicket = lazy(() => import('./pages/admin/FindTicket'));
const AddEvents = lazy(() => import('./pages/admin/AddEvents'))
const CreateTicket = lazy(() => import('./pages/admin/CreateTicket'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminProtectedRoute = lazy(() => import('./pages/admin/AdminProtectedRoutes'))

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

          <Route path='/admin-login' element={<AdminLogin />}/>
          {/* Admin routes / setup */}
          <Route element={<AdminProtectedRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />}/>
            <Route path='/admin/search-tickets' element={<CustomerTicket/>}/>
            <Route path='/admin/add-events' element={<AddEvents />} />
            <Route path='/admin/create-ticket' element={<CreateTicket />}/>
          </Route>

          
          
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
