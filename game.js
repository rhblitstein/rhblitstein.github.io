// Game configuration
const config = {
    gravity: 0.6,
    jumpForce: -14,  // Increased from -12 for higher/longer jumps
    runnerSpeed: 0,
    gameSpeed: 6,
    gameSpeedIncrement: 0.001,
    maxGameSpeed: 15,
    obstacleSpawnRate: 0.015,  // Reduced from 0.015 for fewer obstacles
    groundHeight: 80,
};

// Game state
let gameState = {
    isPlaying: false,
    isGameOver: false,
    score: 0,
    highScore: localStorage.getItem('highScore') || 0,
    frames: 0,
};

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const container = document.getElementById('game-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Runner object
const runner = {
    x: 100,
    y: 0,
    width: 40,
    height: 50,
    velocityY: 0,
    isJumping: false,
    animFrame: 0,
    
    jump() {
        if (!this.isJumping) {
            this.velocityY = config.jumpForce;
            this.isJumping = true;
        }
    },
    
    update() {
        // Apply gravity
        this.velocityY += config.gravity;
        this.y += this.velocityY;
        
        // Ground collision
        const groundY = canvas.height - config.groundHeight - this.height;
        if (this.y >= groundY) {
            this.y = groundY;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        // Animation
        if (!this.isJumping) {
            this.animFrame = Math.floor(gameState.frames / 6) % 2;
        }
    },
    
    draw() {
        ctx.fillStyle = '#535353';
        
        // Body
        ctx.fillRect(this.x + 10, this.y + 10, 20, 25);
        
        // Head
        ctx.fillRect(this.x + 12, this.y, 16, 12);
        
        // Arms
        const armOffset = this.isJumping ? 0 : (this.animFrame === 0 ? 2 : -2);
        ctx.fillRect(this.x + 5, this.y + 15 + armOffset, 8, 15);
        ctx.fillRect(this.x + 27, this.y + 15 - armOffset, 8, 15);
        
        // Legs
        if (this.isJumping) {
            ctx.fillRect(this.x + 10, this.y + 35, 8, 15);
            ctx.fillRect(this.x + 22, this.y + 35, 8, 15);
        } else {
            const legOffset = this.animFrame === 0 ? 3 : -3;
            ctx.fillRect(this.x + 10, this.y + 35, 8, 15 + legOffset);
            ctx.fillRect(this.x + 22, this.y + 35, 8, 15 - legOffset);
        }
    }
};

// Obstacles array
let obstacles = [];

class Obstacle {
    constructor(type) {
        this.type = type || this.randomType();
        this.x = canvas.width;
        this.width = 30;
        this.height = this.getHeight();
        this.y = canvas.height - config.groundHeight - this.height;
        this.passed = false;
    }
    
    randomType() {
        const types = ['cactus', 'rock', 'tree'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    getHeight() {
        switch(this.type) {
            case 'cactus': return 40;
            case 'rock': return 25;
            case 'tree': return 60;
            default: return 40;
        }
    }
    
    update() {
        this.x -= config.gameSpeed;
        
        // Score when passed
        if (!this.passed && this.x + this.width < runner.x) {
            this.passed = true;
            gameState.score++;
        }
    }
    
    draw() {
        ctx.fillStyle = '#535353';
        
        switch(this.type) {
            case 'cactus':
                // Main stem
                ctx.fillRect(this.x + 10, this.y, 10, this.height);
                // Arms
                ctx.fillRect(this.x + 5, this.y + 15, 5, 12);
                ctx.fillRect(this.x + 20, this.y + 20, 5, 10);
                // Spikes
                for (let i = 0; i < this.height; i += 8) {
                    ctx.fillRect(this.x + 8, this.y + i, 2, 3);
                    ctx.fillRect(this.x + 20, this.y + i, 2, 3);
                }
                break;
                
            case 'rock':
                // Rough rock shape
                ctx.fillRect(this.x + 5, this.y + 5, 20, 20);
                ctx.fillRect(this.x, this.y + 10, 10, 15);
                ctx.fillRect(this.x + 20, this.y + 8, 10, 17);
                break;
                
            case 'tree':
                // Trunk
                ctx.fillRect(this.x + 10, this.y + 30, 10, 30);
                // Foliage (triangular pine tree)
                ctx.fillRect(this.x + 5, this.y + 20, 20, 15);
                ctx.fillRect(this.x + 7, this.y + 10, 16, 12);
                ctx.fillRect(this.x + 9, this.y, 12, 12);
                break;
        }
    }
    
    collidesWith(runner) {
        return (
            runner.x < this.x + this.width - 5 &&
            runner.x + runner.width > this.x + 5 &&
            runner.y < this.y + this.height - 5 &&
            runner.y + runner.height > this.y + 5
        );
    }
}

// Cloud objects for background
let clouds = [];

class Cloud {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - config.groundHeight - 100);
        this.width = 40 + Math.random() * 40;
        this.speed = 0.5 + Math.random() * 1;
    }
    
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - config.groundHeight - 100);
        }
    }
    
    draw() {
        ctx.fillStyle = 'rgba(83, 83, 83, 0.15)';
        // Simple cloud shape
        ctx.fillRect(this.x, this.y + 5, this.width, 10);
        ctx.fillRect(this.x + 5, this.y, this.width - 10, 15);
    }
}

