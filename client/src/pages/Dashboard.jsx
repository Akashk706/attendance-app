import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [records, setRecords] = useState([]);

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

  // BREAK
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

    <div className="dashboard-shell">

      <div className="dashboard-container">

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
              padding: "10px 20px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        </div>

        {/* START DAY */}
        {!activeRecord && (

          <div
            className="card"
            style={{
              marginTop: "30px",
              textAlign: "center"
            }}
          >

            <h2>
              Yesterday Working Hours:
              {
                records[1]?.workingHours || "0 hrs"
              }
            </h2>

            <div style={{ marginTop: "20px" }}>

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
                padding: "12px 30px",
                background: "#10b981",
                border: "none",
                borderRadius: "10px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Start Day
            </button>

          </div>
        )}

        {/* ACTIVE STATUS */}
        {activeRecord && (

          <div
            className="card"
            style={{ marginTop: "30px" }}
          >

            <h2>

              Current Status:

              {
                activeRecord.status === "Working"
                  ? " 🟢 Working"
                  : " ☕ Break"
              }

            </h2>

            <div style={{ marginTop: "25px" }}>

              <textarea
                placeholder="Today's Progress"
                value={progress}
                onChange={(e) =>
                  setProgress(e.target.value)
                }
              />

              <textarea
                placeholder="Tasks Completed"
                value={tasks}
                onChange={(e) =>
                  setTasks(e.target.value)
                }
              />

              <textarea
                placeholder="Issues Faced"
                value={issues}
                onChange={(e) =>
                  setIssues(e.target.value)
                }
              />

              <textarea
                placeholder="Tomorrow Plan"
                value={tomorrowPlan}
                onChange={(e) =>
                  setTomorrowPlan(e.target.value)
                }
              />

            </div>

          </div>
        )}

      </div>

    </div>
  );
}