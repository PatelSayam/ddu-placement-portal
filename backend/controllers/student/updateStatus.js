const Student = require("../../models/student/student.model"); // Import the Student model

// Controller function to update the round status for a student
async function updateRoundStatus(req, res) {
  const { studentId, companyId, roundName, status } = req.body; // Extract data from the request body

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send("Student not found.");
    }

    // Check if the student has applied to the given company
    if (!student.appliedTo.has(companyId)) {
      return res.status(404).send("Student has not applied to this company.");
    }

    // Get the company's application info from the student
    const companyApplication = student.appliedTo.get(companyId);

    // Check if the company has any rounds
    if (!companyApplication.rounds || companyApplication.rounds.length === 0) {
      return res.status(404).send("No rounds found for this company.");
    }

    // Find the round to update based on the roundName
    const roundIndex = companyApplication.rounds.findIndex(
      (round) => round.roundName === roundName
    );

    // If the round is not found
    if (roundIndex === -1) {
      return res.status(404).send("Round not found.");
    }

    // Update the round status
    companyApplication.rounds[roundIndex].status = status;

    // Save the updated student document
    await student.save();

    return res.status(200).send("Round status updated successfully.");
  } catch (err) {
    console.error("Error updating round status:", err);
    return res.status(500).send("Error updating round status.");
  }
}

// Controller function to get rounds for a student in a specific company
async function getStudentRounds(req, res) {
  const { studentId, companyId } = req.params;

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send("Student not found.");
    }

    // Check if the student has applied to the given company
    if (!student.appliedTo.has(companyId)) {
      return res.status(404).send("Student has not applied to this company.");
    }

    // Get the application details for the company
    const companyApplication = student.appliedTo.get(companyId);

    // Return the rounds for this company
    return res.status(200).json(companyApplication.rounds || []);
  } catch (err) {
    console.error("Error retrieving student rounds:", err);
    return res.status(500).send("Error retrieving student rounds.");
  }
}

module.exports = {
  updateRoundStatus,
  getStudentRounds,
};