// Initialize clouds
for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud());
}

// Mountains for background
const mountains = [];

class Mountain {
    constructor(x, height, width) {
        this.x = x;
        this.height = height;
        this.width = width;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(83, 83, 83, 0.2)';
        ctx.beginPath();
        ctx.moveTo(this.x, canvas.height - config.groundHeight);
        ctx.lineTo(this.x + this.width / 2, canvas.height - config.groundHeight - this.height);
        ctx.lineTo(this.x + this.width, canvas.height - config.groundHeight);
        ctx.closePath();
        ctx.fill();
    }
}

// Initialize mountains
for (let i = 0; i < 4; i++) {
    mountains.push(new Mountain(
        i * 300,
        100 + Math.random() * 80,
        200 + Math.random() * 100
    ));
}

// Ground drawing
function drawGround() {
    ctx.fillStyle = '#535353';
    const groundY = canvas.height - config.groundHeight;
    ctx.fillRect(0, groundY, canvas.width, 2);
    
    // Ground pattern
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.fillRect(i, groundY + 5, 2, 2);
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameState.isPlaying) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    gameState.frames++;
    
    // Draw background elements
    mountains.forEach(mountain => mountain.draw());
    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });
    
    // Draw ground
    drawGround();
    
    // Update and draw runner
    runner.update();
    runner.draw();
    
    // Spawn obstacles
    if (Math.random() < config.obstacleSpawnRate && gameState.frames > 60) {
        obstacles.push(new Obstacle());
    }
    
    // Update and draw obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    obstacles.forEach(obstacle => {
        obstacle.update();
        obstacle.draw();
        
        if (obstacle.collidesWith(runner)) {
            gameOver();
        }
    });
    
    // Increase game speed
    if (config.gameSpeed < config.maxGameSpeed) {
        config.gameSpeed += config.gameSpeedIncrement;
    }
    
    // Update score display
    updateScore();
    
    requestAnimationFrame(gameLoop);
}

// Update score
function updateScore() {
    const miles = gameState.score;
    document.getElementById('score').textContent = `${miles} mile${miles !== 1 ? 's' : ''}`;
    document.getElementById('high-score').textContent = `Best: ${gameState.highScore} mile${gameState.highScore !== 1 ? 's' : ''}`;
}

// Start game
function startGame() {
    gameState.isPlaying = true;
    gameState.isGameOver = false;
    gameState.score = 0;
    gameState.frames = 0;
    config.gameSpeed = 6;
    obstacles = [];
    runner.y = canvas.height - config.groundHeight - runner.height;
    runner.velocityY = 0;
    runner.isJumping = false;
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
}

// Game over
function gameOver() {
    gameState.isPlaying = false;
    gameState.isGameOver = true;
    
    // Update high score
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('highScore', gameState.highScore);
    }
    
    const miles = gameState.score;
    document.getElementById('final-score').textContent = `${miles} mile${miles !== 1 ? 's' : ''}`;
    document.getElementById('game-over-screen').classList.remove('hidden');
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        
        if (!gameState.isPlaying && !gameState.isGameOver) {
            startGame();
        } else if (gameState.isGameOver) {
            startGame();
        } else {
            runner.jump();
        }
    }
    
    if (e.code === 'Escape') {
        e.preventDefault();
        window.location.href = './blog/index.html';
    }
});

// Touch/click support for mobile
canvas.addEventListener('click', () => {
    if (!gameState.isPlaying && !gameState.isGameOver) {
        startGame();
    } else if (gameState.isGameOver) {
        startGame();
    } else if (gameState.isPlaying) {
        runner.jump();
    }
});

// Also add touchstart for better mobile responsiveness
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    if (!gameState.isPlaying && !gameState.isGameOver) {
        startGame();
    } else if (gameState.isGameOver) {
        startGame();
    } else if (gameState.isPlaying) {
        runner.jump();
    }
});

// Add click handlers to the screen overlays since they block canvas clicks
document.getElementById('start-screen').addEventListener('click', () => {
    startGame();
});

document.getElementById('start-screen').addEventListener('touchstart', (e) => {
    e.preventDefault();
    startGame();
});

document.getElementById('game-over-screen').addEventListener('click', () => {
    if (gameState.isGameOver) {
        startGame();
    }
});

document.getElementById('game-over-screen').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState.isGameOver) {
        startGame();
    }
});

// Blog button
document.getElementById('blog-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // Don't trigger start game
    window.location.href = './blog/index.html';
});

document.getElementById('blog-btn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = './blog/index.html';
});

// Initialize high score display
updateScore();

// Start game loop
gameLoop();