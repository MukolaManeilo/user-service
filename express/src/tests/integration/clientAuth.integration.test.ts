import request from 'supertest';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from '../../app';
import Client from '../../models/client';
import connectDB from '../../config/mongoDB';
import categorySeeder from '../../config/categorySeeder';
import categories from '../../config/categories';
import Category, { ICategory } from '../../models/category';
import { errorHandler } from '../../utils/errorHandler';
import Redis from 'ioredis';
import { EnvironmentVariableError } from '../../types/errorTypes';

dotenv.config();

const redisURL = process.env.REDIS_URL;
if (!redisURL) errorHandler(new EnvironmentVariableError('REDIS_URL is not defined in .env file'));

const redisClient = new Redis(redisURL as string);

describe('Auth API Integration Tests', () => {
	let cookie: string;

	beforeAll(async () => {
		const dbUri = String(process.env.TESTING_MONGODB_URI);
		await connectDB(dbUri);
		await categorySeeder(categories as ICategory[]).catch((err) => errorHandler(err));
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
			const response = await request(app).post('/auth/register').send({
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
			const response = await request(app).post('/auth/login').send({
				email: 'john.doe@example.com',
				password: 'password123',
			});

			expect(response.status).toBe(200);
			expect(response.body.message).toBe('User successfully logged in');
			expect(response.body.client.email).toBe('john.doe@example.com');
			expect(response.body.client.rating.scores).toBe(910);
			cookie = response.headers['set-cookie'];
		});

		it('should log out the logged-in client', async () => {
			const response = await request(app).post('/auth/logout').set('Cookie', cookie);

			expect(response.status).toBe(302);
		});

		it('should not log out if no user is logged in', async () => {
			const response = await request(app).post('/auth/logout');

			expect(response.status).toBe(401);
			expect(response.body.message).toContain('Logout error: Unauthorized access');
		});
	});
});
