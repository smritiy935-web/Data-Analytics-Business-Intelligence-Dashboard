require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Validate environment variables
const criticalEnv = ['MONGO_URI', 'JWT_SECRET'];
const corsEnv = ['FRONTEND_URL'];

criticalEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error(`❌ CRITICAL ERROR: ${env} is not defined. Server cannot start without it.`);
    process.exit(1);
  }
});

corsEnv.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`⚠️ WARNING: ${env} is not defined. Using default localhost origins for CORS.`);
  }
});

const app = express();
const server = http.createServer(app);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

// Apply Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
  }
  next();
});

// Socket.io Configuration
const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
  transports: ['websocket', 'polling'],
});

// Connect to Database
connectDB();

// Pass io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running', timestamp: new Date() });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('Socket Connected:', socket.id);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
🚀 Server initialized!
📡 Mode: ${process.env.NODE_ENV || 'development'}
🔌 Port: ${PORT}
🌍 Frontend URL: ${process.env.FRONTEND_URL}
  `);
});
