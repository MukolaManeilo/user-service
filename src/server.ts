import app from './app';
import connectDB from "./config/mongoDB";
import categorySeeder from "./config/categorySeeder";
import categories from "./config/categories";
import {ICategory} from "./models/category";
import errorHandler from "./utils/errorHandler";
import {StartUpError} from "./types/errorTypes";

connectDB();
categorySeeder(categories as ICategory[])
	.catch((err) => errorHandler(new StartUpError(err.message)));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
