
const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
    email: String,
    favoriteIds: [Number],
    id: Number
});


const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;




