const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");
const verifyAdmin = require("../../middleware/verifyAdmin");
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");
const {
  registerNewStudentWithEmail,
} = require("../../controllers/student/registerNewStudentWithEmail");
const {
  updateStudentDetails,
} = require("../../controllers/student/updateStudentDetails");
const { getStudent } = require("../../controllers/student/getStudents");
const {
  getStudentApplications,
} = require("../../controllers/student/getStudentApplications");
const { updatePassword } = require("../../controllers/student/updatePassword");
const {
  deleteStudentById,
} = require("../../controllers/student/deleteStudentById");
const { forgetPassword } = require("../../controllers/student/forgetPassword");
const {
  uploadProfilePic,
} = require("../../controllers/student/uploadProfilePic");
const { uploadResume } = require("../../controllers/student/uploadResume");
const verifyLoggedIn = require("../../middleware/verifyLoggedIn");
const verifyStudent = require("../../middleware/verifyStudent");

// Import new controller functions for handling round status
const {
  updateRoundStatus,
  getStudentRounds,
} = require("../../controllers/student/updateStatus"); // Correct import

// Existing routes

router.get("/", verifyLoggedIn, getStudent);
router.delete("/:stuId", verifyAdmin, deleteStudentById);

// register new student with email
router.post("/new", verifyAdmin, registerNewStudentWithEmail);

// update the existing user
router.put("/update", verifyLoggedIn, updateStudentDetails);

// update password
router.put("/updatePassword", verifyLoggedIn, updatePassword);

// get student's applications with roles
router.get("/:stuId/applications", verifyLoggedIn, getStudentApplications);

router.post("/forgot-password", forgetPassword);

router.post("/profile-pic", verifyStudent, uploadProfilePic);
router.post("/resume", verifyStudent, uploadResume);

// New route to update round status for a student
router.post("/update-round-status", verifyLoggedIn, updateRoundStatus);

// New route to get the rounds for a student applying to a specific company
router.get(
  "/:stuId/companies/:companyId/rounds",
  verifyLoggedIn,
  getStudentRounds
);

module.exports = router;