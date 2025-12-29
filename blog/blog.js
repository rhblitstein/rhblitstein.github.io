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