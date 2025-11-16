// Blog posts data
const blogPosts = [
    // Add your blog posts here in this format:
    // {
    //     id: 'post-slug',
    //     title: 'Your Post Title',
    //     excerpt: 'Brief description of your post...',
    //     date: '2025-01-20',
    //     readTime: '5 min read',
    //     tags: ['Tag1', 'Tag2'],
    //     category: 'technology', // Options: technology, science-fiction, space, gaming, life
    //     icon: '💻' // Choose an appropriate emoji icon
    // }
];

// Load blog posts on blog page
if (document.getElementById('blogGrid')) {
    const blogGrid = document.getElementById('blogGrid');
    let currentCategory = 'all';
    // Store last used category for re-rendering on language change
    
    function renderPosts(category = currentCategory) {
        blogGrid.innerHTML = '';
        
        const filteredPosts = category === 'all' 
            ? blogPosts 
            : blogPosts.filter(post => post.category === category);
        
        if (filteredPosts.length === 0) {
            const lang = localStorage.getItem('preferredLanguage') || 'en';
            const messages = {
                en: {
                    title: 'No posts in this category yet',
                    subtitle: 'Check back soon for articles and musings!'
                },
                de: {
                    title: 'Noch keine Beiträge in dieser Kategorie',
                    subtitle: 'Schauen Sie bald wieder vorbei für Artikel und Gedanken!'
                },
                tr: {
                    title: 'Bu kategoride henüz yazı yok',
                    subtitle: 'Makaleler ve yazılar için yakında tekrar kontrol edin!'
                }
            };
            blogGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: #6b7280;">
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">${messages[lang].title}</h3>
                    <p>${messages[lang].subtitle}</p>
                </div>
            `;
            return;
        }
        
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        filteredPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'blog-card';
            postCard.onclick = () => window.location.href = `blog/${post.id}.html`;
            
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            postCard.innerHTML = `
                <div class="blog-card-image">${post.icon}</div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-card-date">📅 ${formattedDate}</span>
                        <span class="blog-card-readtime">⏱️ ${post.readTime}</span>
                    </div>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-card-footer">
                        <a href="blog/${post.id}.html" class="read-more">Read more →</a>
                    </div>
                </div>
            `;
            
            blogGrid.appendChild(postCard);
        });
    }
    
    // Initial render
    renderPosts();

    // Filter button handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            currentCategory = category;
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Re-render posts
            renderPosts(category);
        });
    });

    // Listen for language changes and re-render posts
    window.addEventListener('languageChanged', () => {
        renderPosts(currentCategory);
    });
}

// Update current year
document.querySelectorAll('.current-year').forEach(element => {
    element.textContent = new Date().getFullYear();
});
