import express from 'express';
import * as clubs from '../controllers/clubs.js';

const router = express.Router();

// Routes for /clubss
router.get('/', clubs.getclubs);
router.post('/', clubs.createclubs);

// Routes for /clubss/:clubsId
router.get('/:clubsId', clubs.getclubsById);
router.put('/:clubsId', clubs.updateclubs);
router.delete('/:clubsId', clubs.deleteclubs);

// Routes for payments
//router.post('/:clubsId/payments', clubs.createPayment);

export default router;
