import dotenv from 'dotenv';
//import Stripe from 'stripe';
import Event from '../models/event.js';

import FilteredEvent from '../models/filteredevents.js';
import College from '../models/college.js';
import { uploadImage } from '../config/cloudinary.js';
import sendmailverify from '../AdminScripts/sendmailverify.js'
import Clubs from '../models/club.js';
import {FilterEvent} from "../AdminScripts/eventfilter.js"
dotenv.config();

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get all events
export async function getEvents(req, res) {
    try {
        //Filteredevent keeps all active Events Only
        FilterEvent();
        const events = await Event.find({status:"Approved"});
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Get a single event by ID
export async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Create a new event
export async function createEvent(req, res) {
 
    try {
        const clubofuser= await Clubs.find({associateduser:req.user.id})
        if(!clubofuser){
            res.status(500).json({ error: 'Not a Associated User' });

        }

        // Upload the banner image to cloudinary and get the URL
        const banner_link = await uploadImage(req.body.banner);
        
        const event = new Event({
            name: req.body.name,
            start_date: req.body.date,
            description: req.body.description,
            start_time: req.body.startTime,
            end_time: req.body.endTime,
            location: req.body.location,
            banner: banner_link,
            colleges: req.body.college,
            social_links: req.body.socialLinks,
            category: req.body.category,
            tags: req.body.tags,
            organizers:req.user.id

        });
        await event.save();

        // Update the college's events array
        await College.findByIdAndUpdate(req.body.college, {
            $push: { events: event._id }
        });
        const emailquery=await Clubs.findOne({associateduser:req.user.id}).exec()
        const email=emailquery.HODemail
        const clubname=emailquery.name
        sendmailverify(email,clubname,banner_link,req)


        res.status(201).json(event);

    } catch (err) {
        
        res.status(500).json({ error: 'Server error' });
    }
}


// Update an existing event
export async function updateEvent(req, res) {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.eventId,
            {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description,
                resources: req.body.resources,
                college: req.body.college,
            },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Delete an existing event
export async function deleteEvent(req, res) {
    try {
        const event = await findByIdAndDelete(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function createBooking(req, res) {
    try {
       
        
        const event = await Event.findById(req.body.eventId);
        
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        await Event.findByIdAndUpdate(req.body.eventId, {
            $push: { participants: req.user.id }
        })

       
        res.status(200).json({ message: 'Participants Added Successfully' });
    }   
        
     catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

/*
export async function createPayment(req, res) {
    try {
        const event = await Event.findById(req.body.eventId);
        console.log(event);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: event.name,
                        },
                        unit_amount: event.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/events/${event._id}/success`,
            cancel_url: `${process.env.CLIENT_URL}/events/${event._id}/cancel`,
        });

        res.status(200).json({ id: session.id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
*/