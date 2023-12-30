import mongoose from "mongoose";


const clubSchema = new mongoose.Schema({
    name: String,
    Acronym: String,
    Department: String,
    location: String,
    link:String,
    description:String,
    College:String,
    Email: String,
    logoUrl: String,
    imgUrl: String,
    HODemail:String,
    associateduser:   
        {type:mongoose.Schema.Types.ObjectId,
            ref: "Users",
        
        }
    
});

const Clubs = mongoose.model("Clubs", clubSchema);

export default Clubs;
