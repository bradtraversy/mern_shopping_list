import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';

// routes
import authRoutes from './routes/api/auth';
import registrationRoutes from './routes/api/registrations';
import { createIntialAdmin } from './helpers/initiateDb';

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    user: MONGO_DB_NAME,
    pass: MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('MongoDB Connected...')
    // Adding new user
    await createIntialAdmin()
  })
  .catch(err => console.log(err));

// Use Routes
app.use('/api/registrations', registrationRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

export default app;
