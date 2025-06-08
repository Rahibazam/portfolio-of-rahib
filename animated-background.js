// Ultra-optimized particle system for heavy-duty sites - TBT Optimized
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        if (!this.container) {
            console.error('Particles container not found');
            return;
        }
        
        this.particles = [];
        this.maxParticles = window.innerWidth < 768 ? 12 : 18;
        this.animationId = null;
        this.isVisible = true;
        this.init();
        this.setupVisibilityOptimization();
    }

    init() {
        // Create initial particles with small delays to spread the work
        this.createParticles();
        this.scheduleNextParticle();
    }

    createParticles() {
        // Create particles in smaller chunks to reduce blocking
        const chunkSize = 3;
        let created = 0;
        
        const createChunk = () => {
            const end = Math.min(created + chunkSize, this.maxParticles);
            
            for (let i = created; i < end; i++) {
                setTimeout(() => this.createParticle(), i * 800);
            }
            
            created = end;
            
            if (created < this.maxParticles) {
                // Small delay between chunks to avoid blocking
                setTimeout(createChunk, 50);
            }
        };
        
        createChunk();
    }

    createParticle() {
        if (!this.isVisible || !this.container) return;

        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const side = Math.floor(Math.random() * 4);
        const duration = Math.random() * 12 + 8;
        const drift = (Math.random() - 0.5) * 200;

        // Batch style updates to minimize reflows
        const styles = {
            width: size + 'px',
            height: size + 'px',
            opacity: Math.random() * 0.6 + 0.4
        };
        
        Object.assign(particle.style, styles);
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

        // Auto-remove after animation with better cleanup
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
            }
        }, duration * 1000);
    }

    scheduleNextParticle() {
        if (this.isVisible) {
            const delay = Math.random() * 2000 + 1000;
            setTimeout(() => {
                this.createParticle();
                this.scheduleNextParticle();
            }, delay);
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

    destroy() {
        this.isVisible = false;
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// Initialize particle system when page loads - simple approach
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing particle system...');
    window.particleSystem = new ParticleSystem();
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
            
            // Clean up existing system
            if (window.particleSystem) {
                window.particleSystem.destroy();
            }
            
            // Reinitialize particle system with new dimensions
            const container = document.getElementById('particles');
            if (container) {
                container.innerHTML = '';
                window.particleSystem = new ParticleSystem();
            }
        }
    }, 500);
});