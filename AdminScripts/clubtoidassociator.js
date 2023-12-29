import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/KUventsJServer', { useNewUrlParser: true, useUnifiedTopology: true });
import Clubs from "../models/club.js"
import Users from "../models/user.js"

export async function clubassign(clubtofill){

const userquery = await Users.findOne({name:clubtofill}).exec()

const targetclub=await Clubs.findOne({name:clubtofill}).exec()
console.log(targetclub.name)
const finalquery=await Clubs.findByIdAndUpdate(targetclub._id,{
    associateduser:userquery._id
})
}
