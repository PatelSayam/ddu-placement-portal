const companyModel = require("../models/company/company.model");
const studentModel = require("../models/student/student.model");

const setStudentsElligibility = async (roles, forBatch) => {
  // Fetch all students for the specified batch (passing year)
  let allStudents = await studentModel.find({ passingYear: { $eq: forBatch } });

  // Iterate over the roles in the company
  roles?.forEach((role, index) => {
    let students = new Map();

    //Iterate over all students to check if they are eligible for the role
    allStudents?.forEach((student) => {
      // Check if the student is not already selected and meets the role requirements
      if (
        student.placementStatus.selected === "no" &&
        student.result.cpi >= (role.requirements?.cpi || 0) &&
        ((student.result.twelthPerc != 0 &&
          student.result.twelthPerc >=
            (role.requirements?.twelfthPerc || 0)) ||
          (student.result.diplomaPerc != 0 &&
            student.result.diplomaPerc >=
              (role.requirements?.diplomaPerc || 0))) &&
        student.result.tenthPerc >= (role.requirements?.tenthPerc || 0)
      ) {
        let isSatisfies = true;

        // Check competitive coding requirements
        role.requirements?.competitiveCoding?.forEach((reqItem, index) => {
          let isSubSatisfies = false;
          student?.competitiveCoding?.forEach((stuItem) => {
            if (
              reqItem.platform.toLowerCase() === stuItem.platform.toLowerCase() &&
              stuItem.stars >= reqItem.stars &&
              stuItem.ratings >= reqItem.ratings
            ) {
              isSubSatisfies = true;
            }
          });
          isSatisfies = isSatisfies && isSubSatisfies;
        });

        // If all requirements are satisfied, mark the student as eligible
        if (isSatisfies) students.set(student._id, { isElligible: true });

        // else students.set(student._id, { isElligible: false });
      }
      // else {
      //   students.set(student._id, { isElligible: false });
      // }
    });

    // prepare list of eligible students
    let stuList = [];
    students.forEach((val, key) => {
      stuList.push(key);
    });
    
    // console.log("stuList : ", stuList);
    roles[index].elligibles = stuList;
    roles[index].applications = [];
  });
};

// checks if a specific student is eligible for a specific role in a company
const isElligible = async (companyId, roleId, stuId) => {
  // Find the company with the specified role
  const company = await companyModel.findOne({
    _id: companyId,
    "roles._id": roleId,
  });

  let check = false;

  // Iterate over the roles in the company
  company.roles.forEach((role) => {
    if (role._id == roleId) {
      // Check if the student ID is in the list of eligible students for the role
      role.elligibles.forEach((elliId) => {
        if (elliId == stuId) check = true;
      });
    }
  });

  return check;
};

module.exports = { isElligible, setStudentsElligibility };
