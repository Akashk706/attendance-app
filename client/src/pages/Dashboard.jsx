import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlay,
  FaPause,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {

  // =========================
  // BACKEND URL
  // =========================

  const API =
    "https://your-backend-url.onrender.com";

  // =========================
  // STATES
  // =========================

  const [attendance, setAttendance] =
    useState([]);

  const [status, setStatus] =
    useState("Office Work");

  const [feeling, setFeeling] =
    useState("Happy 😊");

  const [currentStatus, setCurrentStatus] =
    useState("Completed");

  const [clockIn, setClockIn] =
    useState("");

  const [clockOut, setClockOut] =
    useState("");

  const [workingHours, setWorkingHours] =
    useState("");

  const [progress, setProgress] =
    useState("");

  const [tasks, setTasks] =
    useState("");

  const [issues, setIssues] =
    useState("");

  const [tomorrowPlan, setTomorrowPlan] =
    useState("");

  // =========================
  // FETCH DATA
  // =========================

  const fetchAttendance = async () => {

    try {

      const response =
        await axios.get(
          `${API}/attendance`
        );

      setAttendance(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  // =========================
  // SAVE DATA
  // =========================

  const saveAttendance = async (
    updatedStatus
  ) => {

    try {

      const data = {

        name: "Akash",

        date:
          new Date().toLocaleDateString(),

        status,

        feeling,

        currentStatus: updatedStatus,

        clockIn,

        clockOut,

        workingHours,

        progress,

        tasks,

        issues,

        tomorrowPlan,
      };

      await axios.post(
        `${API}/attendance`,
        data
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);

      alert("Error saving data");
    }
  };

  // =========================
  // START DAY
  // =========================

  const handleStartDay = () => {

    const time =
      new Date().toLocaleTimeString();

    setClockIn(time);

    setCurrentStatus("Working");

    saveAttendance("Working");
  };

  // =========================
  // BREAK
  // =========================

  const handleBreak = () => {

    setCurrentStatus("Break");

    saveAttendance("Break");
  };

  // =========================
  // RESUME
  // =========================

  const handleResume = () => {

    setCurrentStatus("Working");

    saveAttendance("Working");
  };

  // =========================
  // CLOCK OUT
  // =========================

  const handleClockOut = () => {

    const out =
      new Date().toLocaleTimeString();

    setClockOut(out);

    const inTime =
      new Date(`1970-01-01 ${clockIn}`);

    const outTime =
      new Date(`1970-01-01 ${out}`);

    const diff =
      (outTime - inTime) /
      (1000 * 60 * 60);

    setWorkingHours(
      diff.toFixed(2)
    );

    setCurrentStatus("Completed");

    setTimeout(() => {

      saveAttendance("Completed");

    }, 500);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >

        <div>

          <h1>
            Welcome Akash
          </h1>

          <p>
            Employee Attendance Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding:
              "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >

          Logout

        </button>

      </div>

      {/* STATUS CARD */}

      <div
        style={{
          background: "#1e293b",
          marginTop: "30px",
          padding: "30px",
          borderRadius: "20px",
        }}
      >

        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color:
              currentStatus ===
              "Break"
                ? "#f59e0b"
                : currentStatus ===
                  "Completed"
                ? "#ef4444"
                : "#22c55e",
          }}
        >

          <FaCheckCircle />

          {currentStatus}

        </h1>

        {/* DROPDOWNS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              width: "250px",
            }}
          >

            <option>
              Office Work
            </option>

            <option>
              Work From Home
            </option>

          </select>

          <select
            value={feeling}
            onChange={(e) =>
              setFeeling(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              width: "250px",
            }}
          >

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

        </div>

        {/* TEXTAREAS */}

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <textarea
            placeholder="Today's Progress"
            value={progress}
            onChange={(e) =>
              setProgress(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "80px",
              marginBottom:
                "15px",
              borderRadius:
                "10px",
              padding: "10px",
            }}
          />

          <textarea
            placeholder="Tasks Completed"
            value={tasks}
            onChange={(e) =>
              setTasks(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "80px",
              marginBottom:
                "15px",
              borderRadius:
                "10px",
              padding: "10px",
            }}
          />

          <textarea
            placeholder="Issues Faced"
            value={issues}
            onChange={(e) =>
              setIssues(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "80px",
              marginBottom:
                "15px",
              borderRadius:
                "10px",
              padding: "10px",
            }}
          />

          <textarea
            placeholder="Tomorrow Plan"
            value={tomorrowPlan}
            onChange={(e) =>
              setTomorrowPlan(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "80px",
              borderRadius:
                "10px",
              padding: "10px",
            }}
          />

        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "25px",
          }}
        >

          <button
            onClick={
              handleStartDay
            }
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding:
                "15px 30px",
              borderRadius:
                "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >

            <FaPlay />

            {" "}Start Day

          </button>

          <button
            onClick={
              handleBreak
            }
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding:
                "15px 30px",
              borderRadius:
                "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >

            <FaPause />

            {" "}Break

          </button>

          <button
            onClick={
              handleResume
            }
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding:
                "15px 30px",
              borderRadius:
                "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >

            <FaPlay />

            {" "}Resume

          </button>

          <button
            onClick={
              handleClockOut
            }
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding:
                "15px 30px",
              borderRadius:
                "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >

            <FaSignOutAlt />

            {" "}Clock Out

          </button>

        </div>

      </div>

      {/* TABLE */}

      <div
        style={{
          marginTop: "40px",
          background: "#111827",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >

        <table
          width="100%"
          cellPadding="20"
        >

          <thead
            style={{
              background:
                "#0f172a",
            }}
          >

            <tr>

              <th>Date</th>

              <th>Status</th>

              <th>Feeling</th>

              <th>Clock In</th>

              <th>Clock Out</th>

              <th>
                Working Hours
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map(
              (item, index) => (

                <tr
                  key={index}
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  <td>
                    {item.date}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {item.feeling}
                  </td>

                  <td>
                    {item.clockIn}
                  </td>

                  <td>
                    {item.clockOut}
                  </td>

                  <td>
                    {
                      item.workingHours
                    }{" "}
                    hrs
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}