
/* TRACCIA AUDIO DEL CLICK */
const click = new Audio("../aud/click.mp3");

/* INIZIALIZZAZIONE VARIABILE LOCALE PER IL CONTROLLO DEL VOLUME */
if(localStorage.getItem('audio') == null){

    localStorage.setItem('audio', 'high');

}

/* FUNZIONE PER ATTIVARE L'AUDIO ALLA PRESSIONE DEI TASTI */
let clickAudio = () => {

    // Si attiva se il volume non è muto
    if(localStorage.getItem('audio') == 'mute')
        return;

    click.pause();
    click.currentTime = 0.6;
    click.play();
}

/* SETTAGGIO IMPOSTAZIONE VOLUME */
document.querySelector('#audio').name = 'volume-' + localStorage.getItem('audio');

/* ASSOCIAZIONE AUDIO A TASTI DESIDERATI */
document.querySelectorAll('button, .switch, .switch *, a, div.btn, .label, .colors *:not([class="toggle-switch"]), input:not([type="number"]), #btn-menu, ion-icon[id|="zoom"], .register-link, .recovery-link, .login-link, select, option, .box-close, .header-link').forEach(elem => elem.addEventListener('click', clickAudio));

/* LISTENER PER CAMBIARE IMPOSTAZIONI DI VOLUME */
document.querySelector('#audio').addEventListener('click', (e) => {
    let audio = (localStorage.getItem('audio') == 'mute') ? 'high' : 'mute';
    localStorage.setItem('audio', audio);
    e.target.name = 'volume-' + audio;
})