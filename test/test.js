import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
dotenv.config();
const app = express();

const uri =process.env.LOCAL_MONGODB_URI

console.log(uri)
