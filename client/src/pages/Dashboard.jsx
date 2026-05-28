import { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [records, setRecords] =
    useState([]);

  const [status, setStatus] =
    useState("Working");

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

    const saved =
      JSON.parse(localStorage.getItem("attendance")) || [];

    setRecords(saved);

  }, []);

  const saveData = (updated) => {

    setRecords(updated);

    localStorage.setItem(
      "attendance",
      JSON.stringify(updated)
    );
  };

  const startDay = () => {

    const newRecord = {

      id: Date.now(),

      name: user?.name || "Akash",

      date: new Date().toLocaleDateString(),

      todayStatus,

      feeling,

      clockIn: new Date().toLocaleTimeString(),

      clockOut: "-",

      workStatus: "Working",

      workingHours: 0,

      progress,

      tasks,

      issues,

      tomorrowPlan,
    };

    const updated =
      [newRecord, ...records];

    saveData(updated);

    setStatus("Working");
  };

  const takeBreak = () => {

    const updated =
      records.map((item, index) =>
        index === 0
          ? { ...item, workStatus: "Break" }
          : item
      );

    saveData(updated);

    setStatus("Break");
  };

  const resumeWork = () => {

    const updated =
      records.map((item, index) =>
        index === 0
          ? { ...item, workStatus: "Working" }
          : item
      );

    saveData(updated);

    setStatus("Working");
  };

  const clockOut = () => {

    const updated =
      records.map((item, index) => {

        if (index === 0) {

          const start =
            new Date(
              `${item.date} ${item.clockIn}`
            );

          const end =
            new Date();

          const hours =
            (
              (end - start) /
              (1000 * 60 * 60)
            ).toFixed(2);

          return {

            ...item,

            clockOut:
              new Date().toLocaleTimeString(),

            workStatus: "Completed",

            workingHours: hours,
          };
        }

        return item;
      });

    saveData(updated);

    setStatus("Completed");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        Welcome {user?.name || "Akash"}
      </h1>

      <p
        style={{
          marginBottom: "40px",
          color: "#cbd5e1",
        }}
      >
        Employee Attendance Dashboard
      </p>

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
        }}
      >

        <h2
          style={{
            color:
              status === "Working"
                ? "#22c55e"
                : status === "Break"
                ? "#f59e0b"
                : "#ef4444",

            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >

          <FaCheckCircle />

          {status}

        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "25px",
            marginBottom: "20px",
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
              borderRadius: "10px",
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

          </select>

          <select
            value={feeling}
            onChange={(e) =>
              setFeeling(e.target.value)
            }
            style={{
              padding: "12px",
              width: "250px",
              borderRadius: "10px",
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
              Tired 😴
            </option>

          </select>

        </div>

        <textarea
          placeholder="Today's Progress"
          value={progress}
          onChange={(e) =>
            setProgress(e.target.value)
          }
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "15px",
            borderRadius: "10px",
            padding: "10px",
          }}
        />

        <textarea
          placeholder="Tasks Completed"
          value={tasks}
          onChange={(e) =>
            setTasks(e.target.value)
          }
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "15px",
            borderRadius: "10px",
            padding: "10px",
          }}
        />

        <textarea
          placeholder="Issues Faced"
          value={issues}
          onChange={(e) =>
            setIssues(e.target.value)
          }
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "15px",
            borderRadius: "10px",
            padding: "10px",
          }}
        />

        <textarea
          placeholder="Tomorrow Plan"
          value={tomorrowPlan}
          onChange={(e) =>
            setTomorrowPlan(e.target.value)
          }
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "25px",
            borderRadius: "10px",
            padding: "10px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <button
            onClick={startDay}
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >

            <FaPlay />

            {" "}Start Day

          </button>

          <button
            onClick={takeBreak}
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >

            <FaPause />

            {" "}Break

          </button>

          <button
            onClick={resumeWork}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >

            <FaPlay />

            {" "}Resume

          </button>

          <button
            onClick={clockOut}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >

            <FaSignOutAlt />

            {" "}Clock Out

          </button>

        </div>

      </div>

    </div>
  );
}