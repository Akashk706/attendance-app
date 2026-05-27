import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const BACKEND_URL =
    "https://attendance-backend-32mo.onrender.com";





  const fetchAttendance = async () => {

    const res = await axios.get(
      `${BACKEND_URL}/api/attendance/all`
    );

    setRecords(res.data.reverse());
  };





  useEffect(() => {

    fetchAttendance();

  }, []);






  const filteredRecords =
    records.filter(item =>

      item.userName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );






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





      <input
        type="text"
        placeholder="Search Employee"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "12px",
          width: "300px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      />








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
                  {item.status}
                </td>

                <td>
                  {item.clockIn}
                </td>

                <td>
                  {item.clockOut || "-"}
                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>
  );
}