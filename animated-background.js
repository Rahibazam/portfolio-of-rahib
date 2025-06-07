// Ultra-optimized particle system for heavy-duty sites
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.maxParticles = window.innerWidth < 768 ? 12 : 18; // More particles
        this.animationId = null;
        this.isVisible = true;
        this.init();
        this.setupVisibilityOptimization();
    }

    init() {
        // Use requestAnimationFrame for optimal timing
        this.createParticles();
        this.scheduleNextParticle();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => this.createParticle(), i * 800); // Slower spawn rate
        }
    }

    createParticle() {
        if (!this.isVisible) return;

        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2; // Bigger particles (2-6px)
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        const duration = Math.random() * 12 + 8; // Slower particles
        const drift = (Math.random() - 0.5) * 200;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = Math.random() * 0.6 + 0.4; // More visible
        particle.style.setProperty('--drift', drift + 'px');

        let startPos, animation;

        switch (side) {
            case 0: // Top
                startPos = Math.random() * window.innerWidth;
                particle.style.left = startPos + 'px';
                particle.style.top = '-10px';
                animation = 'particleFromTop';
                break;
            case 1: // Right
                startPos = Math.random() * window.innerHeight;
                particle.style.right = '-10px';
                particle.style.top = startPos + 'px';
                animation = 'particleFromRight';
                break;
            case 2: // Bottom
                startPos = Math.random() * window.innerWidth;
                particle.style.left = startPos + 'px';
                particle.style.bottom = '-10px';
                animation = 'particleFromBottom';
                break;
            case 3: // Left
                startPos = Math.random() * window.innerHeight;
                particle.style.left = '-10px';
                particle.style.top = startPos + 'px';
                animation = 'particleFromLeft';
                break;
        }

        particle.style.animation = `${animation} ${duration}s linear forwards`;

        this.container.appendChild(particle);
        this.particles.push(particle);

        // Auto-remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, duration * 1000);
    }

    scheduleNextParticle() {
        if (this.isVisible) {
            setTimeout(() => {
                this.createParticle();
                this.scheduleNextParticle();
            }, Math.random() * 2000 + 1000); // Random spawn timing
        }
    }

    // Pause animations when tab is not visible
    setupVisibilityOptimization() {
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible) {
                this.scheduleNextParticle();
            }
        });
    }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// Handle resize with debouncing and minimal impact
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Only recreate if significant size change
        const newWidth = window.innerWidth;
        if (Math.abs(newWidth - (window.lastWidth || 0)) > 100) {
            window.lastWidth = newWidth;
            // Reinitialize particle system with new dimensions
            document.getElementById('particles').innerHTML = '';
            new ParticleSystem();
        }
    }, 500);
});