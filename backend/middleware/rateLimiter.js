import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "global"; 
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({ 
        success: false, 
        message: "Too many requests, please try again later" 
      });
    }
    next(); 

  } catch (error) {
    console.error("Error in rate limiter middleware:", error.message);
    next(); 
  }
};

export default rateLimiter;