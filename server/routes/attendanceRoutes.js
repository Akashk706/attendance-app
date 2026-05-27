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



  const attendance = {

    id: Date.now().toString(),

    userId,

    userName,

    todayStatus,

    feeling,

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