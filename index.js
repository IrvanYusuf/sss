const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
const apiRoutes = require("./routes/api.js");
env.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// group all api
app.use("/api", apiRoutes);

// membuat route tes
app.get("/tes", (req, res) => {
  res.json({ message: "success" });
});

app.listen(3000, () => {
  console.log("success running");
});
