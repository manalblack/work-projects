import {motion} from 'motion/react'
import { useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { IoTicketOutline, IoSearch,  IoHomeOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import MainDash from './admin/features/MainDash';
import AddEventArea from './admin/features/AddEventArea';
import CreateTicketArea from './admin/features/CreateTicketArea';
import EditEventArea from './admin/features/EditEventArea';
import FindTicketArea from './admin/features/FindTicketArea';


export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Main Area');

    const renderMainContent = () => {
        switch (activeTab) {
            case 'Main Area': return <MainDash />;
            
            case 'Add Event': return <AddEventArea />;
            case 'Create Ticket': return <CreateTicketArea />;
            case 'Edit Event': return <EditEventArea />;
            case 'Find Ticket': return <FindTicketArea />;


        }
    };


    const sidebarTransition = { type: "spring", stiffness: 300, damping: 30 };


    return(
        <div className="bg-gray-300 h-screen w-full flex overflow-hidden">

            {/* side bar component */}

            <motion.aside 
            animate={{width: isOpen ? 170 : 60}}
            transition={sidebarTransition}
             className={`bg-ghostWhite shadow-[4px_0_10px_rgba(0,0,0,0.05)] relative flex flex-col gap-10 p-1`}>
                <div className='flex justify-center items-center'>
                   <img src='/TRAVLISTA-logo.png' alt='company logo'/>
                    
                </div>

                <div className='flex flex-col gap-20 bg-red-00'>
                    <ul className='w-full flex flex-col gap-5 justify-center items-center p-0.5 cursor-pointer bg-red-00'>
                        <li onClick={() => setActiveTab('Main Area')}
                        data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                            data-tooltip-content='Main area'
                            data-tooltip-place='right'
                        className={`flex justify-between ${isOpen ? 'justify-between': 'justify-center'} w-full p-1 px-1 rounded-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out `}>
                            <IoHomeOutline
                            className='size-6 '/>  
                            <span className={`${isOpen ? 'flex' : 'hidden'} text-sm`}>
                                Main area
                            </span>
                           
                            
                        </li>

                        <li onClick={() => setActiveTab('Add Event')}
                        data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                            data-tooltip-content='Add event'
                            data-tooltip-place='right'
                        className={`flex justify-between ${isOpen ? 'justify-between': 'justify-center'} w-full p-1 px-1 rounded-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out `}>
                            <CiSquarePlus 
                            className='size-6'/>  
                            <span className={`${isOpen ? 'flex' : 'hidden'} text-sm`}>
                                Add event
                            </span>
                           
                            
                        </li>

                        <li onClick={() => setActiveTab('Create Ticket')}

                        data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                            data-tooltip-content='Create ticket'
                            data-tooltip-place='right'
                        className={`flex ${isOpen ? 'justify-between': 'justify-center'} w-full p-1 px-1 rounded-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out `}>
                            <IoTicketOutline
                             className='size-5'/>
                            <span className={`${isOpen ? 'flex' : 'hidden'} text-sm`}>
                                Create tickets 
                            </span>
                           
                            
                        </li>
                        <li onClick={() => setActiveTab('Edit Event')}

                        data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                            data-tooltip-content='Edit event'
                            data-tooltip-place='right'
                         className={`flex ${isOpen ? 'justify-between': 'justify-center'} w-full p-1 px-1 rounded-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out `}>
                            <FaRegEdit className='size-5'/>
                            <span className={`${isOpen ? 'flex' : 'hidden'} text-sm`}>
                                Edit event
                            </span>
                           
                            
                        </li>
                        <li onClick={() => setActiveTab('Find Ticket')}
                        data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                            data-tooltip-content='Find ticket'
                            data-tooltip-place='right'
                        className={`flex ${isOpen ? 'justify-between': 'justify-center'} w-full p-1 px-1 rounded-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out `}>
                            <IoSearch  className='size-5'/>
                            <span className={`${isOpen ? 'flex' : 'hidden'} text-sm`}>
                                Find ticket
                            </span>
                           
                            
                        </li>
                        {/* <li>Edit Event</li>
                        <li>find ticket</li> */}
                    </ul>
                </div>
            </motion.aside>

            {/* main content area and navbar */}
            <div className="flex-1 flex flex-col bg-white">
                <nav className='bg-ghostWhite p-3 flex justify-between shadow-md'>
                    <div className='flex gap-5'>
                        <button onClick={() => 
                        setIsOpen(!isOpen)}
                 className='bg-red-00'>
                    {isOpen ? <GoSidebarExpand  
                    className='size-6'/>  
                    : <GoSidebarCollapse 
                    className='size-6'/>}
                </button>
                        <header className='text-lg font-bold'>
                            {activeTab}
                        </header>
                    </div>

                    <div className='bg-gray-0'>
                        <Link>
                            <span
                             className='flex gap-3 justify-center items-center p-1 rounded-md active:bg-blue-300 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out '>
                                Main Site
                                <FaArrowUpRightFromSquare />
                            </span>
                        </Link>
                    </div>
                </nav>

                <main className="flex-1 overflow-y-auto p-2">
                    {renderMainContent()}
                </main>
            </div>

            <Tooltip 
            id="sidebar-tooltip" 
        className="z-50 rounded-md bg-stone-800 px-3 py-1.5 text-xs opacity-100"
        noArrow={false}
      />
        </div>
    )

}