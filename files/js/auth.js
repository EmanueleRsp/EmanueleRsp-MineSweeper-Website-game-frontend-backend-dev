// ------------------------------------------------------------------------ //
//               INIZIALIZZAZIONE CAMPI DOMANDA DI SICUREZZA                //
// ------------------------------------------------------------------------ //

/* VETTORE DOMANDE DI SICUREZZA */
const securityQuests = [
    "Il nome del tuo primo ragazzo/a?",
    "La tua squadra del cuore?",
    "Il nome del tuo professore di matematica alle superiori?",
    "Il nome del tuo primo animale?",
    "Il cognome da nubile di tua madre?",
    "Il nome della scuola elementare?",
    "Il tuo primo lavoro svolto?",
    "Il tuo libro per bambini preferito?",
    "Il tuo colore preferito?",
    "Il tuo migliore amico delle medie?",
    "La tua città preferita?"
];

/* CLASSE DOMANDE DI SICUREZZA */
class QuestsList{

    constructor(){
        this.list = securityQuests;
    }

    getList(){
        let htmlList;
        this.list.forEach((elem, i) => {
            htmlList = htmlList + '<option value="' + i +'">' + elem + '</option>';
        });
        return htmlList;
    }

}

// Inizializzazione campi domanda di sicurezza
document.querySelectorAll('select').forEach(elem => (elem.innerHTML = (new QuestsList()).getList()));



// ------------------------------------------------------------------------ //
//                         GESTIONE MENU' A COMPARSA                        //
// ------------------------------------------------------------------------ //
/*
    DESCRIZIONE CLASSI E FUNZIONAMENTO:

    .box.opened -> La finestra è aperta
    .box -> La finestra visualizza il form di login (senza .opened però è chiusa) 
    .box.active -> La finestra visualizza il form di registrazione (senza .opened però è chiusa)
    .box.recovery -> La finestra visualizza il form di recovery psw (senza .opened però è chiusa)
*/

/* ELEMENTI SU CUI APPLICARE LE CLASSI */
const box = document.querySelector('.box');
const translate = document.querySelector('.translate');

/* PULSANTI DI APERTURA E CHIUSURA FINESTRA */
const authButton = document.querySelector('.header-button-auth-popup');
const escButton = document.querySelector('.box-close');

/* LINK CHE PERMETTONO IL PASSAGGIO DA UNA FINESTRA ALL'ALTRA */
const logLink = document.querySelector('.log-link');
const loginLink = document.querySelector('.login-link');
const recoveryLink = document.querySelector('.recovery-link');
const registerLink = document.querySelector('.register-link');


/* GESTIONE CLASSE ACTIVE */
loginLink.addEventListener('click', ()=>{
    box.classList.add('active');
    
    document.getElementById('r-password').setAttribute('type', 'password');
    document.getElementById('r-confirm-password').setAttribute('type', 'password');
    document.getElementById('r-risposta').setAttribute('type', 'password');
    document.getElementById('r-conferma-risposta').setAttribute('type', 'password');
    document.querySelectorAll('.register-content ion-icon[name|="eye"]').forEach((elem) => {elem.name = 'eye'});
});
registerLink.addEventListener('click', ()=>{
    box.classList.remove('active');

    document.getElementById('l-password').setAttribute('type', 'password');
    document.querySelectorAll('.content ion-icon[name|="eye"]').forEach((elem) => {elem.name = 'eye'});
});

/* GESTIONE CLASSE recovery */
recoveryLink.addEventListener('click', ()=>{
    box.classList.add('recovery');
    
    document.getElementById('p-password').setAttribute('type', 'password');
    document.getElementById('p-confirm-password').setAttribute('type', 'password');
    document.getElementById('p-risposta').setAttribute('type', 'password');
    document.querySelectorAll('.recovery-content ion-icon[name|="eye"]').forEach((elem) => {elem.name = 'eye'});
});
logLink.addEventListener('click', ()=>{
    box.classList.remove('recovery');

    document.getElementById('l-password').setAttribute('type', 'password');
    document.querySelectorAll('.content ion-icon[name|="eye"]').forEach((elem) => {elem.name = 'eye'});
});


/* GESTIONE CLASSI OPENED E HIGHLIGHT */

// Quando apro la finestra si chiude l'eventuale menù a scomparsa
if(authButton != null){
    authButton.addEventListener('click', ()=>{
        if(!box.className.includes('opened')){
            box.classList.add('opened');
            translate.classList.add('highlight');
        }

        document.body.classList.remove('menu-open');
    });
}
escButton.addEventListener('click', ()=>{
    box.classList.remove('opened');
    setTimeout(() => translate.classList.remove('highlight'), 500);
});




