import ratelimit from "../config/upstash.js";

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX || 5);
const memoryBuckets = new Map();

const getIdentifier = (req) =>
  req.ip ||
  req.headers["x-forwarded-for"] ||
  req.socket?.remoteAddress ||
  "global";

const checkMemoryRateLimit = (identifier) => {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const bucket = memoryBuckets.get(identifier) || [];
  const recent = bucket.filter((ts) => ts > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    memoryBuckets.set(identifier, recent);
    return false;
  }

  recent.push(now);
  memoryBuckets.set(identifier, recent);
  return true;
};

const rateLimiter = async (req, res, next) => {
  if (process.env.RATE_LIMIT_ENABLED === "false") {
    return next();
  }
  const identifier = getIdentifier(req);

  try {
    let success = true;

    if (ratelimit) {
      const result = await ratelimit.limit(identifier);
      success = result.success;
    } else {
      // Fallback for local/dev when Upstash is unavailable.
      success = checkMemoryRateLimit(identifier);
    }

    if (!success) {
      return res.status(429).json({ 
        success: false, 
        message: "Too many requests, please try again later",
      });
    }
    next();

  } catch (error) {
    console.error("Error in rate limiter middleware:", error.message);
    next();
  }
};

export default rateLimiter;
