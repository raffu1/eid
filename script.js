// Personalize the greeting
function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9 \-\']/g, '');
}

const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name');

if (name) {
    name = sanitizeInput(name);
    if (name.length > 0) {
        document.getElementById('friendName').textContent = name;
    } else {
        promptForName();
    }
} else {
    promptForName();
}

function promptForName() {
    const userName = prompt("Please enter your name to personalize this Eid greeting:", "Friend");
    if (userName) {
        const sanitized = sanitizeInput(userName);
        if (sanitized.length > 0) {
            document.getElementById('friendName').textContent = sanitized;
            // Update URL without reload
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('name', sanitized);
            window.history.pushState({}, '', newUrl);
        } else {
            document.getElementById('friendName').textContent = "Friend";
        }
    }
}

// Automatic confetti animation on page load
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#D4AF37', '#0A2463', '#1B998B', '#F8F1E5', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = 5 + Math.random() * 10;
        const delay = Math.random() * 3;
        
        confetti.style.position = 'absolute';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confetti.style.animationDelay = delay + 's';
        
        // Different shapes
        if (shape === 'square') {
            confetti.style.borderRadius = '0';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.borderLeft = size/2 + 'px solid transparent';
            confetti.style.borderRight = size/2 + 'px solid transparent';
            confetti.style.borderBottom = size + 'px solid ' + colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = 'transparent';
        } else {
            confetti.style.borderRadius = '50%';
        }
        
        confetti.style.animation = 'confettiFall ' + (3 + Math.random() * 3) + 's linear ' + delay + 's infinite';
        confettiContainer.appendChild(confetti);
    }
    
    // Play celebration sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-cheering-2013.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio playback prevented:", e));
}

// Start animations when page loads
window.addEventListener('load', function() {
    createConfetti();
    
    // Remove confetti after some time to prevent performance issues
    setTimeout(() => {
        document.getElementById('confettiContainer').innerHTML = '';
    }, 8000);
});

// Smooth scroll to message section
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.querySelector('.message-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Animate elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.message-container, .dua').forEach(el => {
    observer.observe(el);
});