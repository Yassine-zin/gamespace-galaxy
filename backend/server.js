const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/user"));

app.listen(3000, () => {
  console.log("Server running");
});
