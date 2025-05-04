const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const deleteStudentById = async (req, res) => {
  const { stuId } = req.params;

  if (!stuId || !mongoose.isValidObjectId(stuId)) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  try {
    const result = await Student.findOneAndDelete({ _id: stuId});
    
    if(!result) {
      return res.status(404).json({ success: false, msg: "Student not found"});
    }

    return res.statsu(200).json({ success: true, msg: "student is found"});    
  } catch (error) {
    console.error("err >> ", err);
    return res
      .status(500)
      .json({ success: false,  msg: "Server error", err: err.message });
  }

};

module.exports = { deleteStudentById };
