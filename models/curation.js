const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    benefit: {
        type: String,
        required: false,
    },
    selected: {
        type:Boolean,
        required: false,
    },
    chosen: {
        type:Boolean,
        required: false,
    },
    image :{
        type:String,
        required: false,
    },
    description :{
        type:String,
        required: false,
    },
    title :{
        type:String,
        required: false,
    }
});

// Curation Schema
const curationSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to Title model
        ref: 'Title',  // This references the Title collection
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to Title model
        ref: 'User'  // This references the Title collection
    },
    name: {
        type: String,
        required: true,
    },
    posts: [postSchema],  // An array of posts
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the model
const Curation = mongoose.model('Curation', curationSchema);

module.exports = Curation;
