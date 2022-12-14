import express from 'express'; // importing express

// post also imported
import {signin, signup} from '../controllers/user.js'; 
// importing handler for the get method of the post router

// Creating router for the express server
// Router method is used.
const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);


export default router;