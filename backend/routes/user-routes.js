const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controller");

const router = express.Router();

//route for  post data
router.post(
  "/create",
  [
    check("email", "Please enter email address").not().isEmpty(),
    check("name", "please enter Name").not().isEmpty(),
    check("job", "job ie required, please enter your job").not().isEmpty(),
    check("mobile", "mobile no is required, please enter mobile")
      .not()
      .isEmpty()
      .isLength({ max: 10 }),
  ],
  userControllers.addUser
);

// route for posting data
router.patch(
  "/update",
  [
    check("email", "Please enter email address").not().isEmpty(),
    check("job", "job ie required, please enter your job").not().isEmpty(),
    check("mobile", "mobile no is required, please enter mobile")
      .not()
      .isEmpty()
      .isLength({ max: 10 }),
  ],
  userControllers.updateUser
);

//route for checking count
router.get("/count", userControllers.numberOfCount);

module.exports = router;
