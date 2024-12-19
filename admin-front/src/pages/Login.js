// Importing necessary dependencies and components
import React, { useState } from "react"; // React and useState hook for managing state
import { useForm } from "react-hook-form"; // React Hook Form for form handling and validation
import { yupResolver } from "@hookform/resolvers/yup"; // To integrate Yup validation with React Hook Form
import axios from "axios"; // Axios for making HTTP requests to the backend
import loginImage from "../assets/register4.jpg"; // Background image for the login page
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Icons for email and password fields
import { useCookies } from "react-cookie"; // React hook to manage cookies
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically
import loginValidator from "../form-validators/login.validator"; // Custom validation schema using Yup for login
import Error from "../components/Error"; // Custom error component to display error messages
import { ToastContainer, toast } from "react-toastify"; // Toast notifications for user feedback
import { BeatLoader } from "react-spinners"; // A loading spinner for asynchronous actions

const Login = () => {
  // Setting up form handling with react-hook-form and yup validation
  const {
    handleSubmit, // Function to handle form submission
    register, // Register inputs for validation
    formState: { errors }, // Access form validation errors
    getValues, // To get the form values
  } = useForm({ resolver: yupResolver(loginValidator) }); // Use the Yup validator for login form validation

  // State management
  const [cookies, setCookie, removeCookie] = useCookies(); // Cookie hooks to manage cookies in the application
  const navigate = useNavigate(); // React Router hook for programmatic navigation
  const [isLoading, setIsLoading] = useState(false); // Loading state to show a spinner when login is in progress

  // Handle login submission
  const handleLogin = () => {
    setIsLoading(true); // Set loading state to true when the login process starts
    const email = getValues("email"); // Get email value from the form
    const password = getValues("password"); // Get password value from the form

    // Making the API call to login the user
    axios
      .post(
        "/api/auth/admin/login", // API endpoint for logging in as admin
        { email, password }, // Send email and password as the payload
        { withCredentials: true } // Ensure cookies are sent with the request
      )
      .then((response) => {
        console.log(response.data); // Log the response from the server
        return response.data; // Return the response data to the next promise chain
      })
      .then((data) => {
        // If the login fails (success is false), show an error toast message
        if (data.success === false) {
          toast.error(data.msg); // Display error message
          return; // Exit early if login fails
        }
        
        // If login is successful, store values in localStorage for future use
        localStorage.setItem("year", new Date().getFullYear()); // Store current year
        localStorage.setItem("minYear", new Date().getFullYear() - 1); // Store previous year
        localStorage.setItem("maxYear", new Date().getFullYear() + 1); // Store next year

        // Navigate to the admin dashboard page upon successful login
        navigate("/admin/");
      })
      .then(() => setIsLoading(false)) // Stop loading spinner after API response
      .catch((error) => {
        console.log(error); // Log any error that occurred during the API request
        setIsLoading(false); // Stop loading spinner if an error occurs
      });
  };

  return (
    <>
      {/* Full page wrapper for the login page */}
      <div className="w-screen h-screen bg-backg text-white">
        <div className="flex flex-wrap w-full">
          {/* Left side - Login form section */}
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-center mt-4">
              DDU PLACEMENT DASHBOARD
            </h1>

            {/* Form container with padding and alignment */}
            <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
              {/* The login form */}
              <form
                className="flex flex-col pt-3 md:pt-8 text-black"
                onSubmit={handleSubmit(handleLogin)} // Handle form submission using handleLogin
              >
                {/* Email input field */}
                <div className="flex flex-col pt-4">
                  <div className="flex relative">
                    {/* Email Icon */}
                    <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                      <AiOutlineMail size={24} />
                    </span>
                    <input
                      {...register("email")} // Register the email input for validation
                      name="email" // Name for the email input
                      type="text" // Email input type
                      id="design-login-email"
                      className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email" // Placeholder text for the email input
                    />
                  </div>
                </div>
                {/* Display any error message related to the email input */}
                <Error msg={errors.email?.message || ""} />

                {/* Password input field */}
                <div className="flex flex-col pt-4">
                  <div className="flex relative">
                    {/* Password Icon */}
                    <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                      <AiOutlineLock size={24} />
                    </span>
                    <input
                      {...register("password")} // Register the password input for validation
                      name="password" // Name for the password input
                      type="password" // Password input type
                      id="design-login-password"
                      className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Password" // Placeholder text for the password input
                    />
                  </div>
                </div>
                {/* Display any error message related to the password input */}
                <Error msg={errors.password?.message || ""} />

                {/* Submit button for the form */}
                <button
                  type="submit"
                  disabled={isLoading} // Disable the button while loading
                  className="w-full px-4 py-2 mt-10 text-base font-semibold text-center text-white transition duration-200 ease-in bg-section shadow-md hover:text-white hover:bg-hover focus:outline-none focus:ring-2"
                >
                  <span className="w-full">
                    {/* Show loading spinner if isLoading is true */}
                    {isLoading ? <BeatLoader color="white" /> : "Submit"}
                  </span>
                </button>
              </form>

              {/* Registration link for new users */}
              <div className="pt-12 pb-12 text-center">
                <p>
                  Don&#x27;t have an account ?
                  <a href="/admin/students/register" className="font-semibold underline">
                    Register here.
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image section */}
          <div className="w-1/2 shadow-2xl">
            <img
              className="hidden object-cover w-full h-screen md:block"
              src={loginImage} // Display login image on the right side of the screen
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; // Export the Login component
