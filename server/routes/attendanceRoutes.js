const express = require('express');
const fs = require('fs');

const router = express.Router();

const ATTENDANCE_FILE =
  './data/attendance.json';

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
    status: 'Working'
  };

  records.push(attendance);

  fs.writeFileSync(
    ATTENDANCE_FILE,
    JSON.stringify(records, null, 2)
  );

  res.json(attendance);
});

router.post('/clock-out', (req, res) => {

  const { attendanceId } = req.body;

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  const updatedRecords = records.map(record => {

    if (record.id === attendanceId) {
      record.clockOut =
        new Date().toLocaleTimeString();
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

router.get('/all', (req, res) => {

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  res.json(records);
});

module.exports = router;