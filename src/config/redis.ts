import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis({
	host: String(process.env.REDIS_HOST) || 'localhost',
	port: Number(process.env.REDIS_PORT) || 6379,
});
const redisStore = new RedisStore({
	client: redisClient,
	prefix: 'ssp:',
	ttl: Number(process.env.REDIS_TTL) || 3600,
});


export { redisClient, redisStore };
