import request from 'supertest';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from '../../app';
import Expert from '../../models/expert';
import connectDB from '../../config/mongoDB';
import categorySeeder from "../../config/categorySeeder";
import categories from "../../config/categories";
import Category, {ICategory} from "../../models/category";
import {errorHandler} from "../../utils/errorHandler";
import Redis from "ioredis";

dotenv.config();

const redisClient = new Redis({
	host: String(process.env.REDIS_HOST) || 'localhost',
	port: Number(process.env.REDIS_PORT) || 6379,
});

describe('Auth API Integration Tests', () => {
	let cookie: string;

	beforeAll(async () => {
		const dbUri = String(process.env.TESTING_DB_URI);
		await connectDB(dbUri);
		await categorySeeder(categories as ICategory[])
			.catch((err) => errorHandler(err));
	});


	afterAll(async () => {
		await Expert.deleteMany({});
		await Category.deleteMany({});
		await mongoose.connection.close();

		await redisClient.flushdb();
		redisClient.disconnect();
	});


	describe('Register, Login, and Logout', () => {
		it('should register a new expert', async () => {
			const response = await request(app)
				.post('/auth/register')
				.send({
					userRole: 'Expert',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					password: 'password123',
					mentoring: 'true',
					skills: ['JavaScript', 'Node.js'],
				});

			expect(response.status).toBe(201);
			expect(response.body.message).toBe('Expert registered and logged in successfully');
		});


		it('should log in the registered expert', async () => {
			const response = await request(app)
				.post('/auth/login')
				.send({
					email: 'john.doe@example.com',
					password: 'password123',
				});

			expect(response.status).toBe(200);
			expect(response.body.message).toBe('User successfully logged in');
			expect(response.body.expert.email).toBe('john.doe@example.com');
			expect(response.body.expert.rating.scores).toBe(910);
			cookie = response.headers['set-cookie'];
		});


		it('should log out the logged-in expert', async () => {
			const response = await request(app)
				.post('/auth/logout')
				.set('Cookie', cookie);

			expect(response.status).toBe(302);
		});


		it('should not log out if no user is logged in', async () => {
			const response = await request(app)
				.post('/auth/logout');

			expect(response.status).toBe(401);
			expect(response.body.message).toContain('Logout error: Unauthorized access');
		});
	});
});
