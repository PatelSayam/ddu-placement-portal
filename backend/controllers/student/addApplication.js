const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");

const addApplication = async (req, res) => {
    const { stuId, companyId, roleId } = req.params;    
    
    if (!mongoose.isValidObjectId(stuId)) {
        return res
          .status(INVALID_REQUEST_DATA_CODE)
          .json({ success: false, msg: INVALID_REQUEST_DATA });
      }
          // console.log(roleId)
    const company = await Company.findOne({ _id: companyId });
    const role = company?.roles?.find((role) => role._id == roleId);
    // console.log("role",role)
    // console.log("applications", role.applications)
    if(role?.applications.includes(stuId)) {
        return res.json({ success: false, message: "Already applied"});
    }
    
    role.applications.push(stuId);
    company.save();
    return res.json({ success: true, message: "Applied successfully"});
}

module.exports = addApplication;