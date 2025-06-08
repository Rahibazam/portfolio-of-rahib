
// Auto-close drawer when any navigation link inside drawer is clicked
document.addEventListener('DOMContentLoaded', function () {
    const drawerCheckbox = document.getElementById('my-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-side a[href]');

    console.log('Found drawer links:', drawerLinks.length);

    drawerLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Drawer link clicked:', this.href);
            // Uncheck the drawer checkbox to close it
            drawerCheckbox.checked = false;
        });
    });
});