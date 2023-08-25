const express = require("express");
const router = express.Router();

const {
    getBlogs,
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    getBlogByTag,
    addNewComment,
    addNewLike,
    removeLike
} = require("../Controllers/BlogController");


// Get all Blogs 
router.get('/', getBlogs)

// Get a single Blog
router.get('/:id', getBlog)


// Get blog by tag
router.get('/:tag', getBlogByTag)

// Post a new Blog
router.post('/', createBlog)

// Update a Blog
router.patch('/:id', updateBlog)


// Add new Comment 
router.put('/:id', addNewComment)

// Add new Like
router.put('/like/:id', addNewLike)

// Remove Like
router.put('/like/remove/:id', removeLike)

// Delete a Blog
router.delete('/:id', deleteBlog)


module.exports = router