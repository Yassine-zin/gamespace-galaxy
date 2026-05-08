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

router.post("/approve-payment", async (req, res) => {
  try {
    const { paymentId } = req.body;

    console.log("Approving:", paymentId);

    res.json({
      success: true,
      message: "Payment approved"
    });

  } catch (error) {
    res.status(500).json({
      error: "Approval failed"
    });
  }
});

module.exports = router;
