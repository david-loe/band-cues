import { createApp } from 'vue'
import App from './App.vue'


import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Light/Dark Mode switch
function updateBootstrapTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
}
// Initiales Setzen des Themes
updateBootstrapTheme();
// Event-Listener für Änderungen
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateBootstrapTheme);

createApp(App).mount('#app')
