import { Router } from 'express';
import { verifyToken } from '../middleware/tokens.js';

import * as auth from '../controllers/auth.js';

import dotenv from 'dotenv';
import sendmail from '../controllers/sendmail.js';

dotenv.config();

const router = Router();
router.post('/signin', auth.signin);
router.post('/signup', auth.signup);
router.post("/otp", verifyToken,auth.generateAndSendOTP)
router.post('/logout', verifyToken, auth.logout);

export default router;
