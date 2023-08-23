const User = require('../Model/UserModel');
const mongoose = require('mongoose');

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers
};
