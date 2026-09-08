import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../../components/Input';
import MiniLoading from '../../../components/admin-components/MiniLoading'
// import { toast } from 'sonner';

export default function CreateTicketsArea() {

  const [events, setEvents] = useState([]);
  const [bulkData, setBulkData] = useState({
    eventId: '',
    ticketType: 'regular',
    groupName: '',
    quantity: 5
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/all-events`);
        setEvents(response.data);
      } catch (error) {
        console.log('Error when fetching events: ', error);
      }
    };

    fetchEvents();
  }, [API_URL]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBulkData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!bulkData.eventId || !bulkData.groupName || bulkData.quantity < 1) {
      return;
    }

    setIsGenerating(true);
    setGeneratedTickets([]);

    try {
      const response = await axios.post(`${API_URL}/admin/create-bulk-tickets`, {
        bulkInfo: bulkData
      });

      // Expecting array of tickets from backend: [{ name: 'VIP Guest #1', pdfUrl: 'https://...' }]
      if (response.data.tickets) {
        setGeneratedTickets(response.data.tickets);
      }

      setLoading(false);
    } catch (error) {
      console.error('Bulk Ticket Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    // toast.success('Link copied to clipboard!');
  };

  const handleDirectDownload = async (pdfUrl, fileName) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'ticket.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      window.open(pdfUrl, '_blank');
    }
  };


  if(loading) {
    <MiniLoading />
  }

  return (
    <div className="w-full mt-5 p-3 flex flex-col md:flex-row justify-center items-start gap-10">
      {/* Form Section */}
      <form 
        onSubmit={handleBulkSubmit}
        className="md:w-1/2 lg:w-110 w-9/10 p-3 flex items-center justify-center bg-blue-200 shadow-md rounded-sm mb-5"
      >
        <div className="flex flex-col justify-center items-center gap-5 w-9/10 pb-10 pt-5">
          <Input 
            label="Name / Group Prefix"
            type="text"
            placeholder="e.g. VIP Guest"
            value={bulkData.groupName}
            onChange={handleFormChange}
            name="groupName"
          />

          <Input 
            label="Quantity"
            type="number"
            placeholder="10"
            value={bulkData.quantity}
            onChange={handleFormChange}
            name="quantity"
          />

          <label className="text-white font-bold self-start pl-1">
            Ticket Type
          </label>
          <select 
            name="ticketType" 
            className="bg-white px-2 rounded-md shadow-md text-gray-700 py-1 w-full" 
            value={bulkData.ticketType} 
            onChange={handleFormChange}
          >
            <option value="vip">VIP</option>
            <option value="regular">Standard</option>
          </select>

          <label className="text-white font-bold self-start pl-1">
            Choose an Event
          </label>
          <select 
            name="eventId" 
            className="bg-white px-2 text-gray-700 rounded-md shadow-md py-1 w-full" 
            value={bulkData.eventId} 
            onChange={handleFormChange}
          >
            <option value="" disabled>Select an event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>

          <button 
            type="submit" 
            disabled={isGenerating}
            className="mt-3 bg-ghostWhite px-6 py-2 rounded-lg font-bold shadow-md text-gray-800 active:scale-85 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            {isGenerating ? 'Generating...' : 'Create Tickets'}
          </button>
        </div>
      </form>

      {/* Generated Preview Grid / Container */}
      {generatedTickets.length > 0 && (
        <div className="w-full md:w-1/2 flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
          <h3 className="font-bold text-gray-700 text-lg">Generated Tickets ({generatedTickets.length})</h3>

          {generatedTickets.map((ticket, index) => (
            <div 
              key={index} 
              className="bg-ghostWhite shadow-md w-full flex flex-col justify-center items-center gap-3 p-4 rounded-sm border border-gray-100"
            >
              <span className="font-bold text-gray-800 self-start">{ticket.name}</span>

              {/* Mini Iframe Preview */}
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100 border">
                <iframe 
                  src={`${ticket.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  title={`Ticket Preview ${index}`}
                  className="w-full h-full border-none pointer-events-none"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                <button 
                  type="button"
                  onClick={() => copyToClipboard(ticket.pdfUrl)}  
                  className="bg-blue-300 font-bold text-white px-3 py-1 text-xs rounded-xl active:scale-85 hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  Copy Link
                </button>

                <a
                  href={ticket.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-300 font-bold text-white px-3 py-1 text-xs rounded-xl active:scale-85 hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  Open PDF
                </a>

                <button
                  type="button"
                  onClick={() => handleDirectDownload(ticket.pdfUrl, `${ticket.name}.pdf`)}
                  className="bg-blue-300 font-bold text-white px-3 py-1 text-xs rounded-xl active:scale-85 hover:bg-blue-200 transition-all duration-300 ease-in-out"
                >
                  Download Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}