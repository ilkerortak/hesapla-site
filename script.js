// Tema Yönetimi
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    if(themeToggle) themeToggle.textContent = '🌙';
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        let theme = 'light';
        if (document.body.classList.contains('dark')) {
            theme = 'dark';
            themeToggle.textContent = '🌙';
        } else {
            themeToggle.textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    });
}
