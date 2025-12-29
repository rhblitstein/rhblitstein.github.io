# Bec's Portfolio & Blog

A retro pixel-art portfolio site featuring a trail runner game and blog.

## Features

- **Trail Runner Game**: Chrome dino-style platform runner with pixel art graphics
  - Jump over cacti, rocks, and trees
  - High score tracking with localStorage
  - Responsive controls (Space/Click to jump, ESC for blog)
- **Blog**: Simple, clean blog with category filtering
  - Categories: Engineering, Running, Rivers
  - Retro pixel aesthetic matching the game

## Setup for GitHub Pages

1. **Create a new repository** on GitHub (e.g., `your-username.github.io`)

2. **Clone and add files**:
   ```bash
   git clone https://github.com/your-username/your-username.github.io.git
   cd your-username.github.io
   # Copy all files from this project into the repo
   ```

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: pixel art runner game and blog"
   git push origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repo Settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at `https://your-username.github.io`

## File Structure

```
.
├── index.html          # Game homepage
├── style.css           # Game styles
├── game.js             # Game logic
├── blog/
│   ├── index.html      # Blog homepage
│   ├── blog-style.css  # Blog styles
│   ├── blog.js         # Blog filtering logic
│   └── posts/          # Your blog posts go here
└── README.md
```

## Adding Blog Posts

To add a new blog post:

1. Create an HTML file in `blog/posts/` (e.g., `my-first-post.html`)
2. Add a post preview to `blog/index.html`:

```html
<article class="post-preview" data-category="engineering">
    <div class="post-meta">
        <span class="date">Dec 28, 2025</span>
        <span class="category">Engineering</span>
    </div>
    <h2>Your Post Title</h2>
    <p class="excerpt">A brief excerpt of your post...</p>
    <a href="posts/my-first-post.html" class="read-more">Read more →</a>
</article>
```

Categories: `engineering`, `running`, `rivers`, or create your own!

## Customization

- **Game obstacles**: Edit obstacle types in `game.js` (line ~100)
- **Colors**: Update color scheme in `style.css` and `blog-style.css`
- **Fonts**: Change fonts in the CSS files
- **Game difficulty**: Adjust `config` object in `game.js` (gravity, speed, spawn rate)

## Controls

- **Space** or **Click**: Jump / Start game
- **ESC**: Go to blog
- **Blog button**: Bottom right corner

## License

MIT License - Feel free to fork and customize!

---

Built with ❤️ and pixel art