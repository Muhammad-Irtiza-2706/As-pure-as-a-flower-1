// ============================================
// SEED OF PURITY - Interactive Experience
// ============================================

'use strict';

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const card = document.getElementById('card');
const garden = document.getElementById('garden');
const bg = document.getElementById('background');
const input = document.getElementById('nameInput');
const btn = document.getElementById('plantBtn');
const petals = document.querySelectorAll('.petal');
const messageBox = document.getElementById('message');
const particlesContainer = document.getElementById('particles');
const promptText = document.getElementById('prompt');
const seedContainer = document.getElementById('seedContainer');
const seed = document.getElementById('seed');
const seedName = document.getElementById('seedName');
const stem = document.getElementById('stem');
const stemContainer = document.querySelector('.stem-container');
const center = document.querySelector('.center');

// State
let userName = '';
let firstPetalClicked = false;
let centerClickCount = 0;

// Messages for petals
const messages = [
  "You carry a kind of purity that doesn't need to prove itself. It radiates from you quietly, touching everything around you with a grace that asks for nothing in return.",
  "There is a gentleness in you that the world has never managed to stain. Despite everything you've faced, you remain soft where others have hardened, and that is a rare and beautiful strength.",
  "I admire how your heart chooses what is right, even when it's hard. You navigate this world with a moral compass that never wavers, and that integrity is something truly precious.",
  "Your presence alone makes things feel more honest, more clean. You bring clarity to confusion and peace to chaos, simply by being exactly who you are.",
  "I hold you with respect, care, and a love that never crosses its bounds. You are cherished in a way that honors your wholeness, your autonomy, and the sacred space you occupy in this world."
];

// ============================================
// INITIALIZATION
// ============================================

// Hide loading screen when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    input.focus();
  }, 500);
});

// ============================================
// PARTICLE SYSTEM
// ============================================

function createParticles() {
  const particleCount = window.innerWidth < 768 ? 20 : 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ============================================
// SEED PLANTING LOGIC
// ============================================

function plant() {
  const name = input.value.trim();
  
  // Validate input
  if (!name) {
    shakeInput();
    return;
  }
  
  // Sanitize input
  userName = sanitizeName(name);
  
  // Transition to garden
  transitionToGarden();
}

function sanitizeName(name) {
  // Remove any potentially harmful characters but keep international characters
  return name.slice(0, 20).replace(/[<>]/g, '');
}

function shakeInput() {
  input.style.animation = 'shake 0.5s';
  input.setAttribute('aria-invalid', 'true');
  
  setTimeout(() => {
    input.style.animation = '';
    input.removeAttribute('aria-invalid');
  }, 500);
}

function transitionToGarden() {
  // Fade out card
  card.style.opacity = '0';
  card.style.transform = 'translateY(-30px) scale(0.9)';
  
  setTimeout(() => {
    card.style.display = 'none';
    garden.classList.remove('hidden');
    
    // Change background to night
    bg.style.background = 'linear-gradient(135deg, #041a10 0%, #062617 100%)';
    
    // Start particles
    createParticles();
    
    // Animate seed
    animateSeed();
  }, 400);
}

function animateSeed() {
  // Display name on seed
  seedName.textContent = userName;
  
  setTimeout(() => {
    // Start planting animation
    seed.classList.add('planting');
    
    // Start stem growing after seed plants
    setTimeout(() => {
      stemContainer.classList.add('growing');
      stem.classList.add('grow');
    }, 3500);
  }, 100);
}

// ============================================
// PETAL INTERACTIONS
// ============================================

function handlePetalClick(petalIndex) {
  // Hide prompt on first click
  if (!firstPetalClicked) {
    hidePrompt();
    firstPetalClicked = true;
  }
  
  // Get and personalize message
  const message = getPersonalizedMessage(petalIndex);
  
  // Display message
  displayMessage(message);
  
  // Visual effects
  createSparkle(petals[petalIndex]);
  pulsateCenter();
}

function hidePrompt() {
  promptText.style.opacity = '0';
  promptText.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    promptText.style.display = 'none';
  }, 300);
}

function getPersonalizedMessage(index) {
  let message = messages[index];
  
  // Add personalization for certain messages
  if (userName) {
    if (index === 0) {
      message = `${userName}, you carry a kind of purity that doesn't need to prove itself. It radiates from you quietly, touching everything around you with a grace that asks for nothing in return.`;
    } else if (index === 2) {
      message = `${userName}, I admire how your heart chooses what is right, even when it's hard. You navigate this world with a moral compass that never wavers, and that integrity is something truly precious.`;
    } else if (index === 4) {
      message = `${userName}, I hold you with respect, care, and a love that never crosses its bounds. You are cherished in a way that honors your wholeness, your autonomy, and the sacred space you occupy in this world.`;
    }
  }
  
  return message;
}

