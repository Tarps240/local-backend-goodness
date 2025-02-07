// server.js
const express = require('express');
const app = express();
const port = 3030;

// Parse JSON bodies.
app.use(express.json());

// In memory data store.
let users = [
    { id: 1, name: 'Renee Lewis' },
    { id: 2, name: 'Scott Lewis' },
    { id: 3, name: 'Jenny Shaw' },
    { id: 4, name: 'James Kim' },
    { id: 5, name: 'Jill Pearson' },
];

let posts = [
    { id: 1, title: 'My first post', content: 'This is my first post.', userId: 1 },
    { id: 2, title: 'My second post', content: 'This is my second post.', userId: 2 },
    { id: 3, title: 'My third post', content: 'This is my third post.', userId: 3 },
    { id: 4, title: 'My fourth post', content: 'This is my fourth post.', userId: 4 },
    { id: 5, title: 'My fifth post', content: 'This is my fifth post.', userId: 5 },
];

let comments = [
    { id: 1, postId: 1, content: 'Nice post!' },
    { id: 2, postId: 1, content: 'You Suck!' },
    { id: 3, postId: 2, content: 'Awesome post!' },
    { id: 4, postId: 2, content: 'Amazing post!' },
    { id: 5, postId: 3, content: 'Terrible post!' },
];

// -------- USER Endpoints --------
// Get all users.
app.get('/users', (req, res) => {
    res.json(users);
});

// GET a single user by ID.
app.get('users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST a new user.
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update an existing user.
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = req.body.name || user.name;
    res.json(user);
});

// DELETE a user.
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

// -------- POST Endpoints --------
// Get all posts.
app.get('posts', (req, res) => {
    res.json(posts);
});

// GET a single post by ID.
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

// POST a new post.
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT update an existing post.
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.title = req.bodytitle || post.title;
    post.content =req.body.content || post.content;
    post.userId = req.body.userId || post.userId;
    res.json(post);
});

// DELETE a post.
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });
    const deletedPost = posts.splice(postIndex, 1);
    res.json(deletedPost[0]);
});

// -------- COMMENT Endpoints --------
// Get all comments.
app.get('/comments', (req, res) => {
    res.json(comments);
});

// GET a single comment by ID.
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(c => c.id === id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
});

// POST a new comment.
app.post('comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        postId: req.body.postId,
        content: req.body.content
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// PUT update an existing comment.
app.put('/comments/:id', (req, res) => {
    const id = pareInt(req.params.id);
    const comment = comments.find(c => c.id === id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.postId = reqbody.postId || comment.postId;
    comment.content = req.body.content || comment.content;
    res.json(comment);
});

// DELETE a comment.
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) return res.status(404).json({ error: 'Comment not found' });
    const deletedComment = comments.splice(commentIndex, 1);
    res.json(deletedComment[0]);
});

// ---------- Start the server ----------
app.listen(port, () => {
    console.log(`Server is running on http//localhost:${port}`);
});