// ------------------------------------------------------------------------ //
//                              GESTIONE FORMS                              //
// ------------------------------------------------------------------------ //


/* CLASSE NOTIFY */
class Notify{
    constructor(text, color){
        this.text = text;
        this.color = color;
    }
}

/* OGGETTO CONTENENTE LE NOTIFICHE */
const logNotifyResults = {

    emailRegExError : new Notify('Email vuota o non valida.', 'lightcoral'),
    pswRegExError : new Notify('Criteri password: 8-30 caratteri, almeno un: carattere speciale, maiuscola, minuscola, numero.', 'lightcoral'),
    ansRegExError : new Notify('Risposta vuota o non valida: 3-30 caratteri alfanumerici, evitare spazi ad inizio e fine frase.', 'lightcoral'),
    userRegExError : new Notify('Username vuoto o non valido: 8-20 caratteri alfanumerici, "." e "_" permessi ma non ad inizio e fine username.', 'lightcoral'),
    
    pswMismatchError : new Notify('I due campi password non coincidono.', 'lightcoral'),
    ansMismatchError : new Notify('I due campi di risposta non coincidono.', 'lightcoral'),

    emailRegExVal : new Notify('Email valida!', 'lightgreen'),
    pswRegExVal : new Notify('Password valida!', 'lightgreen'),
    ansRegExVal : new Notify('Risposta valida!', 'lightgreen'),
    userRegExVal : new Notify('Username valido!', 'lightgreen'),
    
    pswMismatchVal : new Notify('Password confermata!', 'lightgreen'),
    ansMismatchVal : new Notify('Risposta confermata!', 'lightgreen'),
                
    emailAvailabilityErr : new Notify('❌ Email non disponibile.', 'lightcoral'),
    emailAvailabilityVal : new Notify('✔️ Email disponibile.', 'lightgreen'),

    userAvailabilityErr : new Notify('❌ Username non disponibile.', 'lightcoral'),
    userAvailabilityVal : new Notify('✔️ Username disponibile.', 'lightgreen'),

    regDone : new Notify('REGISTRATO! Adesso puoi procedere al login.', 'lightgreen'),
    logDone : new Notify('ACCESSO EFFETTUATO! La pagina sarà ricaricata.', 'lightgreen'),
    recDone : new Notify('PASSWORD RECUPERATA! Adesso puoi procedere al login.', 'lightgreen'),
    
    formErr : new Notify('Alcuni campi sono vuoti o non validi', 'lightcoral'),
    
};

/* REGULAR EXPRESSIONS */

// - lunghezza: 8-20 caratteri ->       (?=.{8,20}$)
// - "_" e "." vietati all'inizio ->    (?![_.])
// - "__", "._", "_." e ".." vietati -> (?!.*[_.]{2})
// - caratteri ammessi ->               [a-zA-Z0-9._]
// - "_" e "." vietati alla fine ->     (?<![_.])
const usernameRegExp = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
// RegEx per convalida email
const emailRegExp = /^[a-zA-Z0-9._%+-]{1,48}@[a-zA-Z0-9.-]{1,48}\.[a-zA-Z]{2,4}$/;
// - almeno un carattere minuscolo ->                   (?=.*[a-z])
// - almeno un carattere maiuscolo ->                   (?=.*[A-Z])
// - almeno una cifra ->                                (?=.*\d)
// - almeno un carattere speciale tra @$!%*?& ->        (?=.*[@$!%*?&])
// - lunghezza: 8-30 caratteri tra quelli consentiti -> [A-Za-z\d@$!%*?&]{8,30}
const pswRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
// RegEx per convalida risposta di sicurezza
const ansRegExp = /^(?=.{3,30}$)(?![\s])(?!.*[\s]{2})[a-zA-Z0-9\s]+(?<![\s])$/;

/* VARIABILI CONTROLLO VALIDITA' INPUT */
let pswValidity = {'login': false, 'recovery': false, 'register': false};
let emailValidity = {'login': false, 'recovery': false, 'register': false};
let userValidity = {'login': false, 'recovery': false, 'register': false};
let pswConfValidity = {'login': false, 'recovery': false, 'register': false};
let ansValidity = {'login': false, 'recovery': false, 'register': false};
let ansConfValidity = {'login': false, 'recovery': false, 'register': false};

/* LISTENER SUBMIT LOGIN */
function loginSubmit(e) {
    e.preventDefault();

    const form = e.target.form;
    const type = form.name.replaceAll('-form', '');

    // Check validità inputs
    if(!pswValidity[type] || !emailValidity[type]){
        setLoginNotify(logNotifyResults['formErr'], type);
        return;
    }

    // Dati da inviare
    let formData = new FormData();
    formData.append('action', type);
    formData.append('email', form['email'].value);
    formData.append('password', form['password'].value);

    // Invio richiesta e gestione risultato
    fetch("./redirector/authRedirector.php", {
        method: 'POST',
        body: formData
    })
    .then(data => data.json())
    .then(data => {
        if(!data.error){

            setLoginNotify(logNotifyResults['logDone'], type);
        
            setTimeout(() => {  
                document.location.reload();
                
                form['email'].value = '';
                form['password'].value = '';
            }, 4000);

        }else{

            setLoginNotify(logNotifyResults['formErr'], type, data.error);
            return;
        
        }

    });

}

