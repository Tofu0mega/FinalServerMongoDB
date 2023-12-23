import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as otpAuth from './otp_auth.js';
import sendmail from './sendmail.js';
import e from 'express';

dotenv.config();

export async function signup(req, res) {
    const { email, password, name, isOrganizer, college } = req.body;
    //checking if the email address has the required format or not 
    /*if (!/^[A-Za-z0-9._%+-]+@student\.ku\.edu\.np$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format. Use ku.edu.np email address.' });
    }*/
    try {
        //Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Salt
        const salt = await bcrypt.genSalt();

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creating the user in the database
        const newUser = await User.create({ email, password: hashedPassword, name, isOrganizer, college });

        //Generating a JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

        res.status(201).json({ newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    
 

    //checking if the email address has the required format 
    if (!/^[A-Za-z0-9._%+-]+@student\.ku\.edu\.np$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format. Use ku.edu.np email address.' });
    }

    try {
        //Checking if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        //Checking if the user's email address matches the required format or not
        if (!/^[A-Za-z0-9._%+-]+@student\.ku\.edu\.np$/.test(existingUser.email)) {
            return res.status(400).json({ message: 'Invalid email format. Use ku.edu.np email address.' });
        }


        //Checking if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Generating a JWT token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });


        if (req.cookies) {
            for (const cookieName in req.cookies) {
                res.clearCookie(cookieName);
                // Optionally, you can also set the expired date in the past
                // res.cookie(cookieName, '', { expires: new Date(0) });
              }
        }
       
        res.cookie(String(existingUser._id), token, {
            path: "/",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            httpOnly: true,
            sameSite: "none",
            secure: true
        });

        return res
            .status(200)
            .json({ message: "Successfully Logged In", user: existingUser, token });
    } catch (error) {
       
        res.status(500).json({ message: 'Server error' });
    }
}

export async function logout(req, res, next) {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
    });
};

export async function generateAndSendOTP(req, res) {
   
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
        if(user)
        {
            if (!/^[A-Za-z0-9._%+-]+@student\.ku\.edu\.np$/.test(user.email)) {
                return res.status(400).json({ message: 'Invalid email format. Use ku.edu.np email address.' });
            }
        }
       // Checking if the user's email matches the required format
      
      const otpRecord = await otpAuth.generateOTP(userId);
        const email=req.user.email
        sendmail(email,otpRecord)
      
      //Sending the OTP to the user through the desired communication channel.
  
      res.status(200).json({
        data:otpRecord,
         message: 'OTP generated and sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating and sending OTP' });
    }
  }
  
  export async function authenticateUserWithOTP(req, res) {
    try {
      const userId = req.user.id;
      const enteredOTP = req.body.enteredOTP;
  
      const isAuthSuccessful = await otpAuth.authenticateOTP(userId, enteredOTP);
  
      if (isAuthSuccessful) {
        res.status(200).json({ message: 'OTP authentication successful' });
      } else {
        res.status(400).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error authenticating with OTP' });
    }
  }