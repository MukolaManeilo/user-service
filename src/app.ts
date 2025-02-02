import express from 'express';
import sessionMiddleware from './config/session';
import authRoutes from './routes/authRoutes';
import passport from './middleware/passport';
import errorHandlerMiddleware from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import { UserUnion } from './types/userUnion';

const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.json({ message: 'Hello World', email: (req.user as UserUnion)?.email });
});
app.use(errorHandlerMiddleware);

export default app;
