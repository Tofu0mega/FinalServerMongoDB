import express from 'express';
import * as search from '../controllers/search.js';

const router = express.Router();

// Routes for /resources
router.get('/', search.searchedevents);

export default router;