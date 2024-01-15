// functions/index.js
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

import functions from "firebase-functions"
import admin from "firebase-admin"
admin.initializeApp();

exports.ssrFunction = functions.https.onRequest(async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || ""; // Default to empty string if no search term provided

    const citiesRef = admin.firestore().collection("blogs");
    const querySnapshot = await citiesRef.where("title", "==", searchTerm).get();

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
