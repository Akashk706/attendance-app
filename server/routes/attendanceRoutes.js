const express = require('express');
const fs = require('fs');

const router = express.Router();

const ATTENDANCE_FILE =
  './data/attendance.json';





// CLOCK IN
router.post('/clock-in', (req, res) => {

  const {
    userId,
    userName,
    todayStatus,
    feeling
  } = req.body;



  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );



  // CHECK IF ALREADY WORKING
  const alreadyWorking = records.find(
    item =>
      item.userId === userId &&
      item.status === "Working"
  );



  if (alreadyWorking) {

    return res.json({
      message: "Already Clocked In"
    });
  }



  const currentTime = new Date();



  const attendance = {

    id: Date.now().toString(),

    userId,

    userName,

    todayStatus,

    feeling,

    date: currentTime.toLocaleDateString(),

    clockIn:
      currentTime.toLocaleTimeString(),

    clockInTimestamp:
      currentTime.getTime(),

    clockOut: '',

    clockOutTimestamp: '',

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

      const currentTime = new Date();



      record.clockOut =
        currentTime.toLocaleTimeString();



      record.clockOutTimestamp =
        currentTime.getTime();




      // CALCULATE WORKING HOURS
      const diffMs =

        record.clockOutTimestamp -

        record.clockInTimestamp;




      const workingHours =

        (diffMs / (1000 * 60 * 60))
        .toFixed(2);




      record.workingHours =
        `${workingHours} hrs`;





      // STATUS LOGIC
      if (workingHours >= 8) {

        record.status = 'Completed';

      } else if (workingHours >= 4) {

        record.status = 'Half Day';

      } else {

        record.status = 'Not Working';
      }

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

  const {
    attendanceId,
    status
  } = req.body;



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








// GET ALL ATTENDANCE
router.get('/all', (req, res) => {

  const records = JSON.parse(
    fs.readFileSync(ATTENDANCE_FILE)
  );

  res.json(records);

});





module.exports = router;