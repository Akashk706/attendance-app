import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AdminDashboard() {

  // BACKEND URL
  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://attendance-backend-32mo.onrender.com");

  const [records, setRecords] =
    useState([]);

  // FETCH DATA
  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await axios.get(
        `${baseURL}/api/attendance/all`
      );

      setRecords(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT
  const logoutAdmin = () => {

    localStorage.removeItem("admin");

    window.location.href =
      "/admin-login";
  };

  // COUNTS
  const workingCount =
    records.filter(
      item =>
        item.status === "Working"
    ).length;

  const breakCount =
    records.filter(
      item =>
        item.status === "Break"
    ).length;

  const completedCount =
    records.filter(
      item =>
        item.status === "Completed"
    ).length;

  const notWorkingCount =
    records.filter(
      item =>
        item.status === "Not Working"
    ).length;

  // PIE CHART DATA
  const pieData = [

    {
      name: "Working",
      value: workingCount
    },

    {
      name: "Break",
      value: breakCount
    },

    {
      name: "Completed",
      value: completedCount
    },

    {
      name: "Not Working",
      value: notWorkingCount
    }
  ];

  // COLORS
  const COLORS = [

    "#22c55e",
    "#f59e0b",
    "#3b82f6",
    "#ef4444"
  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "40px"
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

        <h1
          style={{
            color: "white",
            fontSize: "45px"
          }}
        >
          Admin Dashboard
        </h1>

        <button
          onClick={logoutAdmin}
          style={{
            background: "red",
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

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginTop: "40px"
        }}
      >

        {/* TOTAL */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <h2
            style={{
              color: "white"
            }}
          >
            {records.length}
          </h2>

          <p
            style={{
              color: "white"
            }}
          >
            Total Records
          </p>

        </div>

        {/* WORKING */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <h2
            style={{
              color: "#22c55e"
            }}
          >
            {workingCount}
          </h2>

          <p
            style={{
              color: "white"
            }}
          >
            Working
          </p>

        </div>

        {/* BREAK */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <h2
            style={{
              color: "#f59e0b"
            }}
          >
            {breakCount}
          </h2>

          <p
            style={{
              color: "white"
            }}
          >
            On Break
          </p>

        </div>

        {/* NOT WORKING */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
          }}
        >

          <h2
            style={{
              color: "#ef4444"
            }}
          >
            {notWorkingCount}
          </h2>

          <p
            style={{
              color: "white"
            }}
          >
            Not Working
          </p>

        </div>

      </div>

      {/* PIE CHART */}
      <div
        style={{
          background: "#1e293b",
          marginTop: "40px",
          borderRadius: "20px",
          padding: "30px"
        }}
      >

        <h2
          style={{
            color: "white",
            textAlign: "center"
          }}
        >
          Attendance Analytics
        </h2>

        <div
          style={{
            width: "100%",
            height: "400px"
          }}
        >

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >

                {
                  pieData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

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
          className="admin-table"
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

              <th
                style={{
                  padding: "15px"
                }}
              >
                Name
              </th>

              <th>Date</th>

              <th>Clock In</th>

              <th>Clock Out</th>

              <th>Status</th>

              <th>Hours</th>

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

                    <td
                      style={{
                        padding:
                          "15px"
                      }}
                    >
                      {item.userName}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>
                      {item.clockIn}
                    </td>

                    <td>
                      {item.clockOut || "-"}
                    </td>

                    <td>

                      <span
                        style={{

                          background:

                            item.status ===
                            "Working"

                              ? "#22c55e"

                              : item.status ===
                                "Break"

                              ? "#f59e0b"

                              : item.status ===
                                "Completed"

                              ? "#3b82f6"

                              : "#ef4444",

                          color:
                            "white",

                          padding:
                            "8px 15px",

                          borderRadius:
                            "20px",

                          fontWeight:
                            "bold"
                        }}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td>
                      {item.workingHours || "-"}
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