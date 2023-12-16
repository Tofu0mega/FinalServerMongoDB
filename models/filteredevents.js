import mongoose from 'mongoose';

const filteredsocialSchema = new mongoose.Schema({
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
    website: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    youtube: {
        type: String,
    },
    github: {
        type: String,
    },
    discord: {
        type: String,
    },
});

const filteredeventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    start_date: {
        type: Date,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    social_links: [
        filteredsocialSchema
    ],
    location: {
        type: String,
    },
    banner: {
        type: String,
    },
    price: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
    },
    tags: {
        type: [String],
    },
    status: {
        type: String,
        enum: ['Upcoming','Ongoing','finished'],
        default: 'Upcoming'
    },
    colleges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }],

    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    }],
    organizers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer'
    }],
});

const FilteredEvent = mongoose.model('FilteredEvent', filteredeventSchema);

export default FilteredEvent;
