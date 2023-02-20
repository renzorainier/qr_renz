
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

function AttendanceViewer() {

  const [todayAttendance, setTodayAttendance] = useState([]);
  const [pastAttendance, setPastAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      const presentStudentsQuery = query(
        collection(db, "students"),
        where("present", "==", true)
      );
      const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
      const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        lastScan: doc.data().lastScan?.toDate() || null,
      }));
      presentStudents.sort((a, b) => b.lastScan - a.lastScan);
      setTodayAttendance(presentStudents);
    };

    fetchTodayAttendance();
  }, []);

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
    <div className="h-screen flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-gray-700 text-xl font-bold mb-4">Attendance For Today</h2>
        <ul className="divide-y divide-gray-200">
          {todayAttendance.map((student) => (
            <li key={student.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-700 text-lg font-bold">{student.name}</h3>
                  <p className="text-gray-700">
                    {student.lastScan
                      ? `Last Scan: ${student.lastScan.toLocaleTimeString()}`
                      : "Not yet scanned"}
                  </p>
                </div>
                <span className="text-gray-700">{}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-700">No attendance records found for this date.</p>
  )}

</div>
</div>
  )
}



export default AttendanceViewer


// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "./firebase.js";

// function AttendanceViewer() {
//   const [todayAttendance, setTodayAttendance] = useState([]);
//   const [pastAttendance, setPastAttendance] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     const fetchTodayAttendance = async () => {
//       const presentStudentsQuery = query(
//         collection(db, "students"),
//         where("present", "==", true)
//       );
//       const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
//       const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//         lastScan: doc.data().lastScan?.toDate() || null,
//       }));
//       presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//       setTodayAttendance(presentStudents);
//     };

//     fetchTodayAttendance();
//   }, []);

//   useEffect(() => {
//     const fetchPastAttendance = async () => {
//       const dateStr = selectedDate.toISOString().slice(0, 10);
//       const attendanceDocRef = doc(db, "presentStudents", dateStr);
//       const attendanceDocSnapshot = await getDoc(attendanceDocRef);
//       if (attendanceDocSnapshot.exists()) {
//         const attendanceData = attendanceDocSnapshot.data();
//         const presentStudents = attendanceData.presentStudents.map(
//           (student) => ({
//             ...student,
//             lastScan: student.lastScan.toDate(),
//           })
//         );
//         presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//         setPastAttendance(presentStudents);
//       } else {
//         setPastAttendance([]);
//       }
//     };

//     fetchPastAttendance();
//   }, [selectedDate]);

//   const handleDateChange = (event) => {
//     const date = new Date(event.target.value);
//     setSelectedDate(date);
//   };

//   return (
//     <div>
//       <div>
//         <h2>Today's Attendance</h2>
//         <ul>
//           {todayAttendance.map((student) => (
//             <li key={student.id}>
//               {student.name} - {student.lastScan?.toLocaleTimeString()} -{" "}
//               {student.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Past Attendance</h2>
//         <label htmlFor="attendanceDate">Select a date:</label>
//         <input
//           type="date"
//           id="attendanceDate"
//           value={selectedDate.toISOString().slice(0, 10)}
//           onChange={handleDateChange}
//         />
//         <ul>
//           {pastAttendance.map((student) => (
//             <li key={student.id}>
//               {student.name} -{" "}
//               {student.lastScan instanceof Date &&
//                 student.lastScan.toLocaleTimeString()}{" "}
//               - {student.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AttendanceViewer;



{/* <p className="text-xl font-bold mt-6">Scan result:</p>
<p className="text-xl">{data}</p>
<h1 className="text-3xl font-semibold mt-8">Recent Logs</h1>
<div className="bg-white rounded-lg shadow-lg mt-6 w-full max-w-md">
  <ul className="text-gray-700 divide-y divide-gray-300">
    {log.map((entry, index) => (
      <li key={entry.id} className="py-4 px-6">
        <span className="block font-semibold">{entry.info}</span>
      </li>
    ))}
  </ul>
</div>
</div>
); */}
