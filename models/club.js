import mongoose from "mongoose";


const clubSchema = new mongoose.Schema({
    name: String,
    Acronym: String,
    Department: String,
    College:String,
    Email: String,
    logoUrl: String,
    imgUrl: String,
    
});

const Clubs = mongoose.model("Clubs", clubSchema);

export default Clubs;
