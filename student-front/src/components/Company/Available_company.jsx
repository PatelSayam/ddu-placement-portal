import { useState } from "react";
import { useQuery } from "react-query"
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import Company_enroll from "./Company_enroll"
import axios from "axios";
import FilterInputWithValue from "../FilterInputWithValue"

function Available_company() {
    const [filter, setFilter] = useState({
        forBatch: localStorage.getItem("year")
    });

    const fetchCompanies = async (req, res) => {
        let filterURL = "";

        for(const query in filter) {
            filterURL += `${query}=${filter[query]}&`;
        }

        try {
            const response = await axios.get(`/api/company?${filterURL}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (err) {
            return res.json({ success: false, error: err.message});
        }
    }

    // fetch all available companies
    const { data, isloading, isError } = useQuery(
        ["companies", filter],
        fetchCompanies,
        {
            keepPreviousData: true,
            staleTime: Infinity
        }
    );
    
    const handleFilterChange = (e) => {
        if(e.target.value) {
            e.target.style.border = "2px dotted green"
        } else {
            e.target.style.border = "";
        }
                
        setFilter({ ...filter, [e.target.name]: e.target.value });
        if(e.target.name === "forBatch") {
          localStorage.setItem("year", e.target.value);
        }
    }

    return (
        <div className="bg-backg min-h-screen ">
          <Navbar />
            <FilterInputWithValue
                name="forBatch"
                title="For Batch ( in year )"
                value={filter.forBatch}
                onChangeFun={handleFilterChange}
                type="number"
                className="mt-8"
            />
            {isloading ? (
                <div className="flex flex-row justify-center mt-12">
                    <HashLoader color="white" />
                </div>
            ): (
                // All companies
                data?.data?.map((item) => {                  
                    return (
                      <div key={item._id} className="bg-section rounded-md px-2 py-2">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <div className="flex flex-row justify-between">
                          <a href={item.website}>{item.website}</a>
                          <p>{item.email}</p>
                        </div>
                        {/* Roles */}
                        <table className=" leading-normal w-full mt-2">
                          <thead>
                            <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                              <th className="">Role</th>
                              <th>Avg. Package</th>
                              <th>Type</th>
                              <th className="hidden md:table-cell">Deadline</th>
                              <th className=" hidden lg:table-cell">Interview Date</th>
                              <th className="hidden lg:table-cell">Mode</th>
                            </tr>
                          </thead>
                          {item?.roles.map((role) => {
                            let deadline = new Date(role.deadline);
                            let interviewDate = new Date(role.interviewDate);
                            return (
                              <>
                                <tr key={role.name + role.deadline} className="border-b-[1px] border-b-white">
                                  <td>{role.name}</td>
                                  <td>{role.avgPackage} LPA</td>
                                  <td className="capitalize">{role.type}</td>
                                  <td className="hidden md:inline">
                                    {deadline.getDate() +
                                      "-" +
                                      deadline.getMonth() +
                                      "-" +
                                      deadline.getFullYear()}
                                  </td>
                                  <td className=" hidden lg:table-cell">
                                    {interviewDate.getDate() +
                                      "-" +
                                      interviewDate.getMonth() +
                                      "-" +
                                      interviewDate.getFullYear()}
                                  </td>
                                  <td className=" hidden lg:table-cell capitalize">
                                    {role.mode}
                                  </td>
                                </tr>

                                <Link
                                    to="/Company_enroll"
                                    state={{ company: item, roles: role }}
                                  >
                                    <button className="text-section bg-white rounded-sm  px-4 my-3">
                                      Enroll
                                    </button>
                                  </Link>
                              </>                              
                            );
                          })}
                        </table>
                        {/* <Link
                          to="/Company_enroll"
                          state={{ company: item }}
                        >
                          <button className="text-section bg-white rounded-sm  px-4 my-3">
                            Enroll
                          </button>
                        </Link> */}
                      </div>
                    );
                  })
            )}
        </div>
    )    
}

export default Available_company;