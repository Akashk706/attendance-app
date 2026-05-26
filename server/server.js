const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.send('Attendance Server Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});