import axios from 'axios';
import { useState } from 'react';

export default function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const [attendanceId, setAttendanceId] =
    useState('');

  const [status, setStatus] =
    useState('Working');

  const handleClockIn = async () => {

    try {

      const res = await axios.post(
        'http://localhost:5000/api/attendance/clock-in',
        {
          userId: user.id,
userName: user.name
        }
      );

      setAttendanceId(res.data.id);

      alert('Clocked In');

    } catch (error) {

      alert('Clock In Failed');

    }
  };

  const handleClockOut = async () => {

    try {

      await axios.post(
        'http://localhost:5000/api/attendance/clock-out',
        {
          attendanceId
        }
      );

      alert('Clocked Out');

    } catch (error) {

      alert('Clock Out Failed');

    }
  };

  const updateStatus = async () => {

    try {

      await axios.post(
        'http://localhost:5000/api/attendance/update-status',
        {
          attendanceId,
          status
        }
      );

      alert('Status Updated');

    } catch (error) {

      alert('Update Failed');

    }
  };

  return (

    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >

      <h1>
        Welcome {user?.name}
      </h1>

      <h2>
        Attendance Dashboard
      </h2>

      <div
        style={{
          marginTop: '30px'
        }}
      >

        <button
          onClick={handleClockIn}
          style={buttonStyle}
        >
          Clock In
        </button>

        <button
          onClick={handleClockOut}
          style={buttonStyle}
        >
          Clock Out
        </button>

      </div>

      <div
        style={{
          marginTop: '20px'
        }}
      >

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={{
            padding: '10px',
            marginRight: '10px'
          }}
        >

          <option>
            Working
          </option>

          <option>
            Break
          </option>

          <option>
            Meeting
          </option>

          <option>
            Offline
          </option>

        </select>

        <button
          onClick={updateStatus}
          style={buttonStyle}
        >
          Update Status
        </button>

      </div>

    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  marginRight: '10px',
  background: 'black',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};