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
export default function Publish() {
  const [result, setResult] = useState("");

  useEffect(() => {
    async function publish() {
      const subColRef = query(
        collection(db, "Admin", "ele_mp", "candidates"),
        orderBy("NoOfVotes", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        setResult(doc.data());
      });
    }
    publish();
  }, []);

  console.log(result);
  return (
    <div>
      <h1>ss</h1>
      {result && <h1>{result.Name}</h1>}
    </div>
  );
}
