import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {HelmetProvider} from 'react-helmet-async'
import CreateTicketsArea from './pages/admin/features/CreateTicketsArea';
import { LanguageProvider } from './hooks/LanguageContext';
import ScrollToTop from './re-build-components/ScrollToTop';


// new pages / Rebuilt

const ToursAndServices = lazy(() => import('./pages/ToursAndServices'));
const Founder = lazy(() => import('./pages/Founder'));
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));


const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Staff = lazy(() => import('./pages/Staff'));
const Verify = lazy(() => import('./pages/Verify'));    
const StaffSuccessfulLogin = lazy(() => import('./pages/StaffSuccessfulLogin'));   
const Success = lazy(() => import('./pages/Success'));

// Admin pages
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
// const CustomerTicket = lazy(() => import('./pages/admin/FindTicket'));
// const AddEvents = lazy(() => import('./pages/admin/AddEvents'))
// const CreateTicket = lazy(() => import('./pages/admin/CreateTicket'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminProtectedRoute = lazy(() => import('./pages/admin/AdminProtectedRoutes'));
const StaffFindTicket = lazy(() => import('./pages/StaffFindTicket'));

// New admin dashboard with nested routes for each feature
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MainDash = lazy(() => import('./pages/admin/features/MainDash'));
const AddEventArea = lazy(() => import('./pages/admin/features/AddEventArea'));
const CreateTicketArea = lazy(() => import('./pages/admin/features/CreateTicketArea'));
const EditEventArea = lazy(() => import('./pages/admin/features/EditEventArea'));
const FindTicketArea = lazy(() => import('./pages/admin/features/FindTicketArea'));




function App() {
  
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <HelmetProvider>
        <LanguageProvider>
          <BrowserRouter>
          <ScrollToTop />
          
            <Suspense fallback={<div>Loading...</div>}>
         
            <Routes>
              {/* public routes */}
              <Route path='/' element={<Home />}/>
              <Route path='/tours-and-services' element={<ToursAndServices />}/>
              <Route path='/founder' element={<Founder />}/>
              <Route path='/contact' element={<Contact />} />

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
                <Route path='/admin/dashboard' element={<Dashboard />}>
                  <Route path='main' element={<MainDash />}/>
                  <Route path='Add-events' element={<AddEventArea />}/>
                  <Route path='create-ticket' element={<CreateTicketArea />} />
                  <Route path='create-tickets' element={<CreateTicketsArea />} />
                  <Route path='edit-event' element={<EditEventArea />}/>
                  <Route path='find-ticket' element={<FindTicketArea />}/>
                </Route>
                {/* <Route path='/admin/dashboard' element={<AdminDashboard />}/>
                <Route path='/admin/search-tickets' element={<CustomerTicket/>}/>
                <Route path='/admin/add-events' element={<AddEvents />} />
                <Route path='/admin/create-ticket' element={<CreateTicket />}/> */}
              </Route>

              
              
            </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </HelmetProvider>
    </>
  )
}

export default App
