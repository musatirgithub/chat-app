import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { app } from "../auth/firebase";
import { dateSorter } from "./sorter";

const db = getFirestore(app);

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState([]);
  const usersCollectionRef = collection(db, "tuba");
  const getChat = async () => {
    const data = await getDocs(usersCollectionRef);
    const data2 = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setChat(dateSorter(data2));
    setIsLoading(false);
  };

  useEffect(() => {
    getChat();
  }, [isLoading]);

  return { isLoading, chat, getChat };
};

export const createChat = async (displayName, message, datetime) => {
  const usersCollectionRef = collection(db, "tuba");
  await addDoc(usersCollectionRef, {
    message: message,
    displayName: displayName,
    datetime: datetime,
  });
};

export const deleteChat = async (id) => {
  const chatDoc = doc(db, "tuba", id);
  await deleteDoc(chatDoc);
};
