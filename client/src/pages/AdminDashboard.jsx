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








  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "30px",
        color: "white"
      }}
    >

      <h1>
        Admin Dashboard
      </h1>

      <br />







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
            width: "200px",
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

            <th>Status</th>

            <th>Clock In</th>

            <th>Clock Out</th>

            <th>Working Hours</th>

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

                  <span
                    style={{
                      padding:
                        "6px 12px",

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
                  {item.clockIn}
                </td>

                <td>
                  {item.clockOut || "-"}
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
  );
}