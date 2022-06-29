import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
function Login() {
  const history = useHistory();
  const auth = getAuth();

  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [Signup, setSignup] = useState(true);

  function signupfn() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        history.push("/adminhome");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }
  function submitHandle() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        history.push("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className=" bg-[#222] h-[100vh]">
      <div className="admin login bg-black w-full h-[40px] items-center text-white flex justify-end px-5">
        <button onClick={() => history.push("/admin")}>Admin Login</button>
      </div>

      <div className=" flex justify-center">
        <nav className="container mx-auto">
          {Signup ? (
            <div
              className="container flex flex-col   text-white mx-auto
    "
            >
              <div className="flex flex-row gap-2 mt-10 text-2xl">
                <h1 onClick={() => setSignup(true)} className="text-green-400">
                  Sign up{" "}
                </h1>
                <span>/</span>
                <h1 onClick={() => setSignup(false)}>Sign in</h1>
              </div>

              <div className="mt-12 flex-col items-center flex gap-10">
                <div className="flex flex-col gap-3 ">
                  <label for="username ">Enter your name </label>
                  <input
                    type="text"
                    className="text-gray-400 bg-[#222] w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>
                <div className="flex flex-col  gap-3">
                  <label for="username">Enter Email </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="text"
                    className="text-gray-400 bg-[#222] w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>
                <div className="flex flex-col  gap-3">
                  <label for="username">Enter Adhar Id </label>
                  <input
                    type="number"
                    className="text-gray-400 bg-[#222] w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label for="username">Enter Password </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    className="bg-[#222] text-gray-400 w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>

                <button
                  onClick={signupfn}
                  className="w-[300px] bg-green-400 h-[40px]"
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div
              className="container flex flex-col   text-white mx-auto
    "
            >
              <div className="flex flex-row gap-2 mt-10 text-2xl">
                <h1 onClick={() => setSignup(true)}>Sign up </h1>
                <span>/</span>
                <h1 className="text-green-400">Sign in</h1>
              </div>

              <form className="mt-12 flex-col items-center flex gap-10">
                <div className="flex flex-col  gap-3">
                  <label for="username">Enter Email </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="text"
                    className="text-gray-400 bg-[#222] w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label for="username">Enter Password </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    className="bg-[#222] text-gray-400 w-[300px]  focus:outline-none border-b-[0.2px] border-green-400"
                  />
                </div>
                <h1
                  className="w-[300px] text-md flex justify-center items-center bg-green-400 h-[40px]"
                  onClick={submitHandle}
                >
                  Sign in
                </h1>
              </form>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Login;
