import { useState, useEffect } from "react";
import "./App.css";

const gradePoints = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0,
  "F": 0.0,
};

const subjectList = [
  { name: "Mathematics", credit: 4 },
  { name: "Physics", credit: 3 },
  { name: "Chemistry", credit: 3 },
  { name: "Biology", credit: 3 },
  { name: "English", credit: 2 },
  { name: "Computer Science", credit: 3 },
  { name: "History", credit: 2 },
  { name: "Geography", credit: 2 },
  { name: "Economics", credit: 2 },
  { name: "Education", credit: 2 }
];

function App() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("gpa_courses");
    return saved ? JSON.parse(saved) : [{ name: "", grade: "A", credit: 0 }];
  });
  const [gpa, setGpa] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(Array(1).fill(false));

  useEffect(() => {
    localStorage.setItem("gpa_courses", JSON.stringify(courses));
  }, [courses]);

  const calculateGPA = () => {
    let points = 0, credits = 0;
    courses.forEach(c => {
      points += gradePoints[c.grade] * c.credit;
      credits += c.credit;
    });
    setTotalCredits(credits);
    setTotalPoints(points.toFixed(2));
    setGpa(credits ? (points / credits).toFixed(3) : "0.000");
  };
  const addCourse = () => {
    if (courses.length >= 20) {
      alert("You can only add up to 20 subjects!");
      return;
    }
    setCourses([...courses, { name: "", grade: "A", credit: 0 }]);
    setShowSuggestions([...showSuggestions, false]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    setShowSuggestions(showSuggestions.filter((_, i) => i !== index));
  };

  const handleNameChange = (index, value) => {
    const updated = [...courses];
    updated[index].name = value;

    const subject = subjectList.find(s => s.name.toLowerCase() === value.toLowerCase());
    updated[index].credit = subject ? subject.credit : 0;

    setCourses(updated);

    const suggestionsState = [...showSuggestions];
    suggestionsState[index] = true;
    setShowSuggestions(suggestionsState);
  };

  const hideSuggestions = (index) => {
    const suggestionsState = [...showSuggestions];
    suggestionsState[index] = false;
    setShowSuggestions(suggestionsState);
  };

  return (
    <div className="container">
      <h1>📘 Modern GPA Calculator</h1>
      {/* Grade Info Card */}
      <div className="grade-info-card">
        <h2>Grade Value Table</h2>
        <table className="grade-table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Point Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(gradePoints).map(([grade, value]) => (
              <tr key={grade}>
                <td>{grade}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Subject:{courses.length}</p>
      <div className="courses-wrapper">
        {courses.map((course, index) => (
          <div key={index} className="course-card" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onBlur={() => setTimeout(() => hideSuggestions(index), 100)}
              onFocus={() => {
                const suggestionsState = [...showSuggestions];
                suggestionsState[index] = true;
                setShowSuggestions(suggestionsState);
                
              }}
              className="course-input"
              autoComplete="off"
            />
            {course.name && showSuggestions[index] && (
              <div className="suggestions">
                {subjectList
                  .filter(s => s.name.toLowerCase().includes(course.name.toLowerCase()))
                  .slice(0, 8)
                  .map((s, i) => (
                    <div
                      key={i}
                      className="suggestion-item"
                      onMouseDown={() => {
                        handleNameChange(index, s.name);
                        hideSuggestions(index);
                      }}
                    >
                      {s.name} ({s.credit} Credits)
                    </div>
                  ))
                }
              </div>
            )}
            <select
              value={course.grade}
              onChange={(e) => {
                const updated = [...courses];
                updated[index].grade = e.target.value;
                setCourses(updated);
              }}
              className="grade-select"
            >
              {Object.keys(gradePoints).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              max="4"
              value={course.credit}
              onChange={e => {
                const updated = [...courses];
                updated[index].credit = Number(e.target.value);
                setCourses(updated);
              }}
              className="credit-input"
              style={{ width: 60, marginLeft: 8, marginRight: 8 }}
              title="Edit credits for custom subject"
            />
            <button className="remove-btn" onClick={() => removeCourse(index)}>✕</button>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="add-btn" onClick={addCourse}>+ Add Course</button>
        <button className="calc-btn" onClick={calculateGPA}>Calculate GPA</button>
      </div>
      {gpa && (
        <div className="results-box">
          <div className="result">
            🎯 Your GPA: {gpa}
          </div>
          <div className="result">
            📊 Total Credits: {totalCredits}
          </div>
          <div className="result">
            🏆 Total Grade Points: {totalPoints}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
