import mongoose from "mongoose";
import colleges_data from "./datasets/Kucollegedataset.js";
import club_data from "./datasets/KUClubDataRefines.js"

import College from "./models/college.js";
import Event from "./models/event.js";
import Clubs from "./models/club.js";
import Organizer from "./models/organizer.js";
import Participant from "./models/participant.js";
import Resource from "./models/resource.js";
import Category from "./models/category.js";

import dotenv from "dotenv";
dotenv.config();
/*
mongoose.connect(process.env.LOCAL_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
*/
const LOCAL_MONGODB_URI="mongodb://127.0.0.1:27017/KUventsJServer"
mongoose.connect(LOCAL_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
    console.log("Database connected");
    const clubs=await Clubs.insertMany(club_data);
    //const colleges = await College.insertMany(colleges_data);

    console.log("Data seeded");
    mongoose.connection.close();
});
