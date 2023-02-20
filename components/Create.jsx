import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "student1", name: "ALARCON, RHYZEA", section: "ST-1B" },
    { id: "student2", name: "BANTOG, THAMZ JAZLEY", section: "ST-1B" },
    { id: "student3", name: "BUCOG, JESSIELYN", section: "ST-1B" },
    { id: "student4", name: "BUAL, GABRIEL JOHN", section: "ST-1B" },
    { id: "student5", name: "DAEP, CASSANDRA", section: "ST-1B" },
    { id: "student6", name: "CAMIRING, LEO", section: "ST-1B" },
    { id: "student7", name: "EDANG, CHESKA", section: "ST-1B" },
    { id: "student8", name: "DELA CRUZ, MICHAEL", section: "ST-1B" },
    { id: "student9", name: "GALARION, MIRALYN", section: "ST-1B" },
    { id: "student10", name: "DOMINGO, EZEKIEL", section: "ST-1B" },
    { id: "student11", name: "LOGRONIO, JENNIFER", section: "ST-1B" },
    { id: "student12", name: "GA, JAZPER SID", section: "ST-1B" },
    { id: "student13", name: "MEDALLADA, ANDREA", section: "ST-1B" },
    { id: "student14", name: "GELAGA, MARK AARON", section: "ST-1B" },
    { id: "student15", name: "MERIOLES, KEZEAH", section: "ST-1B" },
    { id: "student16", name: "MALLARI, JHAZREAL", section: "ST-1B" },
    { id: "student17", name: "NALZARO, CHRISTIAN", section: "ST-1B" },
    { id: "student18", name: "VALLECERA, ROEL", section: "ST-1B" },
    { id: "student19", name: "INAS, JUSTIN", section: "ST-1B" },
    { id: "student20", name: "BELDA, CAMILLE SHAINNE", section: "ST-1B" },
    { id: "student21", name: "FURAQUE, REYNALDO JR", section: "ST-1B" },
    { id: "student22", name: "ARBOLEDA, JERICHO", section: "ST-1B" },
    { id: "student23", name: "BATALLER, ADRIAN", section: "ST-1B" },
    { id: "student24", name: "BULATAO, ALEXA", section: "ST-1B" },
    { id: "student25", name: "CALIO, JOHN PAUL", section: "ST-1B" },
    { id: "student26", name: "DAGOOC, SHARMAINE", section: "ST-1B" },
    { id: "student27", name: "CARAGAN, AARON", section: "ST-1B" },
    { id: "student28", name: "ESPONILLA, ALYSSA", section: "ST-1B" },
    { id: "student29", name: "DINDO, JOMAR", section: "ST-1B" },
    { id: "student30", name: "HULLEZA, PRECIOUS", section: "ST-1B" },
    { id: "student31", name: "LOPEZ, ERIN", section: "ST-1B" },
    { id: "student32", name: "LONQUINO, KLAUS", section: "ST-1B" },
    { id: "student33", name: "MENDI, CELINE JOY", section: "ST-1B" },
    { id: "student34", name: "POLINAR, MARJORIE", section: "ST-1B" },
    { id: "student35", name: "MALICDEM, CARLO", section: "ST-1B" },
    { id: "student36", name: "PASAGDAN, RENZ RAINIER", section: "ST-1B" },
    { id: "student37", name: "SAMANIEGO, SEAN", section: "ST-1B" },
    { id: "student38", name: "PUREZA, XEDRICK", section: "ST-1B" },
    { id: "student39", name: "ILAO, GIAN RUSSEL", section: "ST-1B" },
    { id: "student40", name: "REGIS, YESTIN GABRIEL", section: "ST-1B" }
  ]);

  const createCollection = async () => {
    const studentsCollectionRef = collection(db, "students");
    const batch = [];

    students.forEach((student) => {
      const studentRef = doc(studentsCollectionRef, student.id);
      batch.push(setDoc(studentRef, { present: false, name: student.name, section: student.section }));
    });
    try {
      await Promise.all(batch);
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
    </div>
  );
}

export default StudentCollection;

