import { Router } from "express";
// Add routes
// Import routes
import college from './routes/college.js';
import event from './routes/event.js';
import organizer from './routes/organizer.js';
import participant from './routes/participant.js';
import resource from './routes/resource.js';
import user from './routes/user.js';
import category from './routes/category.js';
import auth from './routes/auth.js';
import subscriber from './routes/subscriber.js';
import task from './routes/task.js';
import clubs from "./routes/clubs.js"
const router=Router()

router.use('/users', user);
router.use('/users', task);

router.use('/colleges', college);
router.use('/events', event);
router.use('/clubs',clubs)

router.use('/organizers', organizer);
router.use('/participants', participant);

router.use('/resources', resource);
router.use('/categories', category);

router.use('/auth', auth);

// Add subscription routes
router.use('/subscriber', subscriber)
export default router