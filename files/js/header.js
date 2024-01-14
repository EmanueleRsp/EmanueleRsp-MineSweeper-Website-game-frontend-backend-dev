/* FUNZIONE PER APRIRE/CHIUDERE IL MENU' A TENDINA */
const iconMenu = document.querySelector('.icon-menu');
iconMenu.addEventListener("click", function() {
    document.body.classList.toggle('menu-open');
});

/* FUNZIONE PER CAMBIARE TEMA */
let toggleTheme = function(){

    let theme = (localStorage.getItem('theme') == 'dark') ? 'light' : 'dark';
    document.body.className = theme;
    localStorage.setItem('theme', theme);

};
document.querySelectorAll(".colors *:not([class='toggle-switch'])").forEach(child => child.addEventListener('click', toggleTheme));