// Backend Performance Middleware

// Cache middleware for static data
export const cacheMiddleware = (duration = 300) => { // 5 minutes default
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Set cache headers
    res.set({
      'Cache-Control': `public, max-age=${duration}`,
      'ETag': `"${Date.now()}"`,
      'Last-Modified': new Date().toUTCString()
    });
    
    next();
  };
};

// Database query optimization middleware
export const dbOptimizationMiddleware = (req, res, next) => {
  // Add query optimization hints
  req.dbOptions = {
    lean: true, // Return plain objects instead of Mongoose documents
    limit: req.query.limit ? parseInt(req.query.limit) : 100,
    sort: req.query.sort || { createdAt: -1 }
  };
  
  next();
};

// Response time tracking
export const responseTimeMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
    
    // Log slow queries
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  
  next();
};

// Memory usage optimization
export const memoryOptimizationMiddleware = (req, res, next) => {
  // Clean up large request bodies after processing
  res.on('finish', () => {
    if (req.body && typeof req.body === 'object') {
      req.body = null;
    }
  });
  
  next();
};

// Error handling optimization
export const optimizedErrorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};

// Request rate limiting (simple implementation)
const requestCounts = new Map();
export const rateLimitMiddleware = (maxRequests = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    // Clean old entries
    for (const [id, data] of requestCounts.entries()) {
      if (now - data.resetTime > windowMs) {
        requestCounts.delete(id);
      }
    }
    
    // Check current client
    const clientData = requestCounts.get(clientId) || { count: 0, resetTime: now };
    
    if (now - clientData.resetTime > windowMs) {
      clientData.count = 0;
      clientData.resetTime = now;
    }
    
    clientData.count++;
    requestCounts.set(clientId, clientData);
    
    if (clientData.count > maxRequests) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    
    next();
  };
};

// Export all middleware as a bundle
export const performanceMiddleware = {
  cache: cacheMiddleware,
  dbOptimization: dbOptimizationMiddleware,
  responseTime: responseTimeMiddleware,
  memoryOptimization: memoryOptimizationMiddleware,
  errorHandler: optimizedErrorHandler,
  rateLimit: rateLimitMiddleware
};