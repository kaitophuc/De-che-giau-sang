import express from "express";
// import { ObjectId } from "mongodb";
// import db from "./db/connection.js";

const greet = express.Router();

greet.get("/", async (reg, res) => {
  res.send("Hello Calendar Management System!").status(200);
});

export default greet;

