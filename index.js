const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/student", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;
// Create Schema Users (migration)
const StudentSchema = new Schema({
  name: String,
  class: String,
});

//create model users
const Student = new mongoose.model("student", StudentSchema);

app.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const data = await Student.create(payload);
    res.json({ message: "success create data", result: data });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json({ message: "success show data", result: data });
  } catch (error) {
    console.log(error);
  }
});

app.put("/", async (req, res) => {
  try {
    const payload = req.body;
    await Student.updateOne({ _id: payload.id }, payload);
    const data = await Student.findOne({ _id: payload.id });
    res.json({ message: "success update data", result: data });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/", async (req, res) => {
  try {
    const payload = req.query.id;
    await Student.deleteOne({ _id: payload });
    res.json({ message: "success delete data" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => console.log("app running on port 4000"));
