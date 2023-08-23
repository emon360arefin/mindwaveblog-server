const express = require("express");
const router = express.Router();

const {
    getUsers

} = require("../Controllers/UserController");


// Get all Users 
router.get('/', getUsers)



module.exports = router