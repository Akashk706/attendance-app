import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    const res = await axios.get(

      "http://localhost:5000/api/attendance/all"

    );

    const filtered = res.data.filter(

      item => item.userId === user.id

    );

    setRecords(filtered.reverse());
  };

  // CLOCK IN

  const clockIn = async () => {

    await axios.post(

      "http://localhost:5000/api/attendance/clock-in",

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

  const clockOut = async (id) => {

    await axios.post(

      "http://localhost:5000/api/attendance/clock-out",

      {

        attendanceId: id,

        progress,

        tasks,

        issues,

        tomorrowPlan
      }
    );

    fetchAttendance();
  };

  // BREAK

  const takeBreak = async (id) => {

    await axios.post(

      "http://localhost:5000/api/attendance/update-status",

      {

        attendanceId: id,

        status: "Break"
      }
    );

    fetchAttendance();
  };

  // RESUME

  const resumeWork = async (id) => {

    await axios.post(

      "http://localhost:5000/api/attendance/update-status",

      {

        attendanceId: id,

        status: "Working"
      }
    );

    fetchAttendance();
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  // TODAY RECORD

  const activeRecord = records.find(

    item =>

      item.status === "Working"

      ||

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
            Welcome {user.name}
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
          style={{ marginTop: "30px", textAlign: "center" }}
        >

            <h2>

              Yesterday Working Hours:

              {

                records[1]?.workingHours || "0 hrs"
              }

            </h2>

            <div
              style={{
                marginTop: "20px"
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
                  setFeeling(
                    e.target.value
                  )
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

        )
      }

      {/* ACTIVE STATUS */}

      {activeRecord && (
        <div className="card" style={{ marginTop: "30px" }}>

            <h2>

              Current Status:

              {

                activeRecord.status ===
                "Working"

                ? " 🟢 Working"

                : " ☕ Break"
              }

            </h2>

            {/* PROGRESS */}

            <div
              style={{
                marginTop: "25px"
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
                  padding: "10px",
                  marginBottom: "15px"
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
                  padding: "10px",
                  marginBottom: "15px"
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
                  padding: "10px",
                  marginBottom: "15px"
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
                  padding: "10px",
                  marginBottom: "15px"
                }}
              />

            </div>

            {/* BUTTONS */}

            <div
              style={{
                marginTop: "20px"
              }}
            >

              {

                activeRecord.status ===
                "Working"

                ? (

                  <button
                    onClick={() =>
                      takeBreak(
                        activeRecord.id
                      )
                    }
                    style={{
                      padding: "12px 25px",
                      background: "#f59e0b",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      marginRight: "15px"
                    }}
                  >
                    Take Break
                  </button>

                )

                : (

                  <button
                    onClick={() =>
                      resumeWork(
                        activeRecord.id
                      )
                    }
                    style={{
                      padding: "12px 25px",
                      background: "#3b82f6",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      marginRight: "15px"
                    }}
                  >
                    Resume Work
                  </button>

                )
              }

              <button
                onClick={() =>
                  clockOut(
                    activeRecord.id
                  )
                }
                style={{
                  padding: "12px 25px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "10px",
                  color: "white"
                }}
              >
                Clock Out
              </button>

            </div>

          </div>

        )
      }

      {/* TABLE */}

      <div className="table-card">
        <table>

          <thead
            style={{
              background: "#1e293b",
              color: "white"
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

              records.map((item) => (

                <tr
                  key={item.id}
                >

                  <td>
                    {item.date}
                  </td>

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
                    {

                      item.clockOut || "-"
                    }

                  </td>

                  <td>

                    <span
                      style={{

                        padding:
                          "6px 14px",

                        borderRadius:
                          "30px",

                        color:
                          "white",

                        background:

                          item.status ===
                          "Working"

                          ? "#22c55e"

                          : item.status ===
                            "Break"

                          ? "#f59e0b"

                          : "#ef4444"
                      }}
                    >

                      {

                        item.status ===
                        "Working"

                        ? "🟢 Working"

                        : item.status ===
                          "Break"

                        ? "☕ Break"

                        : "🔴 Not Working"
                      }

                    </span>

                  </td>

                  <td>

                    {

                      item.workingHours ||
                      "0 hrs"
                    }

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

      </div>
    </div>
  );
}