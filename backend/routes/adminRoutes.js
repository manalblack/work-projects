import express from 'express'
import { supabase } from '../databaseConnection.js';

import { createTicket } from '../utils/services.js';




const router = express.Router();



router.get('/all-events', async (req, res) => {
    
    try {
        const {data, error} = await supabase.from('events').select('*');

        if(error) {
            return res.status(400).json({message: 'error when fetching events'})
        }

        res.status(200).json(data)

    } catch (error) {
        console.log('error when fetching metrics from database', error)
    }
})

router.post('/add-events', async (req, res) => {

    const {title, description, date, time, image, location, totalTickets, vipPrice, regularPrice} = req.body;
    // const {newEvent} = req.body;

    const newEvent  = {
        title: title,
        description: description,
        location: location,
        time: time,
        date: date,
        image: image,
        total_tickets: totalTickets,
        vip_price: vipPrice,
        regular_price: regularPrice
    }
    
    try {
        const {data, error} = await supabase.from('events').insert([newEvent])
        if(error) throw error;
        
        res.status(200).json({message: 'SUCCESS'});

    } catch (error) {
        console.log('error when creating new event', error);
        res.status(400).json({message: 'Operation failed'});
    }
})

router.get('/find-ticket', async (req, res) => {
    const {query} = req.query;
    console.log('route hit')

    try {
        const {data, error} = await supabase.from('tickets').select('*').or(`customer_name.ilike.%${query}%, customer_email.ilike.%${query}%`);

        if (error) {
            console.log(error);
            
            return res.status(500).json({error: error.message});
        }

        res.json(data)
    } catch (error) {
        
    }
})

router.post('/create-ticket', async (req, res) => {
    
    const {ticketInfo} = req.body;
    const eventId = ticketInfo.eventId

    const {data, error} = await supabase.from('events').select('*').eq('id', eventId);

        if(error){
            console.log('error when admin tries to create a ticket: ', error);
        }

    try {
        const pdfFileLink = await createTicket({
        ticketInfo: ticketInfo,
        eventData: data[0]
        });

        res.status(200).json(pdfFileLink)
    } catch (error) {
        
    }

    console.log(ticketInfo.eventId);
    
})

export default router;