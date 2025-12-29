// Sort posts by date on load
function sortPostsByDate() {
    const postsContainer = document.querySelector('.posts');
    const posts = Array.from(document.querySelectorAll('.post-preview'));
    
    posts.sort((a, b) => {
        const dateA = new Date(a.dataset.date || '2000-01-01');
        const dateB = new Date(b.dataset.date || '2000-01-01');
        return dateB - dateA; // Newest first
    });
    
    posts.forEach(post => postsContainer.appendChild(post));
}

// Sort on page load
sortPostsByDate();

// Category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const posts = document.querySelectorAll('.post-preview');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter posts
        const category = btn.dataset.category;
        
        posts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
        });
    });
});