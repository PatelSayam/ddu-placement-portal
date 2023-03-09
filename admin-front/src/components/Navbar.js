import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineTrophy,
  AiOutlineUserSwitch,
  AiOutlineBars,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = ({ focusOn }) => {
  // w-2/12 is equivalent to col-start-1, col-end-3
  // h-screen is equivalent to row-start-1 row-end-3 with fixed position
  // const [cookies, setCookie, removeCookie] = useCookies();
  // console.log(cookies);
  const [open, setOpen] = useState(false);
  return (
    // <div className="  bg-section h-screen fixed w-2/12 text-white px-3 py-8 rounded-xl">
    <div className=" bg-section text-white px-3 py-8 rounded-xl lg:flex lg:flex-row lg:justify-around">
      {/* Top section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-8 items-center">
          <img
            src="https://wilcity.com/wp-content/uploads/2018/12/sample-logo-design-png-3-2.png"
            className="rounded-full w-10 h-10 bg-cover"
          />

          <span className="font-semibold text-2xl">DDU</span>
        </div>
        <div>
          <AiOutlineBars
            className="text-2xl lg:hidden"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Nav items */}

      <div
        className={`flex flex-col relative gap-5  ${
          open ? "flex" : "hidden"
        }  mt-5  justify-center lg:flex lg:flex-row lg:mt-0 `}
      >
        {/* icon box - students */}
        <Link to="/companies">
          <div
            className={`flex gap-8 items-center ${
              focusOn === "companies" ? "bg-hover" : ""
            }  rounded-md px-2 py-1`}
          >
            <AiOutlineShop className="text-2xl" />
            <span className="font-light text-xl">Companies</span>
          </div>
        </Link>
        <Link to="/students">
          <div
            className={`flex gap-8 items-center  ${
              focusOn === "students" ? "bg-hover" : ""
            }  rounded-md px-2 py-1 hover:bg-hover`}
          >
            <AiOutlineUser className="text-2xl" />
            <span className="font-light text-xl">Students</span>
          </div>
        </Link>
        <Link to="/reports">
          <div
            className={`flex gap-8 items-center  ${
              focusOn === "reports" ? "bg-hover" : ""
            }  rounded-md px-2 py-1 hover:bg-hover`}
          >
            <AiOutlineTrophy className="text-2xl" />
            <span className="font-light text-xl">Reports</span>
          </div>
        </Link>
        <Link to="/login">
          <div
            className={`flex gap-8 items-center  rounded-md px-2 py-1 hover:bg-hover`}
          >
            <AiOutlineLogout className="text-2xl" />
            <span className="font-light text-xl">Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;