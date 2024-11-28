const Post = require("./../model/posts");
const User = require("./../model/user");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    console.log("userId:", req.user);

    const newPost = new Post({
      title,
      content,
      image,
      author: req.user.userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single post by ID
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author or an admin/editor
    if (
      post.author.toString() !== req.user.userId &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });
    }

    // Update post fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.image = req.body.image || post.image;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this post" });
    }

    // Use deleteOne to remove the post
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting the post." });
    console.error(err);
  }
};


// Fetch posts for a specific user by userId
exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch posts by userId
    const posts = await Post.find({ author: userId });

    if (!posts || posts.length === 0) {
      return res.json([]);
    }

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
