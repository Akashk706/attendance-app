import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [attendance, setAttendance] = useState([]);

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
        "Please select today's status and feeling"
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




  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };




  const currentWorking =
    attendance.find(
      item => item.status === "Working"
    );




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
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "45px",
              marginBottom: "10px"
            }}
          >
            Welcome {user?.name}
          </h1>

          <p
            style={{
              color: "#cbd5e1"
            }}
          >
            Employee Attendance Dashboard
          </p>

        </div>


        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            background: "#ef4444",
            border: "none",
            color: "white",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>





      {/* STATUS CARD */}
      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          textAlign: "center"
        }}
      >

        <h2>

          Current Status:

          {

            currentWorking
            ? " 🟡 Working"

            : attendance[0]?.status === "Completed"
            ? " 🟢 Completed"

            : attendance[0]?.status === "Half Day"
            ? " 🔵 Half Day"

            : " 🔴 Not Working"

          }

        </h2>

      </div>






      {/* START DAY SECTION */}
      {

        !currentWorking && (

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px"
            }}
          >

            <h3>
              Yesterday Working Hours:
              {
                attendance[1]?.workingHours || " 0 hrs"
              }
            </h3>

            <br />



            {/* TODAY STATUS */}
            <select
              value={todayStatus}
              onChange={(e) =>
                setTodayStatus(e.target.value)
              }
              style={{
                padding: "12px",
                marginRight: "10px",
                borderRadius: "10px",
                width: "220px"
              }}
            >

              <option value="">
                Select Today Status
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

              <option>
                Field Work
              </option>

            </select>




            {/* FEELING */}
            <select
              value={feeling}
              onChange={(e) =>
                setFeeling(e.target.value)
              }
              style={{
                padding: "12px",
                borderRadius: "10px",
                width: "220px"
              }}
            >

              <option value="">
                Today Feeling
              </option>

              <option>
                Happy 😊
              </option>

              <option>
                Normal 🙂
              </option>

              <option>
                Sad 😔
              </option>

              <option>
                Tired 😴
              </option>

            </select>



            <br />
            <br />



            <button
              onClick={handleClockIn}
              style={{
                padding: "12px 22px",
                background: "#10b981",
                border: "none",
                color: "white",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Start Day
            </button>

          </div>

        )

      }







      {/* CLOCK OUT BUTTON */}
      {

        currentWorking && (

          <button
            onClick={() =>
              handleClockOut(currentWorking.id)
            }
            style={{
              padding: "12px 22px",
              background: "#3b82f6",
              border: "none",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "20px"
            }}
          >
            Clock Out
          </button>

        )

      }







      {/* TABLE */}
      <table
        border="1"
        cellPadding="12"
        width="100%"
        style={{
          background: "white",
          color: "black",
          borderCollapse: "collapse",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >

        <thead
          style={{
            background: "#e2e8f0"
          }}
        >

          <tr>

            <th>Date</th>

            <th>Today Status</th>

            <th>Feeling</th>

            <th>Clock In</th>

            <th>Clock Out</th>

            <th>Status</th>

            <th>Working Hours</th>

          </tr>

        </thead>





        <tbody>

          {

            attendance.map((item) => (

              <tr key={item.id}>

                <td>{item.date}</td>

                <td>{item.todayStatus}</td>

                <td>{item.feeling}</td>

                <td>{item.clockIn}</td>

                <td>
                  {item.clockOut || "-"}
                </td>




                <td>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "bold",

                      background:

                        item.status === "Working"
                        ? "#f59e0b"

                        : item.status === "Completed"
                        ? "#10b981"

                        : item.status === "Half Day"
                        ? "#3b82f6"

                        : "#ef4444"
                    }}
                  >

                    {item.status}

                  </span>

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