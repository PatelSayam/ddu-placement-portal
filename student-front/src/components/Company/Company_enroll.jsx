import React from 'react'
import { useLocation } from "react-router-dom"
import getStuId from '../../utils/getStuId';
import { toast, ToastContainer } from "react-toastify";
import { Navbar } from "../Navbar/Navbar";

import axios from "axios"

const Company_enroll = () => {

    const location = useLocation();
    const company = location.state?.company;    
    const roles = location.state?.roles;
    console.log(roles)

    const studentId = getStuId();

    if(!company) {
        return <h2>No company data available</h2>
    }

    async function handleEnrollment(req, res) {
        try {
            const alreadyApplied = await axios.put(`/api/student/${studentId}/${company?._id}/${roles?._id}/add-application`);            
            
            if(!alreadyApplied.data?.success) {
                toast.success("Already Applied");
            } else {
                toast.success("Successfully Applied")
            }        
        } catch (error) {
            return res.json({ success: false, message: error.message})
        }       
    }

    return (

      <>
        <Navbar />

        <div className="bg-backg min-h-screen p-6">
          <h1 className="text-2xl font-bold">{company.name}</h1>

          <div className="mt-4 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold">Company Details</h2>
            <p><strong>Role:</strong> {roles?.name}</p>
            <p><strong>Bond:</strong> {roles?.bonds ? roles?.bonds : "Not specified"}</p>
            <p><strong>Package:</strong> {roles?.avgPackage} LPA</p>
            <p><strong>City:</strong> {company.address?.city}</p>
            <p><strong>Website:</strong> <a href={company.website} className="text-blue-500">{company.website}</a></p>
            <p><strong>Email:</strong> {company.email}</p>
          </div>

          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded" onClick={handleEnrollment}>
            Confirm Enrollment
          </button>
        </div>
      </>
      
      );

  return (
    <>

    </>
  )
}

export default Company_enroll;


