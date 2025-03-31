const {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const { default: mongoose } = require("mongoose");
const { setStudentsElligibility } = require("../../utils/company.utils");

const registerNewCompany = async (req, res) => {
  const { name, website, email, forBatch, description, roles, address } =
    req.body;  

  //await setStudentsElligibility(roles, forBatch); 

  const tempCompany = new Company({
    name,
    website,
    email,
    forBatch,
    description,
    address,
    roles,
  });
  console.log(`name is ${name} website is ${website} email is ${email} forBatch is ${forBatch} description is ${description} address is ${address} roles is ${roles}`);

  console.log("tempcompany is", tempCompany)

  tempCompany
    .save()
    .then((savedCompany) => {
      console.log("savedCompany is", savedCompany)
      res.json({ success: true, data: savedCompany });
    })
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { registerNewCompany };
