import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigator = useNavigate();

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:space-x-10">
          <div className="flex items-center space-x-2 ml-3 ">
            <Link to="/">
              <h1 className="text-xl">myContacts</h1>
            </Link>
          </div>
          <div className="flex-grow ml-6 mr-10 md:w-[250px]">
            <input
              className="w-full h-10 rounded-full bg-gray-100 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 disabled:opacity-50"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log(e.target.value);
              }}
            />
            
          </div>
          <div className="items-center mr-3 space-x-4 flex">
            {!localStorage.getItem("user_data") ? (
              <Link to="/signin">
                <button
                  type="button"
                  className="rounded-md bg-black px-4 py-2 text-sm ml-4 font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Login
                </button>
              </Link>
            ) : (
              <Dropdown />
            )}
            <div className="hidden md:block">
              <h2 className="text-lg font-bold">
                {JSON.parse(localStorage.getItem("user_data"))?.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
