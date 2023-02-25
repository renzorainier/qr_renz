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

return (
  <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
    <button className="bg-white"
      disabled
      type="button"
      class="text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-white-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-white-900 dark:hover:bg-white-700 dark:focus:ring-white-900 inline-flex items-center"
    >
      <svg
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  </div>
);"

