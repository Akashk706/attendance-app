import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaPlay,
  FaPause,
  FaStop,
  FaCheckCircle,
  FaSignOutAlt
} from "react-icons/fa";

export default function Dashboard() {

  // BACKEND URL
  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://attendance-backend-32mo.onrender.com");

  // USER
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // STATES
  const [todayStatus, setTodayStatus] =
    useState("Office Work");

  const [feeling, setFeeling] =
    useState("Happy 😊");

  const [progress, setProgress] =
    useState("");

  const [tasks, setTasks] =
    useState("");

  const [issues, setIssues] =
    useState("");

  const [tomorrowPlan, setTomorrowPlan] =
    useState("");

  const [currentStatus, setCurrentStatus] =
    useState("Not Working");

  const [records, setRecords] =
    useState([]);

  // FETCH RECORDS
  useEffect(() => {

    fetchRecords();

  }, []);

  const fetchRecords = async () => {

    try {

      const res = await axios.get(
        `${baseURL}/api/attendance/all`
      );

      const userRecords =
        res.data.filter(
          item =>
            item.userName ===
            (user?.name || "Akash")
        );

      setRecords(userRecords);

    } catch (error) {

      console.log(error);
    }
  };

  // START DAY
  const startDay = async () => {

    const newRecord = {

      userName:
        user?.name || "Akash",

      date:
        new Date().toLocaleDateString(),

      todayStatus,

      feeling,

      progress,

      tasks,

      issues,

      tomorrowPlan,

      clockIn:
        new Date().toLocaleTimeString(),

      clockOut: "",

      status: "Working",

      workingHours: "-"
    };

    try {

      await axios.post(
        `${baseURL}/api/attendance/add`,
        newRecord
      );

      alert(
        "Day Started Successfully"
      );

      setCurrentStatus("Working");

      fetchRecords();

    } catch (error) {

      console.log(error);

      alert("Error saving data");
    }
  };

  // BREAK
  const takeBreak = () => {

    setCurrentStatus("Break");

    alert("Break Started");
  };

  // RESUME
  const resumeWork = () => {

    setCurrentStatus("Working");

    alert("Work Resumed");
  };

  // CLOCK OUT
  const clockOut = async () => {

    try {

      const lastRecord =
        records[records.length - 1];

      if (!lastRecord) {

        alert("No active record found");

        return;
      }

      const clockOutTime =
        new Date().toLocaleTimeString();

      // CALCULATE HOURS
      const inTime =
        new Date(
          `1970-01-01 ${lastRecord.clockIn}`
        );

      const outTime =
        new Date(
          `1970-01-01 ${clockOutTime}`
        );

      const diff =
        (outTime - inTime) /
        (1000 * 60 * 60);

      const workingHours =
        diff.toFixed(2) + " hrs";

      await axios.put(

        `${baseURL}/api/attendance/update/${lastRecord._id}`,

        {

          clockOut:
            clockOutTime,

          status:
            "Completed",

          workingHours
        }
      );

      alert("Day Completed");

      setCurrentStatus("Completed");

      fetchRecords();

    } catch (error) {

      console.log(error);

      alert("Clock out failed");
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "30px"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >

        <div>

          <h1
            style={{
              color: "white",
              fontSize: "45px"
            }}
          >
            Welcome {
              user?.name || "Akash"
            }
          </h1>

          <p
            style={{
              color: "white"
            }}
          >
            Employee Attendance Dashboard
          </p>

        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding:
              "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

      {/* STATUS BOX */}
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "25px",
          marginTop: "40px"
        }}
      >

        <h2
          style={{
            color:
              currentStatus === "Working"
                ? "#22c55e"
                : currentStatus === "Break"
                ? "#f59e0b"
                : currentStatus === "Completed"
                ? "#3b82f6"
                : "#ef4444",

            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "40px"
          }}
        >

          <FaCheckCircle />

          {currentStatus}

        </h2>

        {/* SELECTS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap"
          }}
        >

          <select
            value={todayStatus}
            onChange={(e) =>
              setTodayStatus(
                e.target.value
              )
            }
            style={{
              padding: "15px",
              borderRadius: "10px",
              width: "250px"
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
              padding: "15px",
              borderRadius: "10px",
              width: "250px"
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
            marginTop: "30px"
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
            style={textareaStyle}
          />

          <textarea
            placeholder="Tasks Completed"
            value={tasks}
            onChange={(e) =>
              setTasks(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <textarea
            placeholder="Issues Faced"
            value={issues}
            onChange={(e) =>
              setIssues(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <textarea
            placeholder="Tomorrow Plan"
            value={tomorrowPlan}
            onChange={(e) =>
              setTomorrowPlan(
                e.target.value
              )
            }
            style={textareaStyle}
          />

        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={startDay}
            style={{
              ...buttonStyle,
              background: "#22c55e"
            }}
          >
            <FaPlay />
            Start Day
          </button>

          <button
            onClick={takeBreak}
            style={{
              ...buttonStyle,
              background: "#f59e0b"
            }}
          >
            <FaPause />
            Break
          </button>

          <button
            onClick={resumeWork}
            style={{
              ...buttonStyle,
              background: "#3b82f6"
            }}
          >
            <FaPlay />
            Resume
          </button>

          <button
            onClick={clockOut}
            style={{
              ...buttonStyle,
              background: "#ef4444"
            }}
          >
            <FaStop />
            Clock Out
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >

          <thead
            style={{
              background: "#0f172a",
              color: "white"
            }}
          >

            <tr>

              <th style={thStyle}>
                Date
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Feeling
              </th>

              <th style={thStyle}>
                Clock In
              </th>

              <th style={thStyle}>
                Clock Out
              </th>

              <th style={thStyle}>
                Working Hours
              </th>

            </tr>

          </thead>

          <tbody>

            {
              records.map(
                (item, index) => (

                  <tr
                    key={index}
                    style={{
                      textAlign:
                        "center"
                    }}
                  >

                    <td style={tdStyle}>
                      {item.date}
                    </td>

                    <td style={tdStyle}>
                      {item.todayStatus}
                    </td>

                    <td style={tdStyle}>
                      {item.feeling}
                    </td>

                    <td style={tdStyle}>
                      {item.clockIn}
                    </td>

                    <td style={tdStyle}>
                      {item.clockOut || "-"}
                    </td>

                    <td style={tdStyle}>
                      {
                        item.workingHours
                      }
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

// STYLES

const textareaStyle = {

  width: "100%",
  minHeight: "90px",
  marginBottom: "20px",
  borderRadius: "10px",
  padding: "15px",
  fontSize: "16px"
};

const buttonStyle = {

  border: "none",
  color: "white",
  padding: "15px 25px",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px"
};

const thStyle = {

  padding: "15px"
};

const tdStyle = {

  padding: "15px",
  borderBottom:
    "1px solid #e5e7eb"
};