const router = require("express").Router();
// router can be used to define routes and middlewares
const Admin = require("../../models/admin/admin.model");
const generator = require("generate-password");

const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, msg: NO_UID });
  }

  Admin.findOne({ _id: id })
    .then((foundAdmin) => {
      return res.json({ success: true, data: foundAdmin });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
}); 

// register admin
router.post("/", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    department,
    designation,
    dateOfBirth,
    email,
    phoneNumber,
    address1,
    address2,
    address3,
    city,
    pincode,
  } = req.body;

  if (!email) return res.json({ success: false, msg: NO_EMAIL });

  const adminFound = await Admin.findOne({ email: email });

  if (adminFound) {
    return res.json({ success: false, msg: DUPLICATE_STUDENT });
  }

  // generate a random password
  const password = generator.generate({
    length: 10,
    lowercase: true,
    uppercase: true,
    symbols: true,
    numbers: true,
    strict: true,
  });

  const tempAdmin = new Admin({
    firstName,
    middleName,
    lastName,
    gender,
    department,
    designation,
    dateOfBirth,
    email,
    password,
    phoneNumber,
    address1,
    address2,
    address3,
    city,
    pincode,
  });

  try {
    const savedAdmin = await tempAdmin.save();
    res.json({ success: true, data: savedAdmin});
  } catch (error) {
    res.json({ success: false, error});
  }  
});

// update the existing admin
router.put("/", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    password,
    department,
    designation,
    dateOfBirth,
    email,
    phoneNumber,
    address1,
    address2,
    address3,
    city,
    pincode,
  } = req.body;

  if (!email) return res.json({ success: false, msg: NO_EMAIL });

  await Admin.findOneAndUpdate(
    { email },
    {
      firstName,
      middleName,
      lastName,
      gender,
      password,
      department,
      designation,
      dateOfBirth,
      phoneNumber,
      address1,
      address2,
      address3,
      city,
      pincode,
    },
    { new: true } // means updated document is returned not the original one
  )
    .then((updatedAdmin) => res.json({ success: true, data: updatedAdmin }))
    .catch((error) => res.json({ success: false, error }));
});

module.exports = router;
