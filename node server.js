const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 Connect MongoDB
connectDB();

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("🚀 Galaxy Backend Running");
});

// ================= USERS =================
let users = [];

app.post("/user/sync", (req, res) => {
  const { piUserId, username } = req.body;

  let user = users.find(u => u.piUserId === piUserId);

  if (!user) {
    user = {
      piUserId,
      username,
      coins: 0,
      xp: 0
    };

    users.push(user);
  }

  res.json(user);
});

// ================= PAYMENTS =================
app.post("/pay/approve", (req, res) => {
  const { piUserId, item } = req.body;

  let user = users.find(u => u.piUserId === piUserId);

  if (!user) return res.status(404).send("User not found");

  if (item === "boost") {
    user.coins += 50;
  }

  if (item === "xp") {
    user.xp += 100;
  }

  res.json({ success: true, user });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Backend running on port 3000 🚀");
});
