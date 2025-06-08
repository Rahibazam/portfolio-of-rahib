
document.addEventListener('DOMContentLoaded', function () {
    const pageContainer = document.getElementById('pageContainer');
    const pageLinks = document.querySelectorAll('.page-link');

    // Function to show the page
    function showPage() {
        pageContainer.classList.remove('slide-down');
        pageContainer.classList.add('slide-up');
    }

    // Initial page load
    setTimeout(showPage, 200);

    // Handle back button
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            // Page was loaded from cache (back button)
            showPage();
        }
    });

    // Add click event listeners to all page links
    pageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.href;

            if (!targetUrl || targetUrl === 'undefined' || targetUrl.includes('undefined')) {
                console.error('Invalid link detected:', this);
                return;
            }

            // Start slide down animation
            pageContainer.classList.remove('slide-up');
            pageContainer.classList.add('slide-down');

            // Navigate to new page after slide down completes
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });
});