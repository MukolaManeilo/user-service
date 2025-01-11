import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB'
import sessionMiddleware from './config/session';
import categorySeeder from './config/categorySeeder';
import authRoutes from './routes/authRoutes';
import passport from './middleware/passport';
import errorHandlerMiddleware from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import categories from "./config/categories";
import {ICategory} from "./models/category";
import errorHandler from "./utils/errorHandler";
import {StartUpError} from "./types/errorTypes";

dotenv.config();

connectDB();
categorySeeder(categories as ICategory[])
    .catch((err) => errorHandler(new StartUpError(err.message)));

const app = express();
const PORT = Number(process.env.PORT) || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
