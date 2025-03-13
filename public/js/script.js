// Fetch posts from the server and display them
document.addEventListener('DOMContentLoaded', function() {
    fetch('/cms/posts')
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById('post-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="deletePost(${post.id})">Delete</button>
                    <button onclick="editPost(${post.id})">Edit</button>
                `;
                postContainer.appendChild(postElement);
            });
        });

    // Form submission to create a new post
    const createPostForm = document.getElementById('createPostForm');
    createPostForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        fetch('/cms/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(newPost => {
            alert('Post created successfully!');
            location.reload();  // Reload page to show new post
        });
    });
});

// Function to delete a post
function deletePost(id) {
    fetch(`/cms/posts/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Post deleted');
            location.reload();  // Reload page to remove deleted post
        });
}

// Function to edit a post
function editPost(id) {
    const newTitle = prompt('Enter new title:');
    const newContent = prompt('Enter new content:');
    
    if (newTitle && newContent) {
        fetch(`/cms/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, content: newContent })
        })
        .then(response => response.json())
        .then(updatedPost => {
            alert('Post updated!');
            location.reload();  // Reload page to show updated post
        });
    }
}
