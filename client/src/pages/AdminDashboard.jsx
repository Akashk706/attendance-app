import { useEffect, useState } from "react";

import axios from "axios";

export default function AdminDashboard() {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");



  const BACKEND_URL =
    "https://attendance-backend-32mo.onrender.com";







  // FETCH ATTENDANCE
  const fetchAttendance = async () => {

    const res = await axios.get(
      `${BACKEND_URL}/api/attendance/all`
    );

    setRecords(res.data.reverse());
  };







  useEffect(() => {

    fetchAttendance();

    const interval = setInterval(() => {

      fetchAttendance();

    }, 3000);

    return () => clearInterval(interval);

  }, []);








  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("admin");

    window.location.href =
      "/admin-login";
  };









  // FILTER LOGIC
  const filteredRecords =
    records.filter(item => {

      const nameMatch =
        item.userName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );



      const statusMatch =

        statusFilter === "All"

        ? true

        : item.status === statusFilter;



      return (
        nameMatch &&
        statusMatch
      );

    });









  // ANALYTICS
  const totalRecords =
    records.length;

  const workingEmployees =
    records.filter(
      item => item.status === "Working"
    ).length;

  const breakEmployees =
    records.filter(
      item => item.status === "Break"
    ).length;









  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "30px",
        color: "white"
      }}
    >








      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Employee Monitoring Panel
          </p>

        </div>







        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
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












      {/* ANALYTICS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>

          <h2>
            {totalRecords}
          </h2>

          <p>
            Total Records
          </p>

        </div>







        <div style={cardStyle}>

          <h2>
            {workingEmployees}
          </h2>

          <p>
            Working Employees
          </p>

        </div>







        <div style={cardStyle}>

          <h2>
            {breakEmployees}
          </h2>

          <p>
            On Break
          </p>

        </div>

      </div>













      {/* FILTER SECTION */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap"
        }}
      >








        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search Employee"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "10px",
            border: "none"
          }}
        />










        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            width: "220px",
            borderRadius: "10px",
            border: "none"
          }}
        >

          <option value="All">
            All Status
          </option>

          <option value="Working">
            Working
          </option>

          <option value="Break">
            Break
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Not Working">
            Not Working
          </option>

        </select>

      </div>












      {/* TABLE */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px"
        }}
      >

        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{
            background: "white",
            color: "black",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr>

              <th>Name</th>

              <th>Date</th>

              <th>Clock In</th>

              <th>Clock Out</th>

              <th>Status</th>

              <th>Total Hours</th>

            </tr>

          </thead>










          <tbody>

            {

              filteredRecords.map(item => (

                <tr key={item.id}>

                  <td>
                    {item.userName || "Unknown"}
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
                        padding:
                          "6px 14px",

                        borderRadius:
                          "20px",

                        color: "white",

                        background:

                          item.status === "Working"
                          ? "#f59e0b"

                          : item.status === "Break"
                          ? "#3b82f6"

                          : item.status === "Completed"
                          ? "#10b981"

                          : "#ef4444"
                      }}
                    >

                      {item.status}

                    </span>

                  </td>










                  <td>
                    {item.workingHours || "0"}
                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>
  );
}










// CARD STYLE
const cardStyle = {

  background: "#1e293b",

  padding: "20px",

  borderRadius: "15px",

  textAlign: "center"
};