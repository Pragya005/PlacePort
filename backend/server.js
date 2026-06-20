require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/company', require('./routes/company'));
app.use('/api/jobs', require('./routes/jobs'));

app.get('/', (req, res) => res.json({ message: 'Placement Portal API Running' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));