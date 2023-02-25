import {useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase.js";


function TodayAttendance() {
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sections = ["1A", "1B", "2A"];

  useEffect(() => {
    const fetchAttendance = async () => {
      const presentStudents = [];
      for (const section of sections) {
        const presentStudentsQuery = query(
          collection(db, "strands", "STEM", section),
          where("present", "==", true)
        );
        const presentStudentsQuerySnapshot = await getDocs(
          presentStudentsQuery
        );
        presentStudents.push(
          ...presentStudentsQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            lastScan: doc.data().lastScan?.toDate() || null,
            section,
            strand: doc.data().strand,
          }))
        );
      }
      presentStudents.sort((a, b) => b.lastScan - a.lastScan);
      setTodayAttendance(presentStudents);
      setFilteredAttendance(presentStudents);
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    const filteredStudents = todayAttendance.filter(
      (student) =>
        (!selectedSection || student.section === selectedSection) &&
        (!searchQuery ||
          student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredAttendance(filteredStudents);
  }, [selectedSection, searchQuery, todayAttendance]);

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedAttendance = filteredAttendance.slice().sort((a, b) => {
    if (a.lastScan && b.lastScan) {
      return b.lastScan.getTime() - a.lastScan.getTime();
    } else if (a.lastScan) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
<div className="flex justify-between items-center mb-4">
  <div className="flex items-center flex-grow">
    <select
      value={selectedSection}
      onChange={handleSectionChange}
      className="border rounded-md py-1 px-2 text-gray-700 w-full"
    >
      <option value="">All</option>
      {sections.map((section) => (
        <option key={section} value={section}>
          {section}
        </option>
      ))}
    </select>
  </div>
  <div className="flex items-center flex-grow">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      className="border rounded-md py-1 px-2 text-gray-700 w-full"
      placeholder="Search by name"
    />
  </div>
</div>

        <div className="flex items-center">
          <label className="text-gray-700 font-bold mr-2">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="border rounded-md py-1 px-2 text-gray-700"
            placeholder="Search by name"
          />
        </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Strand</th>
              <th className="border p-2 ">Section</th>
              <th className="border p-2">Last Scan</th>
            </tr>
          </thead>
          <tbody>
            {sortedAttendance.map((student, index) => (
              <tr key={student.id}>
                <td className="border p-2">
                  {sortedAttendance.length - index}
                </td>
                <td className="border p-2" style={{ whiteSpace: "nowrap" }}>
                  {student.name}
                </td>
                <td className="border p-2">{student.strand}</td>
                <td className="border p-2 ">{student.section}</td>
                <td className="border p-2" style={{ whiteSpace: "nowrap" }}>
                  {student.lastScan
                    ? student.lastScan.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default TodayAttendance;