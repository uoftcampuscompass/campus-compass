import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    startDate:{
        type:String,
        required: true
    },
    startTime:{
        type: String,
        required: true
    },
    endDate:{
        type:String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    allDay:{
        type: Boolean,
        required: true
    },
    imageUrls:{
        type: Array,
        // required: true
    },
    isFlagged:{
        type: Boolean,
        default: false
    },
    flaggedReason: {
        type: String,
        default:'',
    },
    flaggedByID: {
        type: String,
        default:'',
    },
    flaggedByName: {
        type: String,
        default:'',
    },
    flaggedByEmailID: {
        type: String,
        default:'',
    },
    userRef:{
        type: String,
        required: true
    }
},{ timestamps:true });

const Event = mongoose.model('Event', eventSchema);

export default Event;