// Importing required modules
const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();
const session = require("express-session");
const app = express();

//Importing routes
const StudentRoute = require("./routes/student/student.route");
const AdminRoute = require("./routes/admin/admin.route");
const AuthRoute = require("./routes/auth/auth.route");
const CompanyRoute = require("./routes/company/company.route");
const ReportsRoute = require("./routes/reports/reports.route");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const verifyStudent = require("./middleware/verifyStudent");
const verifyAdmin = require("./middleware/verifyAdmin");
const adminModel = require("./models/admin/admin.model");
const verifyLoggedIn = require("./middleware/verifyLoggedIn");

env.config();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (like form submissions)
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enables CORS for a specific origin (frontend app) and second (true) oprtions allows cookies to be sent and received across origins

// Express session middleawre with MongoDB as storage
app.use(
  session({
    secret: process.env.SESSION_SECRETS, // Secret used to sign the session ID cookie
    resave: false, // Don't resave session if it wasn't modified
    saveUninitialized: true, // Save session even if it's not modified
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Store session in MongoDB (using connect-mongo)
    cookie: {
      httpOnly: true, // Prevents JavaScript from accessing session cookie
      secure: false, // Set to true in production when using https
      maxAge: 1000 * 60 * 60 * 10, // Session cookie expiration time (10 hours)
    },
  })
);

// MongoDB connection and insert admin user
const insertAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB
    console.log("DB Connected!");

    const db = mongoose.connection; 
    
    const email = process.env.ADMIN_EMAIL; 
    const password = process.env.ADMIN_PASSWORD; 
        
    const existingAdmin = await adminModel.findOne({ email });
    
    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists.`);
      return; 
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Admin object with the hashed password
    const newAdmin = new Admin({
      email: email,
      password: hashedPassword,
      firstName: "sayam",
      middleName: "patel",
      lastName: "patel",
      gender: "male",    
      department: "IT",
      designation: "assistant professor",
      dateOfBirth: "1990-03-22T00:00:00.000Z",
      phoneNumber:9123456789,
      address1: "456 ak Avenue",
      address2: "Suite 101",
      address3: "Near xyz",
      city: "Los Angeles",
      pincode: 90001, 
      isVerified:  false
    });

    await adminModel.create(newAdmin); // Save the new admin to the database
    // await newAdmin.save(); // Save the new admin to the database
    console.log("Admin user inserted successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB or inserting admin:", error); 
  }
};

insertAdminUser();

// Server health check route (used to check if the server is running)
app.get("/api", (req, res) => {
  res.json({ msg: "server is up and running!" }); // Respond with a simple JSON message
});

app.use("/api/auth", AuthRoute); // Authentication-related routes (login, signup, etc.)
app.use("/api/student", StudentRoute); // Routes for student-related actions
app.use("/api/admin", AdminRoute); // Routes for admin-related actions
app.use("/api/company", CompanyRoute); // Routes for company-related actions
app.use("/api/reports", verifyAdmin, ReportsRoute); // Routes for reports, protected by admin verification

// Session check route (to check if a user is logged in)
app.get("/get-session", (req, res) => {  
  console.log(req.session?.isAuth);
  res.json(req.session?.isAuth); // Respond with session authentication status
});

if (process.env.NODE_ENV === "production") {
  // Serving admin frontend build 
  app.use(
    express.static(path.join(__dirname, "..", "admin-front", "build"), {
      index: false, // Do not serve an index file for this path
    })
  );

  // Serving student frontend build
  app.use(
    express.static(path.join(__dirname, "..", "student-front", "build"), {
      index: false,
    })
  );

  // Route to serve student login page without login (only publicly available page for students)
  app.get("/Login", (req, res) => {
    return res.sendFile(
      path.join(__dirname, "..", "student-front", "build", "index.html")
    );
  });
}  
  // Registration route
  /*
  app.post("/api/Register", async (req, res) => {
    try {
      const { firstname, lastname, email, password, confirmpassword } = req.body;

      // Check if passwords match
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Check if the user already exists by checking the email
      const existingUser = await mongoose.connection.db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10); // Generate salt for bcrypt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

      // Save the user data directly in the 'users' collection (no User model)
      await mongoose.connection.db.collection('users').insertOne({
        firstname,
        lastname,
        email,
        password: hashedPassword, // Store only the hashed password
      });

      // Send success response
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  */

// Route to serve admin login page without login (only publicly available page for admins)
app.get("/admin/login", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "admin-front", "public", "index.html")
  );
});

// Admin protected routes (only accessible after admin login)
app.get("/admin/*", verifyAdmin, (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "admin-front", "public", "index.html")
  );
});

// Student protected routes (only accessible after student login)
app.get("/*", verifyStudent, (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "student-front", "public", "index.html")
  );
  });

const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
