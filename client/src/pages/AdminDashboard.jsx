<td>

  <span
    style={{

      padding: "6px 14px",

      borderRadius: "30px",

      fontSize: "14px",

      fontWeight: "600",

      display: "inline-block",

      minWidth: "130px",

      textAlign: "center",

      color: "white",




      background:

        item.status === "Working"
        ? "#22c55e"

        : item.status === "Break"
        ? "#f59e0b"

        : item.status === "Completed"
        ? "#3b82f6"

        : item.status === "Half Day"
        ? "#a855f7"

        : "#ef4444"
    }}
  >

    {

      item.status === "Working"
      ? "🟢 Working"

      : item.status === "Break"
      ? "☕ Break"

      : item.status === "Completed"
      ? "✅ Completed"

      : item.status === "Half Day"
      ? "🟣 Half Day"

      : "🔴 Not Working"
    }

  </span>

</td>