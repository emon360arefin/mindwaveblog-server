const Blog = require("../Model/BlogModel")
const mongoose = require('mongoose')


// Get all blogs

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs)
}

// Get a single blog
const getBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(404).json({ error: "No Such blog Found" })
    }

    const blog = await Blog.findById(id)

    if (!blog) {
        return res.status(404).json({ error: "No Such blog Found" })
    }

    res.status(200).json(blog)
}


// Get blog by tag

const getBlogByTag = async (req, res) => {
    try {
        const tag = req.params.tag;
        const query = { tags: tag };
        const result = await Blog.find(query);
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message })

    }

}


// Post a new blog
const createBlog = async (req, res) => {


    try {
        const blog = await Blog.create(req.body)
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


// 


// Update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Such blog Found' })
    }

    const blog = await Blog.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!blog) {
        return res.status(404).json({ error: "No Such blog Found" })
    }
    res.status(200).json(blog)
}



// Add new comment 

const addNewComment = async (req, res) => {
    const id = req.params.id;
    const newComment = req.body; // Assuming the request body contains the new comment data

    console.log(newComment)

    try {
        // Fetch the blog post by id from your database (blogCollection)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No Such blog Found' })
        }


        const blogPost = await Blog.findOne({ _id: id });

        // Add the new comment to the comments array of the blog post
        blogPost.comments.push(newComment);

        // Update the blog post in the database
        await Blog.updateOne({ _id: id }, { $set: { comments: blogPost.comments } });

        return res.json({ message: "Comment added successfully", newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// Add a new like 

const addNewLike = async (req, res) => {
    const id = req.params.id;
    const email = req.body;
    console.log(req.body);

    try {
        // Fetch the blog post by id from your database (blogCollection)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No Such blog Found' });
        }

        // Update the blog post in the database
        const result = await Blog.updateOne({ _id: id }, { $push: { likes: email } }, { upsert: true });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




// Delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(404).json({ error: "No Such blog Found" })
    }

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
        return res.status(404).json({ error: "No Such blog Found" })
    }

    res.status(200).json(blog)

}






module.exports = {
    getBlogs,
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    getBlogByTag,
    addNewComment,
    addNewLike

}