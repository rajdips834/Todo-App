import db from "../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
function Data() {
  useEffect(() => {
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      console.log(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  });
}

export default Data;
