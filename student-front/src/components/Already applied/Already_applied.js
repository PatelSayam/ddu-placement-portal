import React from "react";
import { Navbar } from "../Navbar/Navbar";
import crypto from "crypto-js";
import { Link } from "react-router-dom";
import axios from "axios";
import getStuId from "../../utils/getStuId";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import encrypter from "../../utils/encrypter";
import convertToDate from "../../utils/convertToDate";
import { toast } from "react-toastify";

export const Already_applied = () => {
  const studId = getStuId();

  const getValues = async () => {    
    try {
      const {data} = await axios.get(`/api/student/${studId}/applications`);
      return data.data;
    } catch (err) {
      return { success: false, error: err.message };
    }    
  }  

  const {
    data: companiesData,
    isLoading,
    isError,
  } = useQuery(["applied-companies", "filter"], getValues, {
    keepPreviousData: true,
  });

  if (isError) {
    toast.error("📶 Low internet connection ");
  }

  const renderItem1 = (item) => {
    return (
      <div className="p-6 mx-5 my-6 text-black bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="mb-4">
          <h3 className="text-blue-600 text-2xl font-bold">{item.name}</h3>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-gray-700 text-sm mb-4">
          <div className="mb-2 sm:mb-0">
            <b>{item.website}</b>
          </div>
          <div>
            <span>Mail to: </span>
            <u className="font-semibold">{item.email}</u>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-100 text-gray-700 font-semibold">
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">AVG. Package</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Deadline</th>
                <th className="px-4 py-2">Interview Date</th>
                <th className="px-4 py-2">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {item.roles.map((item1) => (
                <tr key={item1.name} className="text-center text-gray-700">
                  <td className="px-4 py-2">{item1.name}</td>
                  <td className="px-4 py-2">{item1.avgPackage} LPA</td>
                  <td className="px-4 py-2 capitalize">{item1.type}</td>
                  <td className="px-4 py-2">{convertToDate(item1.deadline)}</td>
                  <td className="px-4 py-2">{convertToDate(item1.interviewDate)}</td>
                  <td className="px-4 py-2 capitalize">{item1.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <Link to={"/Company/" + encrypter(item._id)}>
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">View More</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <Navbar />      
      {isLoading || isError ? (
        <div className="mt-10 flex justify-center">
          <ClipLoader color="blue" size={50} />
        </div>
      ) : (
        <div className="grid gap-6 mx-4 md:mx-10">{companiesData.map(renderItem1)}</div>
      )}
    </div>
  );
};





// import React from "react";
// import { Navbar } from "../Navbar/Navbar";
// import crypto from "crypto-js";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import getStuId from "../../utils/getStuId";
// import { useQuery } from "react-query";
// import { ClipLoader } from "react-spinners";
// import encrypter from "../../utils/encrypter";
// import convertToDate from "../../utils/convertToDate";
// import { toast } from "react-toastify";

// export const Already_applied = () => {
//   const studId = getStuId();

//   const getValues = async () => {    
//     try {
//       const {data} = await axios.get(`/api/student/${studId}/applications`);
//       // console.log("data is", data);
//       return data.data;
//     } catch (err) {
//       return { success: false, error: err.message };
//     }    
//   }  

//   const {
//     data: companiesData,
//     isLoading,
//     isError,
//   } = useQuery(["applied-companies", "filter"], getValues, {
//     keepPreviousData: true,
//   });

//   if (isError) {
//     toast.error("📶 Low internet connection ");
//   }

//   const renderItem1 = (item) => {
//     return (
//       <div className=" p-4 mx-10 my-8 text-black bg-blue-200 rounded-md  border-blue-500 ">
//         <div>
//           <h3 className="text-blue-600 text-xl">
//             <b>{item.name}</b>
//           </h3>
//         </div>

//         <br />

//         <div className="flex flex-row justify-between">
//           <div>
//             <label>
//               <b>{item.website}</b>
//             </label>
//           </div>

//           <div>
//             <label>Mail to: </label>
//             <label>
//               <u>
//                 <b>{item.email}</b>
//               </u>
//             </label>
//           </div>
//         </div>

//         <br />

//         <div className=" mx-auto container  rounded">
//           <table className="min-w-full">
//             <thead>
//               <tr className="w-full h-16 dark:text-blue-600 border-gray-400 font-semibold border-b py-8">
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3 font   pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   Role
//                 </th>
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   AVG. Package
//                 </th>
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   TYPE
//                 </th>
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   DEADLINE
//                 </th>
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3  pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   INTERVIEW DATE
//                 </th>
//                 <th
//                   role="columnheader"
//                   className="px-5 py-3  pr-6 text-left text-sm tracking-normal leading-4"
//                 >
//                   MODE
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {item.roles.map((item1) => {
//                 return (
//                   <React.Fragment>
//                     <tr className=" border-gray-400 border-b">
//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {item1.name}
//                       </td>

//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {item1.avgPackage} LPA
//                       </td>

//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {item1.type}
//                       </td>

//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {convertToDate(item1.deadline)}
//                       </td>

//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {convertToDate(item1.interviewDate)}
//                       </td>

//                       <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
//                         {item1.mode}
//                       </td>
//                     </tr>
//                   </React.Fragment>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <br />

//         <div className="grid justify-items-center">
//           <Link to={"/Company/" + encrypter(item._id)}>
//             <div className="bg-blue-500 text-white  rounded-lg grid justify-items-center">
//               <button className="px-4 py-2">View More</button>
//             </div>
//           </Link>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen">
//       <Navbar />      
//       {isLoading || isError ? (
//         <div className="mt-5 text-center">
//           <ClipLoader color="blue" size={45} />
//         </div>
//       ) : (
//         companiesData.map(renderItem1)
//       )}
//     </div>
//   );
// };
