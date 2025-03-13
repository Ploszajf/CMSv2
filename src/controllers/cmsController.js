// Simulate a database with an in-memory array
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

// Get all posts
exports.getAllPosts = (req, res) => {
    res.json(posts);
};

// Create a new post
exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
};

// Edit an existing post
exports.editPost = (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.title = title;
        post.content = content;
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
};

// Delete a post
exports.deletePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).send('Post deleted');
    } else {
        res.status(404).send('Post not found');
    }
};
