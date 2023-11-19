import mongoose from 'mongoose';
import crypto from 'crypto';

//mongoose.connect('mongodb://localhost/KUventsJServer', { useNewUrlParser: true, useUnifiedTopology: true });

const otpSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  is_synced: {
    type: Boolean,
    default: false,
  },
  salt: {
    type: String,
    required: true,
  },
});

const OTP = mongoose.model('OTP', otpSchema);

export async function generateOTP(userId) {
  try {
    // Assuming you have a User model defined for MongoDB
    const user = await User.findOne({ _id: userId });

    // Checking if the user's email matches the required format
    if (!/^[A-Za-z0-9._%+-]+@ku\.edu\.np$/.test(user.email)) {
      throw new Error('Invalid email format. Use ku.edu.np email address.');
    }

    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const salt = crypto.randomBytes(16).toString('hex');
    const otp = timestamp + random + salt;

    const hashedOTP = customHashFunction(otp);

    const otpRecord = await OTP.create({ user_id: userId, otp: hashedOTP, salt });
    return otpRecord;
  } catch (error) {
    throw new Error('Error generating OTP');
  }
}

export async function authenticateOTP(userId, enteredOTP) {
  try {
    const otpRecord = await OTP.findOne({ user_id: userId, is_synced: false });

    if (!otpRecord) {
      return false; // No unexpired OTP found for the user
    }

    // Generating the hash of the entered OTP using the stored salt
    const hashedEnteredOTP = customHashFunction(enteredOTP + otpRecord.salt);

    if (otpRecord.otp === hashedEnteredOTP) {
      otpRecord.is_synced = true; // Mark the OTP as synchronized
      await otpRecord.save();
      return true; // OTP authentication successful
    } else {
      return false; // Invalid OTP
    }
  } catch (error) {
    throw new Error('Error authenticating OTP');
  }
}

function customHashFunction(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data.toString());
  return hash.digest('hex');
}


// import { Sequelize, DataTypes } from 'sequelize';
// import crypto from 'crypto';

// const sequelize = new Sequelize('KUventsJSdb', 'postgres', 'kuvents', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// const OTP = sequelize.define('OTP', {
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   otp: {
//     type: DataTypes.STRING,
//     allowNull: false, 
//   },
//   is_synced: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
//   salt: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// export async function generateOTP(userId) {
//   try {
//     const user = await User.findByPk(userId);

//     // Checking if the user's email matches the required format
//     if (!/^[A-Za-z0-9._%+-]+@ku\.edu\.np$/.test(user.email)) {
//       throw new Error('Invalid email format. Use ku.edu.np email address.');
//     }

//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 10000);
//     const salt = crypto.randomBytes(16).toString('hex');
//     const otp = timestamp + random + salt;

//     const hashedOTP = customHashFunction(otp);

//     const otpRecord = await OTP.create({ user_id: userId, otp: hashedOTP, salt });
//     return otpRecord;
//   } catch (error) {
//     throw new Error('Error generating OTP');
//   }
// }

// export async function authenticateOTP(userId, enteredOTP) {
//   try {
//     const otpRecord = await OTP.findOne({ where: { user_id: userId, is_synced: false } });

//     if (!otpRecord) {
//       return false; // No unexpired OTP found for the user
//     }

//     // Generating the hash of the entered OTP using the stored salt
//     const hashedEnteredOTP = customHashFunction(enteredOTP + otpRecord.salt);

//     if (otpRecord.otp === hashedEnteredOTP) {
//       otpRecord.is_synced = true; // Mark the OTP as synchronized
//       await otpRecord.save();
//       return true; // OTP authentication successful
//     } else {
//       return false; // Invalid OTP
//     }
//   } catch (error) {
//     throw new Error('Error authenticating OTP');
//   }
// }

// function customHashFunction(data) {

//   const hash = crypto.createHash('sha256');
//   hash.update(data.toString());
//   return hash.digest('hex');
// }