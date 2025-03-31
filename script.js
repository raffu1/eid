// Input sanitization functions
function sanitizeInput(input) {
    return input.replace(/[^a-zA-ZÀ-ÿ \-\']/g, '').substring(0, 30);
}

function sanitizePhone(input) {
    return input.replace(/[^0-9+]/g, '').substring(0, 15);
}

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name');
let sender = urlParams.get('sender') || 'Raffsun';
let phone = urlParams.get('phone') || '01774994794';

// Update all dynamic elements
function updateAllElements() {
    // Update recipient name
    if (name) {
        name = sanitizeInput(name);
        document.getElementById('friendName').textContent = name;
    }
    
    // Update sender name
    sender = sanitizeInput(sender);
    document.getElementById('senderName').textContent = sender;
    
    // Update phone number
    phone = sanitizePhone(phone);
    document.getElementById('phoneNumber').textContent = phone;
    
    // Update copy functionality
    document.querySelector('.copy-button').addEventListener('click', function() {
        navigator.clipboard.writeText(phone).then(() => {
            const originalText = this.textContent;
            this.textContent = 'copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
}

// Prompt for missing values
function promptForMissingValues() {
    if (!name) {
        name = prompt("Whome you want to send?", "Friend");
        name = sanitizeInput(name);
    }
    
    if (!urlParams.has('sender')) {
        sender = prompt("Your name?", "Raffsun");
        sender = sanitizeInput(sender);
    }
    
    if (!urlParams.has('phone')) {
        phone = prompt("Your phone number?", "01774994794");
        phone = sanitizePhone(phone);
    }
    
    updateURLParams();
}

// Update URL without reload
function updateURLParams() {
    const newUrl = new URL(window.location);
    if (name) newUrl.searchParams.set('name', name);
    if (sender) newUrl.searchParams.set('sender', sender);
    if (phone) newUrl.searchParams.set('phone', phone);
    window.history.pushState({}, '', newUrl);
}

// Confetti animation (existing code)
function createConfetti() {
    // ... (keep your existing confetti code) ...
}

// On page load
window.addEventListener('load', function() {
    if (!urlParams.has('name') || !urlParams.has('sender') || !urlParams.has('phone')) {
        promptForMissingValues();
    }
    
    updateAllElements();
    createConfetti();
    
    setTimeout(() => {
        document.getElementById('confettiContainer').innerHTML = '';
    }, 8000);
    
    // Smooth scroll handlers
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        document.querySelector('.message-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelector('#seee').addEventListener('click', function() {
        document.querySelector('.fullpage-contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer (existing code)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.message-container, .dua').forEach(el => {
    observer.observe(el);
});});
