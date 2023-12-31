import mongoose from "mongoose";

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
