const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    user_img: { type: String, required: true },
    text: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
