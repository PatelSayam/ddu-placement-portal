// Importing required libraries and models
const router = require("express").Router(); // Router instance from Express to define routes
const Admin = require("../../models/admin/admin.model"); // Admin model for interacting with the admin data
const Student = require("../../models/student/student.model"); // Student model for interacting with the student data
const bcrypt = require("bcrypt"); // bcrypt for hashing and comparing passwords securely

// Importing constant messages used in the responses
const {
  NO_EMAIL, // Error message for missing email
  NO_PASSWORD, // Error message for missing password
  WRONG_CREDENTIALS, // Error message for incorrect credentials
} = require("../../constants/constantsMessages");

// Route to get the current session details (e.g., whether user is logged in or not)
router.get("/get-session", (req, res) => {
  return res.json({ session: req.session }); // Return the session data as a JSON response
});

// Admin Login Route
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  // If email is missing, send a response with error message
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  
  // If password is missing, send a response with error message
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });

  // Search for the admin in the database by email
  Admin.findOne({ email: email })
    .then((foundAdmin) => {
      // If the admin is not found, send an error response
      if (!foundAdmin)
        return res.json({ success: false, msg: WRONG_CREDENTIALS });

      // Compare the input password with the stored hashed password using bcrypt
      bcrypt.compare(password, foundAdmin.password, (err, isMatch) => {
        // If there is an error comparing passwords, return an error message
        if (err) return res.json({ success: false, msg: "Error comparing passwords" });

        // If the password doesn't match, return an error message
        if (!isMatch) return res.json({ success: false, msg: WRONG_CREDENTIALS });

        // If the password matches, create a session for the admin
        req.session.studentId = null; // Ensure no student session is active
        req.session.email = foundAdmin.email; // Set the admin email in the session
        req.session.isAdmin = true; // Mark the session as admin
        req.session.isStudent = false; // Mark the session as not a student
        req.session.adminId = foundAdmin._id; // Store the admin's unique ID in the session

        // Define the user object to return, including the admin's ID
        const user = {
          adminId: foundAdmin._id,
        };

        // Send a successful response with the user data (admin ID)
        return res.json({ success: true, data: user });
      });
    })
    .catch((error) => {
      // If there is an error during the database query, return an error response
      return res.json({ success: false, error: error });
    });
});

// Student Login Route
router.post("/student/login", async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  // If email is missing, send a response with error message
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  
  // If password is missing, send a response with error message
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });

  // Find the student by their college email in the database
  Student.findOne({ collegeEmail: email })
    .then((foundStudent) => {
      // If the student is not found, send an error response
      if (!foundStudent)
        return res.json({ success: false, msg: WRONG_CREDENTIALS });

      // Compare the input password with the stored hashed password using bcrypt
      bcrypt.compare(password, foundStudent.password, (err, isMatch) => {
        // If there is an error comparing passwords, return an error message
        if (err) return res.json({ success: false, msg: "Error comparing passwords" });

        // If the password doesn't match, return an error message
        if (!isMatch) return res.json({ success: false, msg: WRONG_CREDENTIALS });

        // If the password matches, create a session for the student
        req.session.email = foundStudent.collegeEmail; // Set the student's email in the session
        req.session.isAdmin = false; // Mark the session as not admin
        req.session.isStudent = true; // Mark the session as student
        req.session.studentId = foundStudent._id; // Store the student's unique ID in the session
        req.session.adminId = null; // Ensure no admin session is active

        // Define the user object to return, including the student's ID and verification status
        const user = {
          studentId: foundStudent._id,
          isVerified: foundStudent.isVerified, // Include student's verification status
        };

        // Send a successful response with the user data (student ID and verification status)
        return res.json({ success: true, data: user });
      });
    })
    .catch((error) => {
      // If there is an error during the database query, log the error and return an error response
      console.log(error);
      return res.json({ success: false, error: error });
    });
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy(); // Destroy the current session (log the user out)
  return res.json({ success: true }); // Send a success response
});

// Export the router to be used in the main application
module.exports = router;
