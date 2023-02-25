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