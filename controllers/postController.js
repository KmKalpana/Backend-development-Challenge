const Post = require("../models/Post");
const { errorHandler } = require("../utils/errorHandler");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // Assuming you set userId in the auth middleware

    const newPost = new Post({ title, content, user: userId });
    await newPost.save();

    res.json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");

    res.json({ posts });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    errorHandler(error, res);
  }
};