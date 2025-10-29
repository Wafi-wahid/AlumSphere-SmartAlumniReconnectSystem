// src/services/messageService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const sendMessage = async (alumniName, messageText) => {
  try {
    await addDoc(collection(db, "messages"), {
      alumniName,
      message: messageText,
      timestamp: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (err) {
    console.error("Error sending message:", err);
  }
};
