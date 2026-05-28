import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  FaPowerOff,
  FaPlayCircle,
  FaCoffee,
  FaCheckCircle,
  FaUserClock
} from "react-icons/fa";

export default function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://attendance-backend-32mo.onrender.com");

  const [records, setRecords] =
    useState([]);

  const [todayStatus, setTodayStatus] =
    useState("");

  const [feeling, setFeeling] =
    useState("");

  const [progress, setProgress] =
    useState("");

  const [tasks, setTasks] =
    useState("");

  const [issues, setIssues] =
    useState("");

  const [tomorrowPlan, setTomorrowPlan] =
    useState("");

  useEffect(() => {

    if (!user) {

      navigate("/");
    }

  }, [navigate, user]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    if (!user) return;

    try {

      const res = await axios.get(
        `${baseURL}/api/attendance/all`
      );

      const filtered = res.data.filter(
        item => item.userId === user.id
      );

      setRecords(filtered.reverse());

    } catch (error) {

      console.log(error);
    }
  };

  const clockIn = async () => {

    try {

      await axios.post(
        `${baseURL}/api/attendance/clock-in`,
        {
          userId: user.id,
          userName: user.name,
          todayStatus,
          feeling
        }
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);
    }
  };

  const clockOut = async (id) => {

    try {

      await axios.post(
        `${baseURL}/api/attendance/clock-out`,
        {
          attendanceId: id,
          progress,
          tasks,
          issues,
          tomorrowPlan
        }
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);
    }
  };

  const takeBreak = async (id) => {

    try {

      await axios.post(
        `${baseURL}/api/attendance/update-status`,
        {
          attendanceId: id,
          status: "Break"
        }
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);
    }
  };

  const resumeWork = async (id) => {

    try {

      await axios.post(
        `${baseURL}/api/attendance/update-status`,
        {
          attendanceId: id,
          status: "Working"
        }
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);
    }
  };

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  const activeRecord = records.find(
    item =>
      item.status === "Working" ||
      item.status === "Break"
  );

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "40px",
        color: "white"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
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
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <FaPowerOff />

          Logout

        </button>

      </div>

      {/* START DAY */}
      {!activeRecord && (

        <div
          style={{
            background: "#1e293b",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <FaUserClock
            size={50}
            color="#38bdf8"
          />

          <h2
            style={{
              marginTop: "20px"
            }}
          >
            Yesterday Working Hours:
            {
              records[1]?.workingHours || "0 hrs"
            }
          </h2>

          <div
            style={{
              marginTop: "25px"
            }}
          >

            <select
              value={todayStatus}
              onChange={(e) =>
                setTodayStatus(e.target.value)
              }
              style={{
                padding: "12px",
                width: "250px",
                marginRight: "20px"
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
                Half Day
              </option>

            </select>

            <select
              value={feeling}
              onChange={(e) =>
                setFeeling(e.target.value)
              }
              style={{
                padding: "12px",
                width: "250px"
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

            </select>

          </div>

          <button
            onClick={clockIn}
            style={{
              marginTop: "25px",
              padding: "14px 35px",
              background: "#10b981",
              border: "none",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
          >

            <FaPlayCircle />

            Start Day

          </button>

        </div>
      )}

      {/* ACTIVE RECORD */}
      {activeRecord && (

        <div
          style={{
            background: "#1e293b",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "20px"
          }}
        >

          <h2>

            {
              activeRecord.status === "Working"

                ? (
                  <span
                    style={{
                      color: "#22c55e"
                    }}
                  >
                    <FaCheckCircle /> Working
                  </span>
                )

                : (
                  <span
                    style={{
                      color: "#f59e0b"
                    }}
                  >
                    <FaCoffee /> Break
                  </span>
                )
            }

          </h2>

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gap: "15px"
            }}
          >

            <textarea
              placeholder="Today's Progress"
              value={progress}
              onChange={(e) =>
                setProgress(e.target.value)
              }
              style={textareaStyle}
            />

            <textarea
              placeholder="Tasks Completed"
              value={tasks}
              onChange={(e) =>
                setTasks(e.target.value)
              }
              style={textareaStyle}
            />

            <textarea
              placeholder="Issues Faced"
              value={issues}
              onChange={(e) =>
                setIssues(e.target.value)
              }
              style={textareaStyle}
            />

            <textarea
              placeholder="Tomorrow Plan"
              value={tomorrowPlan}
              onChange={(e) =>
                setTomorrowPlan(e.target.value)
              }
              style={textareaStyle}
            />

          </div>

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              gap: "20px"
            }}
          >

            {
              activeRecord.status === "Working"

                ? (
                  <button
                    onClick={() =>
                      takeBreak(activeRecord._id)
                    }
                    style={breakBtn}
                  >
                    <FaCoffee />

                    Break
                  </button>
                )

                : (
                  <button
                    onClick={() =>
                      resumeWork(activeRecord._id)
                    }
                    style={resumeBtn}
                  >
                    <FaPlayCircle />

                    Resume
                  </button>
                )
            }

            <button
              onClick={() =>
                clockOut(activeRecord._id)
              }
              style={clockoutBtn}
            >

              <FaPowerOff />

              Clock Out

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

const textareaStyle = {

  width: "100%",

  padding: "15px",

  borderRadius: "10px",

  border: "none",

  outline: "none",

  minHeight: "80px"
};

const breakBtn = {

  background: "#f59e0b",

  border: "none",

  padding: "12px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px"
};

const resumeBtn = {

  background: "#22c55e",

  border: "none",

  padding: "12px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px"
};

const clockoutBtn = {

  background: "#ef4444",

  border: "none",

  padding: "12px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px"
};