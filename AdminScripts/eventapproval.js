import event from "../models/event.js"
import FilteredEvent from "../models/filteredevents.js"
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/KUventsJServer', { useNewUrlParser: true, useUnifiedTopology: true });
export async function approveevent(approvedevent){
    const query= await event.findOne({name:approvedevent}).exec()
    const query2= await  event.findByIdAndUpdate(
        query._id,
        {
            status:"Approved"
        },
        { new: true }
    );
    process.exit();
}
approveevent("Workshop On ML")
