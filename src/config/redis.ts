import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv';
import { errorHandler } from '../utils/errorHandler';
import { EnvironmentVariableError } from '../types/errorTypes';

dotenv.config();

const redisURL = process.env.REDIS_URL;
if (!redisURL) errorHandler(new EnvironmentVariableError('REDIS_URL is not defined in .env file'));

const redisClient = new Redis(redisURL as string);
const redisStore = new RedisStore({
	client: redisClient,
	prefix: 'ssp:',
	ttl: 3600,
});

export { redisClient, redisStore };
