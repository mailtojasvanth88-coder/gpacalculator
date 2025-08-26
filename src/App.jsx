import React, { useState, useEffect } from "react";
import "./App.css";
import { FaInfoCircle } from "react-icons/fa";





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
  // Semester I
  { name: "Language I", credit: 4 },
  { name: "English I", credit: 4 },
  { name: "Computing Fundamentals and C Programming", credit: 4 },
  { name: "Digital Fundamentals and Computer Architecture", credit: 4 },
  { name: "Programming Lab - C", credit: 4 },
  { name: "Mathematical Structures for Computer Science", credit: 4 },
  { name: "Environmental Studies", credit: 2 },

  // Semester II
  { name: "Language II", credit: 4 },
  { name: "English II", credit: 4 },
  { name: "C++ Programming", credit: 4 },
  { name: "Programming Lab - C++", credit: 2 },
  { name: "Internet Basics", credit: 2 },
  { name: "Discrete Mathematics", credit: 4 },
  { name: "Value Education - Human Rights", credit: 2 },

  // Semester III
  { name: "Language III", credit: 4 },
  { name: "English III", credit: 4 },
  { name: "Data Structures", credit: 4 },
  { name: "Java Programming", credit: 4 },
  { name: "Programming Lab - Java", credit: 2 },
  { name: "Computer Based Optimization Techniques", credit: 2 },
  { name: "Skill Based Subject 1", credit: 3 },
  { name: "Non-major Elective I (Yoga / Women’s Rights)", credit: 2 },

  // Semester IV
  { name: "Language IV", credit: 4 },
  { name: "English IV", credit: 2 },
  { name: "System Software and Operating System", credit: 4 },
  { name: "Linux and Shell Programming", credit: 3 },
  { name: "Programming Lab - Linux and Shell", credit: 2 },
  { name: "Business Accounting", credit: 2 },
  { name: "Skill Based Subject 2 - Web Programming", credit: 2 },
  { name: "Non-major Elective II (General Awareness)", credit: 2 },

  // Semester V
  { name: "RDBMS and Oracle", credit: 4 },
  { name: "Visual Basic", credit: 3 },
  { name: "Programming Lab - VB & Oracle", credit: 4 },
  { name: "Elective I - Compiler Design / PHP & Python Programming", credit: 4 },
  { name: "Skill Based Subject 3 - CASE Tools", credit: 3 },

  // Semester VI
  { name: "Graphics & Multimedia", credit: 4 },
  { name: "Project Work Lab", credit: 4 },
  { name: "Programming Lab - Graphics & Multimedia", credit: 3 },
  { name: "Elective II - Computer Networks / Dot Net", credit: 4 },
  { name: "Elective III - IoT / Web Services / Software Testing", credit: 4 },
  { name: "Skill Based Subject 4 - CASE Tools Lab", credit: 2 },
  { name: "Extension Activities", credit: 2 }
];


function App() {
  const initialCourses = (() => {
    const saved = localStorage.getItem("gpa_courses");
    return saved ? JSON.parse(saved) : [{ name: "", grade: "A", credit: "" }];
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
  let points = 0;
  let credits = 0;

  courses.forEach(c => {
    const credit = (c.credit) || 0; if (credit <= 0); 

    const gradePoint = gradePoints[c.grade] ?? 0;

    if (gradePoint > 0) {
     
      points += gradePoint * credit;
      credits += credit;
    }
    
  });

  setTotalCredits(credits);
  setTotalPoints(points.toFixed(2));
  setGpa(credits > 0 ? (points / credits).toFixed(2) : "0.00");
};


  const addCourse = () => {
    if (courses.length >= 50) {
      alert("Max 50 subjects to fit in one page!");
      return;
    }
    const next = [...courses, { name: "", grade: "A", credit: "" }];
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
                placeholder="Credits"
                min="1"
                max="4"
                step="0.5"
                value={course.credit}
                onChange={e => {
                  const updated = [...courses];
                  const val = Number(e.target.value);
                  updated[index].credit = Number.isNaN(val) ? 0 : val;
                  setCourses(updated);
                  if(val < 1 || val > 4){
                    alert("Credit must be between 1 and 4");
                    updated[index].credit = "";
                    setCourses(updated);



                  }
                }}
                
                className="tiny-credit"
                title="Credits (1-4)"
              />

              <button
                className="small-btn danger"
                onClick={() => removeCourse(index)}
                type="button"
              >
                ✕
              </button>
               <button className="small-btns" onClick={addCourse} type="button">+</button>
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
              {showGradeInfo ? (
  <FaInfoCircle color="red" />
) : (
  <FaInfoCircle color="blue" />
 ) }


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
              <p><b>TOTAL<span>GPA</span>:</b> {gpa}</p>
              <p><b>TOTAL<span>CREDITS</span>:</b> {totalCredits}</p>
              <p><b>TOTAL<span>POINTS</span>:</b> {totalPoints}</p>
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
