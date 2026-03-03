import Redis from 'ioredis';

if (!process.env.CONNECTION_URL_REDIS) {
  throw new Error('Invalid/Missing environment variable: "CONNECTION_URL_REDIS"');
}

const redis = new Redis(process.env.CONNECTION_URL_REDIS);

export default redis;
