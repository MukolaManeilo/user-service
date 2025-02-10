import app from './app';
import connectDB from './config/mongoDB';
import categorySeeder from './config/categorySeeder';
import categories from './config/categories';
import { ICategory } from './models/category';
import { errorHandler } from './utils/errorHandler';

const startUpDB = async () => {
	await connectDB();
	await categorySeeder(categories as ICategory[]).catch((err) => errorHandler(err));
};

startUpDB();
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
