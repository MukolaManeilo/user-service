import session from 'express-session';
import { redisStore } from './redis';
import dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
	store: redisStore,
	secret: String(process.env.SESSION_SECRET),
	resave: false,
	saveUninitialized: false,
});

export default sessionMiddleware;
