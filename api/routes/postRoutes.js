const express = require('express');
const { checkAdmin, checkEditor, checkViewer } = require('././../middleware/roleMiddleware');
const { createPost, getPosts, getPost, updatePost, deletePost, getPostsByUserId } = require("./../controllers/postControllers");
const router = express.Router();

// Create a post (Only admin and editor)
router.post('/create', checkEditor, createPost);

// Get all posts (Any viewer, editor, or admin can view)
router.get('/', getPosts);

// Get a single post by ID (Any viewer, editor, or admin can view)
router.get('/:id', getPost);

// Update a post (Only admin and editor can edit)
router.put('/:id', checkEditor, updatePost);

// Delete a post (Only admin can delete)
router.delete('/delete/:id', checkAdmin, deletePost);

//Get post by selected user 
router.get('/user/:userId', checkAdmin, getPostsByUserId);

module.exports = router;
