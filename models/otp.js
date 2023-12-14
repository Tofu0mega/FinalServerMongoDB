import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"users"
    },
    otp: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps:true
  }
  );
  
export const OTP = mongoose.model('OTP', otpSchema);