import { useEffect, useState } from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const [attendance, setAttendance] =
    useState([]);

  const [todayStatus, setTodayStatus] =
    useState("");

  const [feeling, setFeeling] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const BACKEND_URL =
    "https://attendance-backend-32mo.onrender.com";





  // FETCH ATTENDANCE
  const fetchAttendance = async () => {

    const res = await axios.get(
      `${BACKEND_URL}/api/attendance/all`
    );

    const userAttendance =
      res.data.filter(
        item => item.userId === user.id
      );

    setAttendance(userAttendance.reverse());
  };





  useEffect(() => {

    fetchAttendance();

    const interval = setInterval(() => {
      fetchAttendance();
    }, 3000);

    return () => clearInterval(interval);

  }, []);






  // CLOCK IN
  const handleClockIn = async () => {

    if (!todayStatus || !feeling) {

      alert(
        "Please select status and feeling"
      );

      return;
    }

    await axios.post(
      `${BACKEND_URL}/api/attendance/clock-in`,
      {
        userId: user.id,
        userName: user.name,
        todayStatus,
        feeling
      }
    );

    fetchAttendance();
  };






  // CLOCK OUT
  const handleClockOut = async (attendanceId) => {

    await axios.post(
      `${BACKEND_URL}/api/attendance/clock-out`,
      {
        attendanceId
      }
    );

    fetchAttendance();
  };






  // BREAK STATUS
  const handleBreak = async () => {

    const workingRecord = attendance.find(
      item => item.status === "Working"
    );

    if (!workingRecord) return;

    await axios.post(
      `${BACKEND_URL}/api/attendance/update-status`,
      {
        attendanceId: workingRecord.id,
        status: "Break"
      }
    );

    fetchAttendance();
  };






  // BACK TO WORK
  const handleResume = async () => {

    const breakRecord = attendance.find(
      item => item.status === "Break"
    );

    if (!breakRecord) return;

    await axios.post(
      `${BACKEND_URL}/api/attendance/update-status`,
      {
        attendanceId: breakRecord.id,
        status: "Working"
      }
    );

    fetchAttendance();
  };






  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };






  const currentWorking =
    attendance.find(
      item =>
        item.status === "Working"
    );

  const currentBreak =
    attendance.find(
      item =>
        item.status === "Break"
    );






  // DASHBOARD CARDS
  const totalHours = attendance.reduce(
    (total, item) => {

      const hrs =
        parseFloat(item.workingHours) || 0;

      return total + hrs;

    },
    0
  );




  const completedDays =
    attendance.filter(
      item =>
        item.status === "Completed"
    ).length;





  // CHART DATA
  const chartData =
    attendance.slice(0, 7).map(item => ({
      date: item.date,
      hours:
        parseFloat(item.workingHours) || 0
    }));







  return (

    <div
      style={{
        padding: "30px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >




      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1>
            Welcome {user?.name}
          </h1>

          <p>
            Employee Dashboard
          </p>

        </div>



        <button
          onClick={handleLogout}
          style={logoutBtn}
        >
          Logout
        </button>

      </div>








      {/* DASHBOARD CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>
          <h2>
            {attendance.length}
          </h2>
          <p>Total Days</p>
        </div>

        <div style={cardStyle}>
          <h2>
            {totalHours.toFixed(1)} hrs
          </h2>
          <p>Total Hours</p>
        </div>

        <div style={cardStyle}>
          <h2>
            {completedDays}
          </h2>
          <p>Completed Days</p>
        </div>

      </div>








      {/* START DAY */}
      {

        !currentWorking &&
        !currentBreak && (

          <div style={sectionStyle}>

            <h3>
              Start Your Day
            </h3>

            <br />



            <select
              value={todayStatus}
              onChange={(e) =>
                setTodayStatus(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option value="">
                Select Work Type
              </option>

              <option>
                Office Work
              </option>

              <option>
                Work From Home
              </option>

              <option>
                Client Meeting
              </option>

            </select>





            <select
              value={feeling}
              onChange={(e) =>
                setFeeling(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option value="">
                Today's Feeling
              </option>

              <option>
                Happy 😊
              </option>

              <option>
                Normal 🙂
              </option>

              <option>
                Tired 😴
              </option>

            </select>





            <button
              onClick={handleClockIn}
              style={greenBtn}
            >
              Start Day
            </button>

          </div>

        )

      }









      {/* BREAK BUTTONS */}
      <div
        style={{
          marginBottom: "25px"
        }}
      >

        {

          currentWorking && (

            <>

              <button
                onClick={handleBreak}
                style={blueBtn}
              >
                Take Break
              </button>



              <button
                onClick={() =>
                  handleClockOut(
                    currentWorking.id
                  )
                }
                style={redBtn}
              >
                Clock Out
              </button>

            </>

          )

        }





        {

          currentBreak && (

            <button
              onClick={handleResume}
              style={greenBtn}
            >
              Resume Work
            </button>

          )

        }

      </div>









      {/* WEEKLY CHART */}
      <div style={sectionStyle}>

        <h2>
          Weekly Attendance Chart
        </h2>

        <br />



        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={chartData}>

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="hours"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>










      {/* TABLE */}
      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{
          background: "white",
          color: "black",
          marginTop: "30px",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th>Date</th>

            <th>Work Type</th>

            <th>Feeling</th>

            <th>Clock In</th>

            <th>Clock Out</th>

            <th>Status</th>

            <th>Hours</th>

          </tr>

        </thead>





        <tbody>

          {

            attendance.map(item => (

              <tr key={item.id}>

                <td>{item.date}</td>

                <td>
                  {item.todayStatus}
                </td>

                <td>
                  {item.feeling}
                </td>

                <td>
                  {item.clockIn}
                </td>

                <td>
                  {item.clockOut || "-"}
                </td>

                <td>
                  {item.status}
                </td>

                <td>
                  {item.workingHours || "-"}
                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>
  );
}





// STYLES
const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center"
};

const sectionStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "25px"
};

const inputStyle = {
  padding: "12px",
  marginRight: "10px",
  borderRadius: "10px"
};

const greenBtn = {
  padding: "12px 20px",
  background: "#10b981",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  marginRight: "10px"
};

const blueBtn = {
  padding: "12px 20px",
  background: "#3b82f6",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  marginRight: "10px"
};

const redBtn = {
  padding: "12px 20px",
  background: "#ef4444",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer"
};

const logoutBtn = {
  padding: "12px 20px",
  background: "#ef4444",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer"
};