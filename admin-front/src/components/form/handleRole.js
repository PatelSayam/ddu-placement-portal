export const handleAddRole = (e, rolesWatch, setValue) => {
  e.preventDefault();
  
  // Ensure rolesWatch is always an array
  let roles = Array.isArray(rolesWatch) ? rolesWatch : [];

  // Create a new role object
  let role = {
    name: "",
    avgPackage: 0,
    type: "",
    mode: "",
    bonds: 0,
    deadline: "",
    interviewDate: "",
    interviewMode: "",
    requirements: {
      cpi: 0,
      twelfthPerc: 0,
      competitiveCoding: [],
      expectedSkills: "",
    },
  };

  let updatedRoles = [...roles, role];

  setValue("roles", updatedRoles);
};


export const handleRemoveRole = (e, roleIndex, rolesWatch, setValue) => {
  e.preventDefault();

  // Filter out the role at the specified index
  let updatedRoles = rolesWatch.filter((role, index) => index !== roleIndex);

  // Set the updated roles array using setValue
  setValue("roles", updatedRoles);
};