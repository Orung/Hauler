const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../model/users.json");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.route("/").get((req, res) => {
  res.json(data.employees);
});

module.exports = router;
