const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');

// Route to get all posts
router.get('/posts', cmsController.getAllPosts);

// Route to create a new post
router.post('/posts', cmsController.createPost);

// Route to edit an existing post
router.put('/posts/:id', cmsController.editPost);

// Route to delete a post
router.delete('/posts/:id', cmsController.deletePost);

module.exports = router;
