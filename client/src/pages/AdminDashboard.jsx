import { useEffect, useState } from 'react';

import axios from 'axios';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

export default function AdminDashboard() {

  const [records, setRecords] =
    useState([]);

  useEffect(() => {

    fetchAttendance();

    const interval = setInterval(() => {
      fetchAttendance();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/attendance/all'
      );

      setRecords(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(records);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Attendance'
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    saveAs(
      fileData,
      'attendance-report.xlsx'
    );
  };

  const getStatusColor = (status) => {

    switch (status) {

      case 'Working':
        return '#00c853';

      case 'Break':
        return '#ff9800';

      case 'Meeting':
        return '#2196f3';

      case 'Offline':
        return '#f44336';

      default:
        return '#999';
    }
  };

  return (

    <div
      style={{
        background: '#121212',
        minHeight: '100vh',
        color: 'white',
        padding: '30px',
        fontFamily: 'Arial'
      }}
    >

      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center'
        }}
      >

        <h1>
          Admin Dashboard
        </h1>

        <button
          onClick={exportExcel}
          style={{
            padding: '12px 20px',
            background: '#00c853',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Export Excel
        </button>

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px,1fr))',
          gap: '20px',
          marginTop: '30px'
        }}
      >

        <div style={cardStyle}>
          <h2>
            {records.length}
          </h2>
          <p>Total Records</p>
        </div>

        <div style={cardStyle}>
          <h2>
            {
              records.filter(
                r => r.status === 'Working'
              ).length
            }
          </h2>
          <p>Working Employees</p>
        </div>

        <div style={cardStyle}>
          <h2>
            {
              records.filter(
                r => r.status === 'Break'
              ).length
            }
          </h2>
          <p>On Break</p>
        </div>

      </div>

      <div
        style={{
          marginTop: '30px',
          background: '#1e1e1e',
          padding: '20px',
          borderRadius: '12px',
          overflowX: 'auto'
        }}
      >

        <table
          width="100%"
          cellPadding="12"
        >

          <thead>

            <tr
              style={{
                background: '#333'
              }}
            >

              <th>Name</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Status</th>
              <th>Total Hours</th>

            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr
                key={record.id}
                style={{
                  textAlign: 'center'
                }}
              >

                <td>
                  {record.userName}
                </td>

                <td>
                  {record.date}
                </td>

                <td>
                  {record.clockIn}
                </td>

                <td>
                  {record.clockOut || '-'}
                </td>

                <td>

                  <span
                    style={{
                      background:
                        getStatusColor(
                          record.status
                        ),
                      padding:
                        '6px 12px',
                      borderRadius:
                        '20px'
                    }}
                  >
                    {record.status}
                  </span>

                </td>

                <td>
                  {
                    record.totalHours || 0
                  }
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
  background: '#1e1e1e',
  padding: '20px',
  borderRadius: '12px',
  textAlign: 'center'
};