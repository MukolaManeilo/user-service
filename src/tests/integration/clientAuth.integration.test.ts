import request from 'supertest';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from '../../app'; // Ваш Express додаток
import Client from '../../models/client';
import connectDB from '../../config/mongoDB';
import categorySeeder from "../../config/categorySeeder";
import categories from "../../config/categories";
import Category, {ICategory} from "../../models/category";
import errorHandler from "../../utils/errorHandler";
import {StartUpError} from "../../types/errorTypes";
import Redis from "ioredis";

dotenv.config();

const redisClient = new Redis({
	host: String(process.env.REDIS_HOST) || 'localhost',
	port: Number(process.env.REDIS_PORT) || 6379,
});

describe('Auth API Integration Tests', () => {
	let cookie: string;

	beforeAll(() => {
		const dbUri = String(process.env.TESTING_DB_URI);
		connectDB(dbUri);
		categorySeeder(categories as ICategory[])
			.catch((err) => errorHandler(new StartUpError(err.message)));
	});

	afterAll(async () => {
		await Client.deleteMany({});
		await Category.deleteMany({});
		await mongoose.connection.close();

		await redisClient.flushdb();
		redisClient.disconnect();
	});

	describe('Register, Login, and Logout', () => {
		it('should register a new client', async () => {
			const response = await request(app)
				.post('/auth/register')
				.send({
					userRole: 'Client',
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.doe@example.com',
					password: 'password123',
				});

			expect(response.status).toBe(201);
			expect(response.body.message).toBe('Client registered and logged in successfully');
		});

		it('should log in the registered client', async () => {
			const response = await request(app)
				.post('/auth/login')
				.send({
					email: 'john.doe@example.com',
					password: 'password123',
				});

			expect(response.status).toBe(200);
			expect(response.body.message).toBe('User successfully logged in');
			expect(response.body.client.email).toBe('john.doe@example.com');
			cookie = response.headers['set-cookie'];
		});

		it('should log out the logged-in client', async () => {
			const response = await request(app)
				.post('/auth/logout')
				.set('Cookie', cookie);

			expect(response.status).toBe(302);
		});

		it('should not log out if no user is logged in', async () => {
			const response = await request(app)
				.post('/auth/logout');

			expect(response.status).toBe(400);
			expect(response.body.message).toContain('User is not logged in');
		});
	});
});
