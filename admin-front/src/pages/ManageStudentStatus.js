// pages/ManageStudentStatus.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageStudentStatus = () => {
  const [students, setStudents] = useState([]); // List of students
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected student
  const [rounds, setRounds] = useState([]); // List of rounds for selected student
  const [status, setStatus] = useState(""); // Status message to display
  const [loading, setLoading] = useState(true); // Loading state for fetching students
  const [roundsLoading, setRoundsLoading] = useState(false); // Loading state for rounds data
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();

  // Fetch students when the page loads
  useEffect(() => {
    setLoading(true);
    axios.get("/api/admin/students") // API to get students (adjust endpoint if necessary)
      .then(response => {
        // Check if response data is valid
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setError("Failed to load students. Invalid data format.");
        }
      })
      .catch(error => {
        console.log("Error fetching students", error);
        setError("Error fetching students. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch rounds for the selected student
  useEffect(() => {
    if (selectedStudent) {
      setRoundsLoading(true);
      axios.get(`/api/student/${selectedStudent}/rounds`) // Adjust API as needed
        .then(response => {
          if (Array.isArray(response.data)) {
            setRounds(response.data);
          } else {
            setError("Failed to load rounds. Invalid data format.");
          }
        })
        .catch(error => {
          console.log("Error fetching rounds", error);
          setError("Error fetching rounds. Please try again.");
        })
        .finally(() => {
          setRoundsLoading(false);
        });
    }
  }, [selectedStudent]);

  // Handle status change for a round
  const handleStatusChange = (roundId, newStatus) => {
    axios.post(`/api/student/update-round-status`, {
      studentId: selectedStudent,
      roundId,
      status: newStatus,
    })
      .then(response => {
        setStatus(response.data.message);  // Display success/error message
        setRounds(response.data.updatedRounds);  // Update rounds state
      })
      .catch(error => {
        console.log("Error updating round status", error);
        setError("Error updating round status. Please try again.");
      });
  };

  return (
    <div className="admin-status-management">
      <h1>Manage Student Status</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : (
        <div>
          <div>
            <select onChange={e => setSelectedStudent(e.target.value)} defaultValue="">
              <option value="">Select a Student</option>
              {students.map(student => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div>
              <h2>Rounds for {students.find(s => s._id === selectedStudent)?.firstName}</h2>

              {roundsLoading ? (
                <p>Loading rounds...</p>
              ) : (
                <ul>
                  {rounds.length === 0 ? (
                    <li>No rounds found for this student.</li>
                  ) : (
                    rounds.map(round => (
                      <li key={round._id}>
                        {round.name} - Status: {round.status}
                        <button onClick={() => handleStatusChange(round._id, 'cleared')}>
                          Mark as Cleared
                        </button>
                        <button onClick={() => handleStatusChange(round._id, 'rejected')}>
                          Mark as Rejected
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {status && <p>{status}</p>} {/* Display the status message */}
    </div>
  );
};

export default ManageStudentStatus;