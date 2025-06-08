
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

// Main loading logic
window.addEventListener('load', function () {
    const loader = document.getElementById('atomicLoader');
    const mainContent = document.getElementById('atomicMainContent');

    // If not first visit, hide loader immediately and show content
    if (!isFirstVisit()) {
        if (loader) {
            loader.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.add('atomic-show');
        }
        return;
    }

    // Mark as visited for subsequent page loads/refreshes
    markAsVisited();

    // Simulate loading time for first visit only
    setTimeout(function () {
        // Slide loader up and fade out
        if (loader) {
            loader.classList.add('atomic-slide-up');
        }

        // Show main content immediately with entrance animation
        if (mainContent) {
            mainContent.classList.add('atomic-show');
        }

        // Remove loader from DOM after animation completes
        setTimeout(function () {
            if (loader) {
                loader.style.display = 'none';
            }
        }, 1200); // Matches the transition duration
    }, 1000); // 1 second loading time - adjust as needed
});

// Optional: Manually hide loader when specific content is ready (first visit only)
function hideAtomicLoaderIfFirstVisit() {
    if (isFirstVisit()) {
        hideAtomicLoader();
        markAsVisited();
    }
}