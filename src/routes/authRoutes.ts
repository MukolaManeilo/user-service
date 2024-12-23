import {Router} from 'express';
import passport from 'passport';
import {loginUser, logoutUser, registerUser} from '../controllers/authController';

const router = Router();


router.post('/register', registerUser);


router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), loginUser);


router.get('/logout', logoutUser);

export default router;
