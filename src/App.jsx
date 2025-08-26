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
  
  { name: "Tamil", credit: 3 },
  { name: "English", credit: 3 },
  { name: "Environmental Studies", credit: 2 },
  { name: "Human Rights", credit: 2 },
  { name: "Naan Mudhalvan Courses", credit: 2 },
  { name: "Value Education", credit: 2 },
  { name: "Advanced Tamil (Or) Non-major elective", credit: 2 },
  { name: "Extension Activities", credit: 2 },
  { name: "Physical Education", credit: 2 },
  { name: "Yoga", credit: 2 },
  { name: "Life Skills", credit: 2 },
  { name: "Cultural Activities", credit: 2 },   
  { name: "Programming in C", credit: 4 },
  { name: "Programming in C++", credit: 4 },
  { name: "Java Programming", credit: 4 },
  { name: "Python Programming", credit: 4 },
  { name: "Data Structures", credit: 4 },
  { name: "Operating Systems", credit: 4 },
  { name: "Database Management Systems", credit: 4 },
  { name: "Computer Networks", credit: 4 },
  { name: "Software Engineering", credit: 3 },
  { name: "Web Technology", credit: 3 },
  { name: "Cloud Computing", credit: 3 },
  { name: "Machine Learning", credit: 3 },
  { name: "Artificial Intelligence", credit: 3 },
  { name: "Computer Architecture", credit: 3 },
  { name: "Compiler Design", credit: 3 },
  { name: "Mobile App Development", credit: 3 },
  { name: "Project Work", credit: 6 },
  { name: "Internship", credit: 2 },
  { name: "Cyber Law and Ethics", credit: 2 },
  { name: "Information Security", credit: 3 },
  { name: "Big Data Analytics", credit: 3 },
  { name: "Internet of Things (IoT)", credit: 3 },
  { name: "Data Science", credit: 3 },
  { name: "Digital Marketing", credit: 3 },
  { name: "Entrepreneurship Development", credit: 2 },
  { name: "Soft Skills", credit: 2 },
  { name: "Professional Communication", credit: 2 },
  { name: "Quantitative Aptitude", credit: 2 },
  { name: "Logical Reasoning", credit: 2 },
  { name: "Personality Development", credit: 2 },
  { name: "Team Building Activities", credit: 2 },
  { name: "Programming in C Lab", credit: 2 },
  { name: "Programming in C++ Lab", credit: 2 },
  { name: "Java Programming Lab", credit: 2 },
  { name: "Python Programming Lab", credit: 2 },
  { name: "Data Structures Lab", credit: 2 },     
  { name: "Mathematical Structures for Computer Science", credit: 4 },
  { name: "Discrete Mathematics", credit: 4 },
  { name: "Naan Mudhalvan Skill Course", credit: 2 },
  { name: "RDBMS & Oracle", credit: 4 },
  { name: "Visual Basic", credit: 4 },
  { name: "Mobile / Distributed Computing", credit: 3 },
  { name: "Network Security & Management", credit: 3 },
  { name: "Graphics & Multimedia", credit: 4 },
  { name: "Project Work Lab", credit: 4 },
  { name: "Cyber Security", credit: 2 },
  { name: "Middleware Technologies / Animation Techniques / Computer Installation & Servicing", credit: 3 },
  { name: "Data Mining / Embedded Systems / Internet of Things (IoT)", credit: 3 },
  { name: "Financial Accounting", credit: 4 },
  { name: "Corporate Accounting", credit: 4 },
  { name: "Business Communication", credit: 3 },
  { name: "Principles of Management", credit: 4 },
  { name: "Business Law", credit: 3 },
  { name: "Banking and Insurance", credit: 3 },
  { name: "Income Tax Law and Practice", credit: 4 },
  { name: "Cost Accounting", credit: 4 },
  { name: "Auditing", credit: 3 },
  { name: "Management Accounting", credit: 4 },
  { name: "Indirect Taxes", credit: 3 },
  { name: "Entrepreneurial Development", credit: 3 },
  { name: "Financial Management", credit: 4 },
  { name: "Human Resource Management", credit: 4 },
  { name: "Marketing Management", credit: 4 },
  { name: "Organizational Behavior", credit: 4 },
  { name: "Economics for Executives", credit: 4 },
  { name: "Quantitative Techniques for Management", credit: 4 },
  { name: "Production and Materials Management", credit: 3 },
  { name: "Taxation Law and Practice", credit: 3 },
  { name: "Financial Accounting Package (Tally-Practical only)", credit: 2 },
  { name: "Cost & Management Accounting", credit: 4 },
  { name: "Research Methods for Management", credit: 4 },
  { name: "Advertising and Sales Promotion", credit: 4 },
  { name: "Business Correspondence", credit: 4 },
  { name: "Entrepreneurship and Small Business Management", credit: 4 },
  { name: "Financial Management", credit: 4 },
  { name: "Services Marketing", credit: 4 },
  { name: "E-Commerce", credit: 3 },
  { name: "Computer Applications in Business", credit: 3 },
  { name: "Software Development in Business", credit: 3 },
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
  i
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
