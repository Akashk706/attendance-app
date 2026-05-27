import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [workType, setWorkType] =
    useState("All");

  const [feelingFilter, setFeelingFilter] =
    useState("All");

  const [selectedDate, setSelectedDate] =
    useState("");



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








  // FILTERS
  const filteredRecords =
    records.filter(item => {

      const nameMatch =
        item.userName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );



      const statusMatch =

        filterStatus === "All"

        ? true

        : item.status === filterStatus;



      const workTypeMatch =

        workType === "All"

        ? true

        : item.todayStatus === workType;



      const feelingMatch =

        feelingFilter === "All"

        ? true

        : item.feeling === feelingFilter;



      const dateMatch =

        selectedDate === ""

        ? true

        : item.date ===
          new Date(selectedDate)
          .toLocaleDateString();




      return (

        nameMatch &&

        statusMatch &&

        workTypeMatch &&

        feelingMatch &&

        dateMatch

      );

    });









  // ANALYTICS
  const totalEmployees =
    new Set(
      records.map(r => r.userId)
    ).size;



  const workingEmployees =
    records.filter(
      r => r.status === "Working"
    ).length;



  const breakEmployees =
    records.filter(
      r => r.status === "Break"
    ).length;



  const completedEmployees =
    records.filter(
      r => r.status === "Completed"
    ).length;








  // PIE CHART DATA
  const chartData = [

    {
      name: "Working",
      value: workingEmployees
    },

    {
      name: "Break",
      value: breakEmployees
    },

    {
      name: "Completed",
      value: completedEmployees
    }

  ];



  const COLORS = [

    "#f59e0b",

    "#3b82f6",

    "#10b981"

  ];








  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "30px"
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
            Admin Analytics Dashboard
          </h1>

          <p>
            Live Employee Monitoring
          </p>

        </div>

      </div>










      {/* CARDS */}
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
            {totalEmployees}
          </h2>
          <p>Total Employees</p>
        </div>





        <div style={cardStyle}>
          <h2>
            {workingEmployees}
          </h2>
          <p>Working Now</p>
        </div>





        <div style={cardStyle}>
          <h2>
            {breakEmployees}
          </h2>
          <p>On Break</p>
        </div>





        <div style={cardStyle}>
          <h2>
            {completedEmployees}
          </h2>
          <p>Completed</p>
        </div>

      </div>











      {/* FILTERS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "30px"
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
          style={inputStyle}
        />







        {/* STATUS */}
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
          style={inputStyle}
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

          <option value="Half Day">
            Half Day
          </option>

          <option value="Not Working">
            Not Working
          </option>

        </select>








        {/* WORK TYPE */}
        <select
          value={workType}
          onChange={(e) =>
            setWorkType(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="All">
            All Work Types
          </option>

          <option value="Office Work">
            Office Work
          </option>

          <option value="Work From Home">
            Work From Home
          </option>

          <option value="Client Meeting">
            Client Meeting
          </option>

        </select>









        {/* FEELING */}
        <select
          value={feelingFilter}
          onChange={(e) =>
            setFeelingFilter(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="All">
            All Feelings
          </option>

          <option value="Happy 😊">
            Happy 😊
          </option>

          <option value="Normal 🙂">
            Normal 🙂
          </option>

          <option value="Tired 😴">
            Tired 😴
          </option>

        </select>









        {/* DATE */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          style={inputStyle}
        />

      </div>












      {/* PIE CHART */}
      <div style={sectionStyle}>

        <h2>
          Employee Status Analytics
        </h2>

        <br />






        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >

              {

                chartData.map(
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

          </PieChart>

        </ResponsiveContainer>

      </div>













      {/* TABLE */}
      <div style={sectionStyle}>

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

              <th>Work Type</th>

              <th>Feeling</th>

              <th>Status</th>

              <th>Clock In</th>

              <th>Clock Out</th>

              <th>Hours</th>

            </tr>

          </thead>










          <tbody>

            {

              filteredRecords.map(item => (

                <tr key={item.id}>

                  <td>
                    {item.userName}
                  </td>

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

                          : item.status === "Half Day"
                          ? "#8b5cf6"

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
                    {item.workingHours || "-"}
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










// STYLES
const cardStyle = {

  background: "#1e293b",

  padding: "20px",

  borderRadius: "15px",

  textAlign: "center"
};




const sectionStyle = {

  background: "#1e293b",

  padding: "20px",

  borderRadius: "15px",

  marginBottom: "25px"
};




const inputStyle = {

  padding: "12px",

  borderRadius: "10px",

  border: "none",

  width: "100%"
};