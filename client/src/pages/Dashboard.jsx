import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [attendance, setAttendance] = useState([]);

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
  }, []);


  // CLOCK IN
  const handleClockIn = async () => {

    await axios.post(
      `${BACKEND_URL}/api/attendance/clock-in`,
      {
        userId: user.id,
        userName: user.name
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


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };


  return (
    <div
      style={{
        padding: "30px",
        background: "#111827",
        minHeight: "100vh",
        color: "white"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>
          <h1>
            Welcome {user?.name}
          </h1>

          <p>
            Employee Attendance Dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>


      {/* STATUS */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >

        <h2>
          Today's Status:
          {
            attendance.length > 0
            ? attendance[0].status
            : " Not Marked"
          }
        </h2>

      </div>


      {/* BUTTONS */}
      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button
          onClick={handleClockIn}
          style={{
            padding: "12px 20px",
            marginRight: "10px",
            background: "#10b981",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Clock In
        </button>

      </div>


      {/* TABLE */}
      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          background: "white",
          color: "black",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Status</th>
            <th>Working Hours</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {
            attendance.map((item) => (

              <tr key={item.id}>

                <td>{item.date}</td>

                <td>{item.clockIn}</td>

                <td>{item.clockOut || "-"}</td>

                <td>{item.status}</td>

                <td>{item.workingHours || "-"}</td>

                <td>

                  {
                    !item.clockOut && (

                      <button
                        onClick={() =>
                          handleClockOut(item.id)
                        }
                        style={{
                          padding: "8px 15px",
                          background: "#3b82f6",
                          border: "none",
                          color: "white",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }}
                      >
                        Clock Out
                      </button>

                    )
                  }

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}