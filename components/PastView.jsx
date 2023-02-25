import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase.js";

function PastAttendance() {
  const [pastAttendance, setPastAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchPastAttendance = async () => {
      const dateStr = selectedDate.toISOString().slice(0, 10);
      const attendanceDocRef = doc(db, "presentStudents", dateStr);
      const attendanceDocSnapshot = await getDoc(attendanceDocRef);
      if (attendanceDocSnapshot.exists()) {
        const attendanceData = attendanceDocSnapshot.data();
        const presentStudents = attendanceData.presentStudents.map(
          (student) => ({
            ...student,
            lastScan: student.lastScan.toDate(),
            section: student.section,
          })
        );
        presentStudents.sort((a, b) => b.lastScan - a.lastScan);
        setPastAttendance(presentStudents);
      } else {
        setPastAttendance([]);
      }
    };

    fetchPastAttendance();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
    <h2 className="text-gray-700 text-xl font-bold mb-4">Past Attendance</h2>
    <div className="flex items-center mb-4">
      <label htmlFor="attendanceDate" className="block mr-4 font-medium text-gray-700">
        Select a date:
      </label>
      <input
        type="date"
        id="attendanceDate"
        name="attendanceDate"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={handleDateChange}
        className=" text-gray-700 border border-gray-400 px-2 py-1 rounded-lg"
      />
    </div>
    {pastAttendance.length > 0 ? (
      <ul className="divide-y divide-gray-200">
        {pastAttendance.map((student) => (
          <li key={student.id} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 text-lg font-bold">{student.name}</h3>
                <p className="text-gray-700">
                  {student.lastScan
                    ? `Last Scan: ${student.lastScan.toLocaleTimeString()}`
                    : "Not yet scanned"}
                </p>
                <p className="text-gray-700">
                  {student.section}
                </p>
              </div>
              <span className="text-gray-700">{student.section}</span>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700">No attendance records found for this date.</p>
    )}
  </div>
</div>
);

}