const express = require('express');
const fs = require('fs');

const router = express.Router();

const ATTENDANCE_FILE =
  './data/attendance.json';


// CLOCK IN
router.post('/clock-in', (req, res) => {

  const { userId, userName } = req.body;

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  const attendance = {
    id: Date.now().toString(),
    userId,
    userName,
    date: new Date().toLocaleDateString(),
    clockIn: new Date().toLocaleTimeString(),
    clockOut: '',
    workingHours: '',
    status: 'Working'
  };

  records.push(attendance);

  fs.writeFileSync(
    ATTENDANCE_FILE,
    JSON.stringify(records, null, 2)
  );

  res.json(attendance);
});


// CLOCK OUT
router.post('/clock-out', (req, res) => {

  const { attendanceId } = req.body;

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  const updatedRecords = records.map(record => {

    if (record.id === attendanceId) {

      const clockOutTime =
        new Date();

      record.clockOut =
        clockOutTime.toLocaleTimeString();

      // Calculate Working Hours
      const clockInTime = new Date(
        `${record.date} ${record.clockIn}`
      );

      const diffMs =
        clockOutTime - clockInTime;

      const workingHours =
        (diffMs / (1000 * 60 * 60))
        .toFixed(2);

      record.workingHours =
        `${workingHours} hrs`;

      record.status = 'Completed';
    }

    return record;
  });

  fs.writeFileSync(
    ATTENDANCE_FILE,
    JSON.stringify(updatedRecords, null, 2)
  );

  res.json({
    message: 'Clocked Out'
  });
});


// UPDATE STATUS
router.post('/update-status', (req, res) => {

  const { attendanceId, status } = req.body;

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  const updatedRecords = records.map(record => {

    if (record.id === attendanceId) {
      record.status = status;
    }

    return record;
  });

  fs.writeFileSync(
    ATTENDANCE_FILE,
    JSON.stringify(updatedRecords, null, 2)
  );

  res.json({
    message: 'Status Updated'
  });
});


// GET ALL RECORDS
router.get('/all', (req, res) => {

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  res.json(records);
});

module.exports = router;