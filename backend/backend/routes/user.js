const express = require("express");
const router = express.Router();

let users = [];

router.post("/sync", (req, res) => {
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

module.exports = router;
