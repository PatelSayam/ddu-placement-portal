// Importing required libraries and models
const router = require("express").Router(); 
const Admin = require("../../models/admin/admin.model"); 
const Student = require("../../models/student/student.model"); 
const bcrypt = require("bcrypt"); // bcrypt for hashing and comparing passwords securely

const {
  NO_EMAIL, 
  NO_PASSWORD, 
  WRONG_CREDENTIALS, 
} = require("../../constants/constantsMessages");

// Route to get the current session details (e.g., whether user is logged in or not)
router.get("/get-session", (req, res) => {
  return res.json({ session: req.session }); // Return the session data as a JSON response
});

// Admin Login Route
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;   
  
  if (!email) return res.json({ success: false, msg: NO_EMAIL });    
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });
  
  try {  
    const foundAdmin = await Admin.findOne({ email: email });
    console.log(foundAdmin);
    if (!foundAdmin) {
      return res.json({ success: false, msg: WRONG_CREDENTIALS });
    }
        
    const isMatch = await bcrypt.compare(password.trim(), foundAdmin.password);

    if(!isMatch) {
      return res.json({ success: false, msg: WRONG_CREDENTIALS});
    }
    
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

  } catch(error) {
    return res.json({ success: false, error: error.message });
  }
});

// Student Login Route
router.post("/student/login", async (req, res) => {
  const { email, password } = req.body; 
  
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });
  
  try {    
    const foundStudent = await Student.findOne({ collegeEmail: req.body.email });
    
    if (!foundStudent) {
      return res.json({ success: false, msg: WRONG_CREDENTIALS });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, foundStudent.password);
    
    if (!isMatch) {
      return res.json({ success: false, msg: WRONG_CREDENTIALS });
    }

    // Set up the session for the student
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
    
    return res.json({ success: true, data: user });
  } catch (error) {    
    console.error(error);
    return res.json({ success: false, error: error.message });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy(); // Destroy the current session (log the user out)
  return res.json({ success: true }); // Send a success response
});

module.exports = router;
