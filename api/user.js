const router = require("express").Router();
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  try {
    const hashpass = await bcrypt.hash(req.body.password, 10);

    const user = await userModel.create({ ...req.body, password: hashpass });

    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        res.status(409).json({
          success: false,
          message: "Email Already in Use!",
        });
      }
      if (error.keyPattern?.phone) {
        res.status(409).json({
          success: false,
          message: "Phone Already in Use!",
        });
      }
      return;
    }

    // Required Fields Errors Handling
    if (error.message.split(",")[0]?.split(":")[2]?.trim()) {
      res.status(400).json({
        success: false,
        message: error.message.split(",")[0]?.split(":")[2]?.trim(),
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
});

module.exports = router;
