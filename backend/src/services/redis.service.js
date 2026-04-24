import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('✅ Redis Client Connected'));

// Only connect if REDIS_URL is provided or in production
if (process.env.REDIS_URL || process.env.NODE_ENV === 'production') {
  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      console.warn('⚠️ Could not connect to Redis. Falling back to memory storage.');
    }
  })();
}

/**
 * Cache data with TTL
 * @param {string} key - Cache key
 * @param {any} value - Value to store
 * @param {number} ttl - Time to live in seconds
 */
export const setCache = async (key, value, ttl = 3600) => {
  if (!redisClient.isReady) return null;
  try {
    const stringValue = JSON.stringify(value);
    await redisClient.setEx(key, ttl, stringValue);
    return true;
  } catch (error) {
    console.error('Redis Set Error:', error);
    return false;
  }
};

/**
 * Get cached data
 * @param {string} key - Cache key
 */
export const getCache = async (key) => {
  if (!redisClient.isReady) return null;
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis Get Error:', error);
    return null;
  }
};

/**
 * Delete cached data
 * @param {string} key - Cache key
 */
export const deleteCache = async (key) => {
  if (!redisClient.isReady) return null;
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Redis Delete Error:', error);
    return false;
  }
};

export default {
  redisClient,
  setCache,
  getCache,
  deleteCache,
};
