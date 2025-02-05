//event.model.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    tickets: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
    },
    });

export default mongoose.model("Event", eventSchema);
