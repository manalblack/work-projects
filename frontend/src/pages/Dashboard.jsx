import {motion, AnimatePresence} from 'motion/react'
import { useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { IoTicketOutline, IoSearch,  IoHomeOutline, IoMenu, IoCloseSharp  } from "react-icons/io5";
import { FaArrowUpRightFromSquare} from "react-icons/fa6";
import { Link, Outlet, NavLink } from 'react-router-dom';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import MainDash from './admin/features/MainDash';
import AddEventArea from './admin/features/AddEventArea';
import CreateTicketArea from './admin/features/CreateTicketArea';
import EditEventArea from './admin/features/EditEventArea';
import FindTicketArea from './admin/features/FindTicketArea';
import { useMediaQuery } from '../hooks/useMediaQuery';


export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [activeTab, setActiveTab] = useState('Main Area');

    // change this to using Navlink and outlet
    const renderMainContent = () => {
        switch (activeTab) {
            case 'Main Area': return <MainDash />;
            case 'Add Event': return <AddEventArea />;
            case 'Create Ticket': return <CreateTicketArea />;
            case 'Edit Event': return <EditEventArea />;
            case 'Find Ticket': return <FindTicketArea />;
        }
    };

    const tabs = [
        {to: 'main', icon: IoHomeOutline, label: 'Main'},
        {to: 'add-events', icon: CiSquarePlus, label: 'Add Event'},
        {to: 'create-tickets', icon: IoTicketOutline, label: 'Create Ticket'},
        {to: 'edit-event', icon: FaRegEdit, label: 'Edit event'},
        {to: 'find-ticket', icon: IoSearch, label: 'Find ticket'}
    ]

    const sidebarVariants = {
    open: { 
      x: 0,
      width: isMobile ? "280px" : "210px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
       x: isMobile ? "-100%" : 0, // Moves it completely out of view to the left
      width: isMobile ? "280px" : "100px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
    const sidebarTransition = { type: "spring", stiffness: 300, damping: 30 };


    return(
        <div className="bg-gray-100 h-screen w-full flex overflow-hidden">

            {/* 1. THE OVERLAY (Mobile Only) */}
            <AnimatePresence>
                {isOpen && isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] md:hidden"
                />
                )}
            </AnimatePresence>

            {/* side bar component */}
            <motion.aside 
            initial='closed'
            animate={isOpen ? "open" : 'closed'}
            // transition={sidebarTransition}
            variants={sidebarVariants}
            className={`bg-ghostWhite z-99 shadow-[4px_0_10px_rgba(0,0,0,0.05)] md:relative flex flex-col md:gap-10 p-1 fixed shrink-0 top-0 left-0 h-full md:translate-x-0 md:opacity-100 `}>

                <button className='absolute cursor-pointer top-4 md:hidden flex right-4 bg-blue-300 text-white rounded-md active:scale-85 transition-all duration-300 ease-in-out'>
                    <IoCloseSharp className='size-7 '/>
                </button>

                <div className='flex justify-center items-center z-100'>
                   <img src='/TRAVLISTA-logo.png' alt='company logo'/>
                    
                </div>

                <div className='flex flex-col flex-1 gap-20 bg-red-0'>
                    <nav className='flex flex-col gap-8 p-1'>
                        {tabs.map(({to, icon: Icon, label}) => (
                            <NavLink key={label} to={to} className={({isActive}) => isActive ? 'active-nav-item' : 'nav-item'}>
                                <div data-tooltip-id="sidebar-tooltip"
                                data-tooltip-content={isOpen ? '' : label}
                                className='groupe sidebar-link-item'>
                                    <span className={`flex flex-row ${isOpen ? 'justify-between' : 'justify-center items-center'} px-1.5 py-2 rounded-md hover:bg-blue-300 hover:text-white hover:shadow-md active:scale-85 transition-all duration-300 ease-in-out`}>
                                            <Icon className={`${isOpen ? 'size-6': 'size-8'}`}/>
                                            <span className={`${isOpen ? 'flex' : 'hidden'} text-lg`}> 
                                                {label} 
                                            </span>
                                    </span>  
                               </div>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </motion.aside>

            {/* main content area and navbar */}
            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                <nav className='bg-ghostWhite md:p-3 p-2 flex justify-between shadow-md'>
                    <div className='flex md:gap-5 gap-10 '>
                        <button onClick={() => 
                        setIsOpen(!isOpen)}
                 className='bg-red-00 hidden md:flex'>
                    {isOpen ? <GoSidebarExpand  
                    className='size-6'/>  
                    : <GoSidebarCollapse 
                    className='size-6'/>}
                </button>
                 <button onClick={() => setIsOpen(true)}
                    className='bg-blue-300 text-white p-0.2 rounded-md md:hidden flex'>
                        <IoMenu className='size-6'/>
                    </button>

                    <header className='text-sm hidden md:text-lg font-bold'>
                        {activeTab}
                    </header>
                </div>
                   
                    <div className='bg-gray-0'>
                        <Link>
                            <span
                             className='flex md:gap-3 gap-1 justify-center items-center text-sm p-1 rounded-md active:bg-blue-300 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out '>
                                Main Site
                                <FaArrowUpRightFromSquare />
                            </span>
                        </Link>
                    </div>
                </nav>

                <main className="flex-1 overflow-y-auto p-2 md:pl-5">
                    <Outlet />
                </main>
            </div>

            <Tooltip 
            // id="sidebar-tooltip" 
            anchorSelect=".sidebar-link-item"
        className="z-99 rounded-md bg-stone-800 px-3 py-1.5 text-xs opacity-100"
        noArrow={false}
      />
        </div>
    )

}