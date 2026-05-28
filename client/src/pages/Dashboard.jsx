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

  // BACKEND URL
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

  // CHECK LOGIN
  useEffect(() => {

    if (!user) {

      navigate("/");
    }

  }, [navigate, user]);

  // FETCH ATTENDANCE
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

      console.error(error);
    }
  };

  // CLOCK IN
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

      console.error(error);
    }
  };

  // CLOCK OUT
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

      console.error(error);
    }
  };

  // TAKE BREAK
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

      console.error(error);
    }
  };

  // RESUME WORK
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

      console.error(error);
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  // ACTIVE RECORD
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
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "45px"
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
          onClick={logout}
          style={{
            padding: "12px 25px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold"
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
            marginTop: "40px",
            padding: "35px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <FaUserClock
            size={60}
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
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            <select
              value={todayStatus}
              onChange={(e) =>
                setTodayStatus(e.target.value)
              }
              style={selectStyle}
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
              style={selectStyle}
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
              marginTop: "30px",
              padding: "14px 35px",
              background: "#10b981",
              border: "none",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
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
            marginTop: "40px",
            padding: "35px",
            borderRadius: "20px"
          }}
        >

          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >

            {
              activeRecord.status === "Working"

                ? (
                  <>
                    <FaCheckCircle color="#22c55e" />
                    Working
                  </>
                )

                : activeRecord.status === "Break"

                ? (
                  <>
                    <FaCoffee color="#f59e0b" />
                    Break
                  </>
                )

                : (
                  <>
                    <FaPowerOff color="#ef4444" />
                    Completed
                  </>
                )
            }

          </h2>

          {/* TEXTAREAS */}
          <div
            style={{
              marginTop: "25px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px"
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

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            {
              activeRecord.status === "Working" && (

                <button
                  onClick={() =>
                    takeBreak(activeRecord._id)
                  }
                  style={breakBtn}
                >

                  <FaCoffee />

                  Take Break

                </button>
              )
            }

            {
              activeRecord.status === "Break" && (

                <button
                  onClick={() =>
                    resumeWork(activeRecord._id)
                  }
                  style={resumeBtn}
                >

                  <FaPlayCircle />

                  Resume Work

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

const selectStyle = {

  padding: "14px",

  width: "260px",

  borderRadius: "10px",

  border: "none",

  outline: "none"
};

const textareaStyle = {

  width: "100%",

  padding: "15px",

  borderRadius: "10px",

  border: "none",

  outline: "none",

  minHeight: "120px",

  resize: "none"
};

const breakBtn = {

  background: "#f59e0b",

  border: "none",

  padding: "14px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontWeight: "bold"
};

const resumeBtn = {

  background: "#22c55e",

  border: "none",

  padding: "14px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontWeight: "bold"
};

const clockoutBtn = {

  background: "#ef4444",

  border: "none",

  padding: "14px 25px",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontWeight: "bold"
};