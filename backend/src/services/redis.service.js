import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const hasRedisUrl = !!process.env.REDIS_URL;
const isProduction = process.env.NODE_ENV === 'production';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// Suppress error logs if Redis is not critical (development without URL)
redisClient.on('error', (err) => {
  if (hasRedisUrl || isProduction) {
    console.error('Redis Client Error:', err.message);
  } else {
    // Silent in dev unless it was explicitly configured
    // This prevents the terminal from being flooded with ECONNREFUSED
  }
});

redisClient.on('connect', () => console.log('✅ Redis Client Connected'));

// Only attempt to connect if REDIS_URL is provided or in production
if (hasRedisUrl || isProduction) {
  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      if (isProduction) {
        console.warn('⚠️ Could not connect to Redis. Falling back to memory storage.');
      } else {
        console.log('ℹ️ Redis connection skipped (development fallback).');
      }
    }
  })();
} else {
  console.log('ℹ️ Redis not configured. Using local memory for caching and rate limiting.');
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
