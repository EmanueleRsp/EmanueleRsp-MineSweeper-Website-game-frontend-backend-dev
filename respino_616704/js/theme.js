/* INIZIALIZZAZIONE VARIABILE LOCALE PER IL TEMA DEL GIOCO */
if(localStorage.getItem('theme') == null){

    let hour = (new Date()).getHours();
    let th;

    if(hour < 8 || hour > 19)
        th = 'dark';
    else
        th = 'light';
    
    localStorage.setItem('theme', th);

}

/* SETTAGGIO COLORI DEL TEMA */
let theme = localStorage.getItem('theme');
document.body.className = (theme == 'light') ? '' : 'dark';
