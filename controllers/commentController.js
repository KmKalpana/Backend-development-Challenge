const Comment = require("../models/Comment");
const { errorHandler } = require("../utils/errorHandler");

exports.createComment = async (req, res) => {
  try {
   const { comment, postId } = req.body;
   const userId = req.userId; 

   const newComment = new Comment({ comment, user: userId, post: postId });
   await newComment.save();

    await newComment.save();

    res.json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "username"
    );

    res.json({ comments });
  } catch (error) {
    errorHandler(error, res);
  }
};
