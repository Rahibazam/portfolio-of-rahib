// Check if this is the user's first visit
function isFirstVisit() {
    return !sessionStorage.getItem('hasVisited');
}

// Mark that the user has visited
function markAsVisited() {
    sessionStorage.setItem('hasVisited', 'true');
}

// Hide loader function
function hideAtomicLoader() {
    const loader = document.getElementById('atomicLoader');
    const mainContent = document.getElementById('atomicMainContent');

    if (loader && mainContent) {
        loader.classList.add('atomic-slide-up');
        mainContent.classList.add('atomic-show');

        setTimeout(function () {
            loader.style.display = 'none';
        }, 1200);
    }
}

// Preload critical hero content
function preloadHeroContent() {
    return new Promise((resolve) => {
        // Add your hero background image path here
        const heroImage = new Image();
        heroImage.onload = resolve;
        heroImage.onerror = resolve; // Still resolve on error to avoid hanging

        // Replace with your actual hero background image path
        const heroImageSrc = document.querySelector('[data-hero-bg]')?.dataset.heroBg ||
            document.querySelector('.hero')?.style.backgroundImage?.match(/url\(['"]?([^'"]+)['"]?\)/)?.[1];

        if (heroImageSrc) {
            heroImage.src = heroImageSrc;
        } else {
            // If no hero image found, resolve immediately
            resolve();
        }
    });
}

// Initialize loader state immediately (before DOM loads)
(function () {
    const loader = document.getElementById('atomicLoader');

    // For return visits, hide loader immediately - don't even show it
    if (!isFirstVisit() && loader) {
        loader.style.display = 'none';
    }
})();

// Early DOM check for return visits
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('atomicLoader');
    const mainContent = document.getElementById('atomicMainContent');

    // If not first visit, ensure loader is hidden and content is shown
    if (!isFirstVisit()) {
        if (loader) {
            loader.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.add('atomic-show');
        }
        return;
    }

    // For first visits, start preloading hero content immediately
    preloadHeroContent().then(() => {
        // Hero content is ready, we can hide loader early if needed
        if (isFirstVisit()) {
            hideAtomicLoader();
            markAsVisited();
        }
    });
});

// Fallback - ensure everything works even if hero preload fails
window.addEventListener('load', function () {
    const loader = document.getElementById('atomicLoader');
    const mainContent = document.getElementById('atomicMainContent');

    // If not first visit and somehow still visible, hide immediately
    if (!isFirstVisit()) {
        if (loader && loader.style.display !== 'none') {
            loader.style.display = 'none';
        }
        if (mainContent && !mainContent.classList.contains('atomic-show')) {
            mainContent.classList.add('atomic-show');
        }
        return;
    }

    // For first visits - only run if loader hasn't been hidden yet
    if (loader && loader.style.display !== 'none') {
        markAsVisited();

        // Minimum loading time for smooth experience, but shorter than before
        setTimeout(function () {
            hideAtomicLoader();
        }, 500); // Reduced from 1000ms to 500ms
    }
});

// Optional: Manually hide loader when specific content is ready (first visit only)
function hideAtomicLoaderIfFirstVisit() {
    if (isFirstVisit()) {
        hideAtomicLoader();
        markAsVisited();
    }
}