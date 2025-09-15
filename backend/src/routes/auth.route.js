import express from "express";
import { checkAuth, updateProfile, userLogin, userLogout, userSignup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js" 
const router = express.Router();

router.use(arcjetProtection);

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth);


export default router;