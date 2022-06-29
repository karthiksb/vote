import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function AdminSection() {
  const [result, setResult] = useState();
  const [ElectionID, setElectionID] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState("");

  function submithandle() {
    const docRef = doc(db, "Admin", ElectionID);

    const colRef = collection(docRef, "candidates");

    setDoc(docRef, {
      Election_title: title,
      Election_id: ElectionID,
    });
    addDoc(colRef, {
      Name: name,
      Party: party,
      NoOfVotes: 0,
    });
    toast("candidate info uploaded");
  }

  async function publish() {
    const docRef = doc(db, "Admin", ElectionID);
    const subColRef = query(
      collection(db, "Admin", ElectionID, "candidates"),
      orderBy("NoOfVotes", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(subColRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      setResult(doc.data());
      setDoc(docRef, {
        Winner: doc.data().Name,
        Winner_Party: doc.data().Party,
        Winner_NoOfVotes: doc.data().NoOfVotes,
        Election_id: ElectionID,
      });
    });
    toast("Result published");
  }
  console.log(result);

  return (
    <div className="admin">
      <ToastContainer />
      <Router>
        <nav className="container mt-4 mx-auto flex justify-between">
          <h1 className="text-4xl ">Admin Panel</h1>
          <div className="flex  gap-5">
            <Link to="/adminhome">Admin Home</Link>
            <Link to="/publishresult">Publish result</Link>
          </div>
        </nav>

        <Switch>
          <Route exact path="/adminhome">
            <div className="container mx-auto flex flex-col">
              <div className="mt-8">
                <h1 className="text-2xl">Add Election Data</h1>
              </div>
              <div className="mt-10 flex flex-col">
                <input
                  className="border outline-none w-[300px] h-[40px] px-1"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Set election title"
                />
                <input
                  className="border outline-none w-[300px] h-[40px] px-1"
                  onChange={(e) => setElectionID(e.target.value)}
                  type="text"
                  placeholder="set an election ID"
                />

                <input
                  className="border outline-none w-[300px] h-[40px] px-1"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="candidate name"
                />
                <input
                  className="border outline-none w-[300px] h-[40px] px-1"
                  onChange={(e) => setParty(e.target.value)}
                  type="text"
                  placeholder="candiate party"
                />
              </div>
              <div className="mt-10 flex gap-5">
                <button
                  className="btn bg-yellow-400 p-2"
                  type="submit"
                  onClick={submithandle}
                >
                  upload Candidate info
                </button>
              </div>
            </div>
          </Route>

          <Route exact path="/publishresult">
            <div className="container mx-auto mt-16 flex flex-col">
              <ToastContainer />
              <label for="electionid">Enter Election ID</label>
              <input
                onChange={(e) => setElectionID(e.target.value)}
                className="mt-5 w-[250px] border outline-none"
                type="text"
                required
                id="electionid"
              />
              <input
                className="btn mt-5 w-[150px] bg-green-400 p-2"
                type="submit"
                onClick={publish}
                value="Publish Result"
              />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