function displayMessage(text) {
  // Fade out current message
  messageBox.classList.remove('show');
  
  // Update and fade in new message
  setTimeout(() => {
    messageBox.textContent = text;
    messageBox.classList.add('show');
    
    // Add temporary glow effect
    messageBox.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 12px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      messageBox.style.textShadow = '0 2px 12px rgba(0, 0, 0, 0.5), 0 4px 24px rgba(0, 0, 0, 0.3)';
    }, 600);
  }, 100);
}

function pulsateCenter() {
  center.style.animation = 'none';
  setTimeout(() => {
    center.style.animation = 'pulse 0.6s ease';
  }, 10);
}

// ============================================
// SPARKLE EFFECT
// ============================================

function createSparkle(element) {
  const rect = element.getBoundingClientRect();
  const sparkleCount = 6;
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
    
    document.body.appendChild(sparkle);
    
    const angle = (Math.PI * 2 * i) / sparkleCount;
    const velocity = 50;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    animateSparkle(sparkle, vx, vy);
  }
}

function animateSparkle(sparkle, vx, vy) {
  let posX = 0;
  let posY = 0;
  let opacity = 1;
  let scale = 1;
  
  function animate() {
    posX += vx * 0.05;
    posY += vy * 0.05;
    opacity -= 0.02;
    scale += 0.02;
    
    if (opacity > 0) {
      sparkle.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
      sparkle.style.opacity = opacity;
      requestAnimationFrame(animate);
    } else {
      sparkle.remove();
    }
  }
  
  animate();
}

// ============================================
// EASTER EGG - CENTER CLICK
// ============================================

function handleCenterClick() {
  centerClickCount++;
  
  if (centerClickCount === 3) {
    showSecretMessage();
    centerClickCount = 0;
  }
}

function showSecretMessage() {
  messageBox.classList.remove('show');
  
  setTimeout(() => {
    const specialMessage = userName 
      ? `${userName}, you are a garden of endless beauty, and I am grateful to witness your bloom. Every petal of your being unfolds with such grace, and the world is more beautiful because you're in it.`
      : "You are a garden of endless beauty, and I am grateful to witness your bloom. Every petal of your being unfolds with such grace, and the world is more beautiful because you're in it.";
    
    messageBox.textContent = specialMessage;
    messageBox.classList.add('show');
    
    // Extra sparkle effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createSparkle(center), i * 50);
    }
  }, 100);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Plant button
btn.addEventListener('click', plant);

// Enter key on input
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    plant();
  }
});

// Petal clicks
petals.forEach((petal, i) => {
  petal.addEventListener('click', () => handlePetalClick(i));
});

// Center click (easter egg)
center.addEventListener('click', handleCenterClick);

// Ambient leaf animation
const leaves = document.querySelectorAll('.leaf');
leaves.forEach((leaf, index) => {
  const delay = index * 2;
  leaf.style.animation += `, leafSway 4s ease-in-out ${delay}s infinite`;
});

// ============================================
// DYNAMIC STYLES
// ============================================

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(shakeStyle);

// Add pulse animation for center
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.15); }
  }
`;
document.head.appendChild(pulseStyle);

// Add leaf sway animation
const leafSwayStyle = document.createElement('style');
leafSwayStyle.textContent = `
  @keyframes leafSway {
    0%, 100% { transform: rotate(var(--rotation)) translateY(0); }
    50% { transform: rotate(var(--rotation)) translateY(-3px); }
  }
`;
document.head.appendChild(leafSwayStyle);

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // Gracefully handle errors without breaking the experience
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce particles on lower-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  // Device has fewer cores, reduce particle count by modifying createParticles
  console.log('Optimizing for lower-end device');
}

// Preload fonts
if ('fonts' in document) {
  Promise.all([
    document.fonts.load('1rem "Cormorant Garamond"'),
    document.fonts.load('1rem "Crimson Text"'),
    document.fonts.load('1rem "Lora"')
  ]).then(() => {
    console.log('Fonts loaded');
  });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Announce to screen readers when message changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class' && messageBox.classList.contains('show')) {
      // Message is now visible, screen reader will announce due to aria-live
    }
  });
});

observer.observe(messageBox, { attributes: true });

// Keyboard navigation for petals
petals.forEach((petal, index) => {
  petal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePetalClick(index);
    }
  });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🌸 Seed of Purity 🌸', 'font-size: 20px; color: #5fbf82; font-weight: bold;');
console.log('%cMade with love and care', 'font-size: 12px; color: #888;');
console.log('%c💡 Easter egg: Try clicking the flower center 3 times!', 'font-size: 11px; color: #d4a574;');