/* LISTENER SUBMIT REGISTER */
function registerSubmit(e) {
    e.preventDefault();

    const form = e.target.form;
    const type = form.name.replaceAll('-form', '');

    // Check validità inputs
    if(!pswValidity[type] || !emailValidity[type] || !userValidity[type] || !pswConfValidity[type] || !ansConfValidity[type] || !ansValidity[type]){
        setLoginNotify(logNotifyResults['formErr'], type);
        return;
    }

    // Dati da inviare
    let formData = new FormData();
    formData.append('action', type);
    formData.append('username', form['username'].value);
    formData.append('email', form['email'].value);
    formData.append('password', form['password'].value);
    formData.append('securityAns', form['risposta'].value);
    formData.append('securityQuest', form['domanda-recovery'].value);

    // Invio richiesta e gestione risultato
    fetch("./redirector/authRedirector.php", {
        method: 'POST',
        body: formData
    })
    .then(data => data.json())
    .then(data => {

        if(!data.error){
            setLoginNotify(logNotifyResults['regDone'], type);
        
            setTimeout(() => {
                document.querySelector('.translate .box').classList.remove('active');
                form['email'].value = '';
                form['password'].value = '';
                form['username'].value = '';
                form['confirm-password'].value = '';
                form['risposta'].value = '';
                form['conferma-risposta'].value = '';
            }, 2000);

        }else{

            setLoginNotify(logNotifyResults['formErr'], type, data.error);
            return;
        
        }

    });

}

/* LISTENER SUBMIT RECOVERY */
function recoverySubmit(e){
    e.preventDefault();

    const form = e.target.form;
    const type = form.name.replaceAll('-form', '');

    // Check validità inputs
    if(!pswValidity[type] || !emailValidity[type] || !pswConfValidity[type] || !ansValidity[type]){
        setLoginNotify(logNotifyResults['formErr'], type);
        return;
    }

    // Dati da inviare
    let formData = new FormData();
    formData.append('action', type);
    formData.append('email', form['email'].value);
    formData.append('password', form['password'].value);
    formData.append('securityAns', form['risposta'].value);
    formData.append('securityQuest', form['domanda-recovery'].value);

    // Invio richiesta e gestione risultato
    fetch("./redirector/authRedirector.php", {
        method: 'POST',
        body: formData
    })
    .then(data => data.json())
    .then(data => {

        if(!data.error){

            setLoginNotify(logNotifyResults['recDone'], type);
            
            setTimeout(() => {
                document.querySelector('.translate .box').classList.remove('recovery');
                form['email'].value = '';
                form['password'].value = '';
                form['confirm-password'].value = '';
                form['risposta'].value = '';
            }, 2000);

        }else{

            setLoginNotify(logNotifyResults['formErr'], type, data.error);
            return;
        
        }

    });

}


/* EMAIL CHECK */
let emailCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    // Check regEx
    if(!emailRegExp.test(e.target.value)){
        setLoginNotify(logNotifyResults['emailRegExError'], type);
        emailValidity[type] = false;
        return;
    }

    // Eventuale check disponibilità
    if(type == 'register'){

        let data = new FormData();
        data.append('action', 'emailCheck');
        data.append('email', e.target.value);

        fetch("./redirector/authRedirector.php", {
            method: 'POST',
            body: data
        })
        .then(data => data.json())
        .then(data => {

            if(!data.error){
                emailValidity[type] = true;
                setLoginNotify(logNotifyResults['emailAvailabilityVal'], type);  
            }else{
                emailValidity[type] = false;
                setLoginNotify(logNotifyResults['emailAvailabilityErr'], type);
            } 

        });

    }else{
        
        emailValidity[type] = true;
        setLoginNotify(logNotifyResults['emailRegExVal'], type);

    }
}

/* USERNAME CHECK */
let usernameCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    if(!usernameRegExp.test(e.target.value)){
        setLoginNotify(logNotifyResults['userRegExError'], type);
        userValidity[type] = true;
        return;
    }

    // Eventuale check disponibilità
    if(type == 'register'){

        let data = new FormData();
        data.append('action', 'userCheck');
        data.append('username', e.target.value);

        fetch("./redirector/authRedirector.php", {
            method: 'POST',
            body: data
        })
        .then(data => data.json())
        .then(data => {

            if(!data.error){
                emailValidity[type] = true;
                setLoginNotify(logNotifyResults['userAvailabilityVal'], type);  
            }else{
                emailValidity[type] = false;
                setLoginNotify(logNotifyResults['userAvailabilityErr'], type);
            } 
            
        });

    }else{
        
        emailValidity[type] = true;
        setLoginNotify(logNotifyResults['emailRegExVal'], type);

    }

}

