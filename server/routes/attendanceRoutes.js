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