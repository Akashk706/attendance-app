import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [records, setRecords] =
    useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("attendance")
      ) || [];

    setRecords(saved);

  }, []);

  const logout = () => {

    localStorage.removeItem("admin");

    window.location.href =
      "/admin-login";
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "40px",
        color: "white",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "40px",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            Employee Attendance Monitoring
          </p>

        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >

          Logout

        </button>

      </div>

      {/* CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div
          style={cardStyle}
        >

          <h2>
            {records.length}
          </h2>

          <p>
            Total Records
          </p>

        </div>

        <div
          style={cardStyle}
        >

          <h2>

            {
              records.filter(
                (item) =>
                  item.workStatus ===
                  "Working"
              ).length
            }

          </h2>

          <p>
            Working Employees
          </p>

        </div>

        <div
          style={cardStyle}
        >

          <h2>

            {
              records.filter(
                (item) =>
                  item.workStatus ===
                  "Break"
              ).length
            }

          </h2>

          <p>
            On Break
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "20px",
          overflowX: "auto",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            color: "black",
          }}
        >

          <thead>

            <tr>

              <th style={thStyle}>
                Name
              </th>

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
                Work Status
              </th>

              <th style={thStyle}>
                Hours
              </th>

              <th style={thStyle}>
                Progress
              </th>

              <th style={thStyle}>
                Tasks
              </th>

              <th style={thStyle}>
                Issues
              </th>

              <th style={thStyle}>
                Tomorrow Plan
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((item) => (

              <tr key={item.id}>

                <td style={tdStyle}>
                  {item.name}
                </td>

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
                  {item.clockOut}
                </td>

                <td style={tdStyle}>
                  {item.workStatus}
                </td>

                <td style={tdStyle}>
                  {item.workingHours} hrs
                </td>

                <td style={tdStyle}>
                  {item.progress}
                </td>

                <td style={tdStyle}>
                  {item.tasks}
                </td>

                <td style={tdStyle}>
                  {item.issues}
                </td>

                <td style={tdStyle}>
                  {item.tomorrowPlan}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const cardStyle = {

  background: "#1e293b",

  padding: "25px",

  borderRadius: "20px",

  textAlign: "center",
};

const thStyle = {

  border: "1px solid #ccc",

  padding: "12px",

  background: "#0f172a",

  color: "white",
};

const tdStyle = {

  border: "1px solid #ccc",

  padding: "10px",

  textAlign: "center",
};