import React, { useState, useEffect } from "react";
import "./App.css";

const gradePoints = {
  "O": 10.0, 
  "D+": 9.0, 
  "D": 8.0,
   "A+": 7.0, 
  "A": 6.0,
  "B": 5.0, 
  "U": 0.0,
  "ABSENT": 0.0,
};

const subjectList = [
  { name: "Tamil", credit: 2 },
  { name: "English", credit: 2 },
  { name: "Digital", credit: 3 },
  { name: "C proramming", credit: 4 },
  { name: "", credit: 4 },
  { name: "Java", credit: 4 },
  { name: "Linux", credit: 4 },
  { name: "Python", credit: 3 },
  { name: "C++", credit: 4 },
  { name: "Data Sturcture", credit: 4 },
  { name: "RDBMS", credit: 4 } ,
  { name: "Web programming", credit: 4 },
  { name: "", credit: 2 },
  { name: "Digital", credit: 3 },
  { name: "C proramming", credit: 4 },
  { name: "", credit: 4 },
  { name: "Java", credit: 4 },
  { name: "Linux", credit: 4 },
  { name: "Python", credit: 3 },
  { name: "C++", credit: 4 },
  { name: "Data Sturcture", credit: 4 },
  { name: "RDBMS", credit: 4 } 
];

function App() {
  const initialCourses = (() => {
    const saved = localStorage.getItem("gpa_courses");
    return saved ? JSON.parse(saved) : [{ name: "", grade: "A", credit: 0 }];
  })();

  const [courses, setCourses] = useState(initialCourses);
  const [gpa, setGpa] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(
    Array(initialCourses.length).fill(false)
  );
  const [showGradeInfo, setShowGradeInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem("gpa_courses", JSON.stringify(courses));
  }, [courses]);

  const calculateGPA = () => {
    let points = 0, credits = 0;
    courses.forEach(c => {
      if (c.credit > 0) {
        points += (gradePoints[c.grade] || 0) * c.credit;
        credits += c.credit;
      }
    });
    setTotalCredits(credits);
    setTotalPoints(points.toFixed(2));
    setGpa(credits ? (points / credits).toFixed(2) : "0.00");
  };

  const addCourse = () => {
    if (courses.length >= 50) {
      alert("Max 50 subjects to fit in one page!");
      return;
    }
    const next = [...courses, { name: "", grade: "A", credit: 1 }];
    setCourses(next);
    setShowSuggestions(prev => [...prev, false]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    setShowSuggestions(showSuggestions.filter((_, i) => i !== index));
  };

  const handleNameChange = (index, value) => {
    const updated = [...courses];
    updated[index].name = value;

    const subject = subjectList.find(
      s => s.name.toLowerCase() === value.toLowerCase()
    );
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

  const clearAll = () => {
    setCourses([{ name: "", grade: "A", credit: 0 }]);
    setGpa(null);
    setTotalCredits(0);
    setTotalPoints(0);
    setShowSuggestions([false]);
    localStorage.removeItem("gpa_courses");
  };

  return (
    <div className="compact-app">
      <h1><strong>GPA </strong>Calculator</h1>
      <div className="compact-grid">
      
        <div className="compact-inputs">
          <div className="compact-head">
            <p>Subjects: {courses.length} / 50</p>
            <button className="small-btn" onClick={addCourse} type="button">+</button>
          </div>

          {courses.map((course, index) => (
            <div key={index} className="compact-row">
              <div className="tiny-input-wrap">
                <input
                  type="text"
                  placeholder="Course"
                  value={course.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  onBlur={() => setTimeout(() => hideSuggestions(index), 100)}
                  onFocus={() => {
                    const state = [...showSuggestions];
                    state[index] = true;
                    setShowSuggestions(state);
                  }}
                  className="tiny-input"
                  autoComplete="off"
                />
                {course.name && showSuggestions[index] && (
                  <div className="tiny-suggestions" role="listbox">
                    {subjectList
                      .filter(s => s.name.toLowerCase().includes(course.name.toLowerCase()))
                      .slice(0, 5)
                      .map((s, i) => (
                        <div
                          key={i}
                          className="tiny-suggestion"
                          role="option"
                          onMouseDown={() => {
                            handleNameChange(index, s.name);
                            hideSuggestions(index);
                          }}
                        >
                          {s.name} ({s.credit})
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <select
                value={course.grade}
                onChange={(e) => {
                  const updated = [...courses];
                  updated[index].grade = e.target.value;
                  setCourses(updated);
                }}
                className="tiny-select"
              >
                {Object.keys(gradePoints).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                max="4"
                step="0.5"
                value={course.credit}
                onChange={e => {
                  const updated = [...courses];
                  const val = Number(e.target.value);
                  updated[index].credit = Number.isNaN(val) ? 0 : val;
                  setCourses(updated);
                }}
                className="tiny-credit"
                title="Credits (0–4)"
              />

              <button
                className="small-btn danger"
                onClick={() => removeCourse(index)}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="compact-buttons">
            <button className="small-btn" onClick={addCourse} type="button">+</button>
            <button className="small-btn primary" onClick={calculateGPA} type="button">=</button>
            <button
              className="small-btn warn"
              onClick={() => setShowGradeInfo((prev) => !prev)}
              type="button"
            >
              {showGradeInfo ? "!" : "!"}
            </button>
            <button
              className="clbtn"
              onClick={clearAll}
              type="button"
            >
              Clear All
            </button>
          </div>
        </div>

       
        <div className="compact-results">
          {gpa && (
            <div className="result-box">
              <p><b>GPA:</b> {gpa}</p>
              <p><b>Credits:</b> {totalCredits}</p>
              <p><b>Points:</b> {totalPoints}</p>
            </div>
          )}

          {showGradeInfo && (
            <table className="tiny-table">
              <thead>
                <tr><th>Grade</th><th>Value</th></tr>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