/* PASSWORD CHECK */
let pswCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    if(!pswRegExp.test(e.target.value)){
        if(type == 'login'){
            setLoginNotify(logNotifyResults['pswRegExError'], type, 'Password vuota o non valida.');
        }else{
            setLoginNotify(logNotifyResults['pswRegExError'], type);
        }
        pswValidity[type] = true;
        return;
    }

    pswValidity[type] = true;
    setLoginNotify(logNotifyResults['pswRegExVal'], type);

}

/* SECURITY ANSWER CHECK */
let ansCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    if(!ansRegExp.test(e.target.value)){
        setLoginNotify(logNotifyResults['ansRegExError'], type);
        ansValidity[type] = true;
        return;
    }

    ansValidity[type] = true;
    setLoginNotify(logNotifyResults['ansRegExVal'], type);

}

/* CONFIRM PSW CHECK */
let pswConfCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    if(document.forms[e.target.form.name]['password'].value != e.target.value){
        setLoginNotify(logNotifyResults['pswMismatchError'], type);
        pswConfValidity[type] = true;
        return;
    }

    pswConfValidity[type] = true;
    setLoginNotify(logNotifyResults['pswMismatchVal'], type);

}

/* CONFIRM SECURITY ANS CHECK */
let ansConfCheckValidity = (e) => {
    if(e.key == "Enter"){
        return;
    }

    const type = e.target.form.name.replaceAll('-form', '');

    if(document.forms[e.target.form.name]['risposta'].value != e.target.value){
        setLoginNotify(logNotifyResults['ansMismatchError'], type);
        ansConfValidity[type] = true;
        return;
    }

    ansConfValidity[type] = true;
    setLoginNotify(logNotifyResults['ansMismatchVal'], type);

}

/* LISTENERS INVIO FORMS */
document.querySelector('form[name="login-form"] button').addEventListener('click', loginSubmit);
document.querySelector('form[name="register-form"] button').addEventListener('click', registerSubmit);
document.querySelector('form[name="recovery-form"] button').addEventListener('click', recoverySubmit);

/* LISTENERS INPUTS CHECK */
document.querySelectorAll('form input[name="email"]').forEach(elem => elem.addEventListener('keyup', emailCheckValidity));
document.querySelectorAll('form input[name="username"]').forEach(elem => elem.addEventListener('keyup', usernameCheckValidity));
document.querySelectorAll('form input[name="password"]').forEach(elem => elem.addEventListener('keyup', pswCheckValidity));
document.querySelectorAll('form input[name="risposta"]').forEach(elem => elem.addEventListener('keyup', ansCheckValidity));
document.querySelectorAll('form input[name="confirm-password"]').forEach(elem => elem.addEventListener('keyup', pswConfCheckValidity));
document.querySelectorAll('form input[name="conferma-risposta"]').forEach(elem => elem.addEventListener('keyup', ansConfCheckValidity));


/* OGGETTO TIMEOUTS NOTIFICHE */
let timeouts = {
    login: null,
    register: null, 
    recovery: null
}

/* FUNZIONE SETTING NOTIFICA */
function setLoginNotify(notify, type, def = '') {

    const target = 'form[name="' + type + '-form"]';

    let box = document.querySelector(target + ' .notify');
    // let title = document.querySelector(target +' .notify-title');
    let text = document.querySelector(target + ' .notify-text');

    if(def == ''){
        text.innerHTML = notify.text;
    }else{
        text.innerHTML = def;
    }

    box.classList.add('notified');
    box.style.backgroundColor = notify.color;
    // title.innerHTML = notify.title;

    if(timeouts[type])
        clearTimeout(timeouts[type]);

    timeouts[type] = setTimeout(() => {
        box.className = 'notify';
        text.innerHTML = '';
    }, 3000);
}


/* VISIBILITA' PASSWORDS */
let toggleVisibility = (e) => {
    let icon = e.target;
    if(icon.name == 'eye'){
        icon.name = 'eye-off';
        icon.parentNode.parentNode.querySelector('input').type = 'text';
    }else{
        icon.name = 'eye';
        icon.parentNode.parentNode.querySelector('input').type = 'password';
    }
}

document.querySelectorAll('ion-icon[name|="eye"]').forEach(elem => elem.addEventListener('click', toggleVisibility));
