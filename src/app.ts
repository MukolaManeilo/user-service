import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB'
import sessionMiddleware from './config/session';
import categorySeeder from './config/categorySeeder';
import authRoutes from './routes/authRoutes';
import passport from './middleware/passport';
import errorHandler from "./middleware/errorHandler";

dotenv.config();
connectDB();
categorySeeder();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the app!',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
