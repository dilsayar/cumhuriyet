document.getElementById('theme-dropdown').addEventListener('change', function() {
    document.body.setAttribute('data-theme', this.value);
});

// theme-switcher.js - Save and Load Theme

// Load the saved theme or default to 'pastel'
const savedTheme = localStorage.getItem('100theme') || 'pastel';
document.body.setAttribute('data-theme', savedTheme);
document.getElementById('theme-dropdown').value = savedTheme;

// Update the event listener to save the theme
document.getElementById('theme-dropdown').addEventListener('change', function() {
    const newTheme = this.value;
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('100theme', newTheme); // Save the theme
});
