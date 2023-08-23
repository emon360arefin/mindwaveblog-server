const Fav = require("../Model/FavModel")
const mongoose = require('mongoose')

// Get fav by email
const getFavByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email };
        const result = await Fav.findOne(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Put Fav
const putFav = async (req, res) => {
    try {

        const email = req.params.email;  // Corrected from "params.email" to "req.params.email"
        const favorite = req.body;
        const query = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: favorite,
            $addToSet: { favoriteIds: favorite.id }  // Use $addToSet to add unique items to the array
        };
        const result = await Fav.updateOne(query, updateDoc, options);
        res.status(200).json(result)

    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send({ success: false, message: 'Internal server error.' });
    }
}

module.exports = {
    getFavByEmail,
    putFav
}