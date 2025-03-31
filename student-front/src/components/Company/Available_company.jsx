import { useState } from "react";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import FilterInputWithValue from "../FilterInputWithValue";

function Available_company() {
    const [filter, setFilter] = useState({
        forBatch: localStorage.getItem("year")
    });

    const fetchCompanies = async () => {
        let filterURL = "";
        for (const query in filter) {
            filterURL += `${query}=${filter[query]}&`;
        }
        try {
            const response = await axios.get(`/api/company?${filterURL}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const { data, isLoading } = useQuery(["companies", filter], fetchCompanies, {
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
        if (e.target.name === "forBatch") {
            localStorage.setItem("year", e.target.value);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 bg-blue-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <FilterInputWithValue
                    name="forBatch"
                    title="For Batch (in year)"
                    value={filter.forBatch}
                    onChangeFun={handleFilterChange}
                    type="number"
                    className="mt-8 border border-gray-300 rounded-md px-3 py-2"
                />
                {isLoading ? (
                    <div className="flex justify-center mt-12">
                        <HashLoader color="blue" />
                    </div>
                ) : (
                    data?.data?.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-lg shadow-md my-6">
                            <h2 className="text-xl font-semibold text-blue-600">{item.name}</h2>
                            <div className="flex justify-between items-center mt-2">
                                <a href={item.website} className="text-blue-500 underline">{item.website}</a>
                                <p className="text-gray-700">{item.email}</p>
                            </div>
                            <table className="w-full mt-4 border-collapse">
                                <thead>
                                    <tr className="bg-blue-100 border-b">
                                        <th className="p-3 text-left">Role</th>
                                        <th className="p-3 text-left">Avg. Package</th>
                                        <th className="p-3 text-left">Type</th>
                                        <th className="p-3 text-left hidden md:table-cell">Deadline</th>
                                        <th className="p-3 text-left hidden lg:table-cell">Interview Date</th>
                                        <th className="p-3 text-left hidden lg:table-cell">Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.roles.map((role) => (
                                        <tr key={role.name + role.deadline} className="border-b hover:bg-gray-100">
                                            <td className="p-3">{role.name}</td>
                                            <td className="p-3">{role.avgPackage} LPA</td>
                                            <td className="p-3 capitalize">{role.type}</td>
                                            <td className="p-3 hidden md:table-cell">{new Date(role.deadline).toLocaleDateString()}</td>
                                            <td className="p-3 hidden lg:table-cell">{new Date(role.interviewDate).toLocaleDateString()}</td>
                                            <td className="p-3 hidden lg:table-cell capitalize">{role.mode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <Link
                                    to="/Company_enroll"
                                    state={{ company: item, roles: item.role }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Enroll
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Available_company;