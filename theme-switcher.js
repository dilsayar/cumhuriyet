document.getElementById('theme-dropdown').addEventListener('change', function() {
    document.body.setAttribute('data-theme', this.value);
});
