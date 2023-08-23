const express = require("express");
const router = express.Router();

const {
    getFavByEmail,
    putFav
} = require("../Controllers/FavController")


// Get fav by email
router.get('/:email', getFavByEmail)

// Get fav by email
router.put('/:email', putFav)



module.exports = router