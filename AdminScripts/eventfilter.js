import event from "../models/event.js"
import FilteredEvent from "../models/filteredevents.js"
import mongoose from "mongoose";


export async function FilterEvent(){
    const queryevent= await event.find().exec()

    for (let i = 0; i < queryevent.length; i++) {
        if (queryevent[i].status=="Approved"){
            
            const dublitest=await FilteredEvent.find({_id: queryevent[i]._id}).exec()
            
            if(dublitest==0){
                
                FilteredEvent.insertMany(queryevent[i])
            
            }
        }
    }
}
