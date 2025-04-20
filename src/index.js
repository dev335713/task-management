require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const rateLimiter = require('./middleware/rateLimiter');
const tokenValidater = require('./middleware/auth');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const statsRoutes = require('./routes/statsRoutes');
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const setupSwaggerDocs = require('./config/swagger');
app.use(rateLimiter);
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tokenValidater, taskRoutes);
app.use('/api/projects', tokenValidater, projectRoutes);
app.use('/api/stats', tokenValidater, statsRoutes);
app.use('/api/profile', tokenValidater, profileRoutes);
setupSwaggerDocs(app);

app.get('/', (req, res) => res.send('Task Manager API'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
