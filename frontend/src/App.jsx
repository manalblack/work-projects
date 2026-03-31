import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {HelmetProvider} from 'react-helmet-async'
import MainDash from './pages/admin/features/MainDash';
import AddEventArea from './pages/admin/features/AddEventArea';
import CreateTicketArea from './pages/admin/features/CreateTicketArea';
import EditEventArea from './pages/admin/features/EditEventArea';
import FindTicketArea from './pages/admin/features/FindTicketArea';
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
const AdminProtectedRoute = lazy(() => import('./pages/admin/AdminProtectedRoutes'));
const StaffFindTicket = lazy(() => import('./pages/StaffFindTicket'));

// testing

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {


  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <HelmetProvider>
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
        
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Home />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/events' element={<Events /> } />
          <Route path='/cart' element={<Cart />} />

          {/* move to admin routes after clients approve */}
         

          {/* staff routes */}
          <Route path='/staff-setup' element={<Staff />}/>
          <Route path='/verify/:ticketId' element={<Verify />}/>
          <Route path='/successful-login' element={<StaffSuccessfulLogin
          />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/staff-find-ticket' element={<StaffFindTicket />}/>

          <Route path='/admin-login' element={<AdminLogin />}/>
          {/* Admin routes / setup */}
          <Route element={<AdminProtectedRoute />}>
            <Route path='/testing-dash' element={<Dashboard />}>

              <Route path='main' element={<MainDash />}/>
              <Route path='Add-events' element={<AddEventArea />}/>
              <Route path='create-tickets' element={<CreateTicketArea />} />
              <Route path='edit-event' element={<EditEventArea />}/>
              <Route path='find-ticket' element={<FindTicketArea />}/>
            </Route>
            <Route path='/admin/dashboard' element={<AdminDashboard />}/>
            <Route path='/admin/search-tickets' element={<CustomerTicket/>}/>
            <Route path='/admin/add-events' element={<AddEvents />} />
            <Route path='/admin/create-ticket' element={<CreateTicket />}/>
          </Route>

          
          
        </Routes>
        </Suspense>
      </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
