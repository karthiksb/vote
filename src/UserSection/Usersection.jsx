import React from "react";

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
export default function Usersection() {
  const [data, setData] = useState([]);
  const [electionId, setElectionID] = useState();
  const [electionId2, setElectionID2] = useState();
  const [classna, setclass] = useState("bg-[#333]  mt-5 p-10 rounded-md");
  const [voteAdded, isVoteAdded] = useState(false);
  const [selectedData, setSelectedData] = useState(false);

  async function FindElection() {
    const subColRef = collection(db, "Admin", electionId, "candidates");
    const querySnapshot = await getDocs(subColRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setElectionID(null);
    });
  }

  async function addVote() {
    const docRef = doc(db, "Admin", electionId2, "candidates", selectedData.id);

    setDoc(docRef, {
      NoOfVotes: parseInt(selectedData.NoOfVotes + 1),
      Name: selectedData.Name,
      Party: selectedData.Party,
    });
    isVoteAdded(true);
    setSelectedData(false);
  }

  function select(post) {
    if (voteAdded === false) {
      setSelectedData(post);
    }
  }

  console.log(selectedData.id);
  return (
    <div>
      <nav className="w-full h-24 flex px-5 items-center bg-gray-700 text-white justify-between">
        <h1 className="text-2xl">Add your Vote</h1>
        <div className="flex gap-5">
          {" "}
          <input
            required
            type="text"
            onChange={(e) => {
              setElectionID(e.target.value);
              setElectionID2(e.target.value);
            }}
            className="w-[300px] h-[30px] p-5 outline-none bg-gray-600"
            placeholder="Enter Election Id"
          />
          <input
            onClick={FindElection}
            className=" p-2 bg-green-400 text-gray-900"
            type="button"
            value="Find Election"
          />
        </div>
      </nav>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-10">
          {data.map((post) => {
            return (
              <div
                onClick={() => {
                  select(post);
                  setclass("bg-[#333]  mt-5 p-10 rounded-md");
                }}
                className={classna}
              >
                <h1 className="text-2xl text-gray-300">{post.Name}</h1>
                <h1 className="text-2xl text-gray-300">{post.id}</h1>
                <p className="text-gray-400 my-6">{post.Party}</p>
              </div>
            );
          })}
        </div>
      </div>

      {selectedData && (
        <div className="container mx-auto py-10 flex flex-col items-center gap-10">
          <h1 className="text-2xl">
            Do you want to vote for {selectedData.Name}
          </h1>
          <button className="w-full bg-green-400 h-10" onClick={addVote}>
            Add Vote
          </button>
        </div>
      )}
    </div>
  );
}
