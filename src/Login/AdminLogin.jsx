import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
function AdminLogin() {
  const history = useHistory();

  const [adminusername, setAdminusername] = useState("");
  const [adminpassword, setAdminpassword] = useState("");

  function AdminLoginfn() {
    if (adminusername === "admin" && adminpassword === "root") {
      history.push("/adminhome");
    }
  }

  return (
    <div className="bg-[#222] h-[100vh] text-white gap-[60px] flex flex-col justify-center items-center">
      <h1 className="text-2xl">Admin Login</h1>
      <form className=" flex-col items-center flex gap-10">
        <div className="flex flex-col  gap-3">
          <label for="username">Enter username </label>
          <input
            type="text"
            onChange={(e) => setAdminusername(e.target.value)}
            className="text-gray-400 bg-[#222] w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label for="username">Enter Password </label>
          <input
            onChange={(e) => setAdminpassword(e.target.value)}
            type="text"
            className="bg-[#222] text-gray-400 w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
          />
        </div>
        <button
          onClick={AdminLoginfn}
          className="w-[300px] bg-green-400 h-[40px]"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
