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

    console.log('route hit');
    
    const {title, description, date, time, image, location, totalTickets, vipPrice, regularPrice} = req.body;
    // const {newEvent} = req.body;

    const newEvent  = {
        title: title,
        description: description,
        location: location,
        time: time,
        event_date: date,
        image: image,
        total_tickets: totalTickets,
        vip_price: vipPrice,
        regular_price: regularPrice
    };
    
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
    
});

router.get('/scanned-tickets/:eventId', async (req, res) => {
    // event id
    const {eventId} = req.params;
    console.log(eventId);
    console.log('route hit');

    
   
    try {
        const { data, error } = await supabase
            .from('tickets')
            .select('*') // Or specify columns: 'id, holder_name, scanned_at'
            .eq('event_id', eventId)
            .eq('is_scanned', true); // Filters for only the scanned ones


            console.log(data);
            if(error) {
                console.log('error when trying to fetch scanned tickets', error);
                
            }
            
            res.status(200).json({message: 'fetch ok', ticketsData: data});

    } catch (error) {
        
    }

})

router.get('/retrieve-event/:id', async (req, res) => {
    console.log('route hit');
    
    const {id} = req.params;
    console.log(id);

    try {
       const {data, error} = await supabase.from('events').select('*').eq('id', id);

        if(error) {
            console.log('error when admin tries to fetch event for editing: ', error);
        };

        console.log(data);
        
        res.status(200).json(data[0]);

    } catch (error) {
        console.log('error when trying to fetch event for editing');
        res.status(500).json({message: 'error when fetching event for editing'})
    };

});

router.patch('/edit-event/:eventId', async (req, res) => {

    console.log('editing route hit');

    const {eventId} = req.params;
    
    const {updatedEvent} = req.body;

    console.log(eventId);

    console.log(updatedEvent);
    
    

    
   try {

        const { data, error } = await supabase
        .from('events')
        .update({
            title: updatedEvent.title,
            event_date: updatedEvent.event_date,
            time: updatedEvent.time,
            location: updatedEvent.location,
            image: updatedEvent.image,
            total_tickets: updatedEvent.total_tickets,
            regular_price:updatedEvent.regular_price,
            vip_price: updatedEvent.vip_price,
            description: updatedEvent.description
        })
        .eq('id', eventId)      // Critical: Only update the row matching this ID
        .select();       // Returns the updated record

        if (error) throw error;
        console.log(data);
        

        res.status(200).json(data);
    
   } catch (error) {
    res.status(500).json({ error: error.message });
    
   }



})

router.delete('/delete-event/:eventId', async (req, res) => {
    const {eventId} = req.params;
    console.log(eventId);
    try {
        // get the image first, to know which row to delete from the bucket
        const { data: event } = await supabase
        .from('events')
        .select('image')
        .eq('id', eventId)
        .single();

        
        // delete the event from the table
        const { error: dbError } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

        if (dbError) throw dbError;

        // delete the image from the bucket 
        if (event?.image) {
            const fileName = event.image.split('/').pop(); // Extracts filename from URL
            console.log(fileName);
            await supabase.storage
            .from('events_images')
            .remove([fileName]);

        }

        res.status(200).json({message: 'Deleted'});


    } catch (error) {
        
    }

    

})


export default router;