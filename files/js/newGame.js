const larghezza = document.getElementById('larghezza');
const lunghezza = document.getElementById('lunghezza');
const mine = document.getElementById('mine');

const ore = document.getElementById('ore');
const minuti = document.getElementById('minuti');
const secondi = document.getElementById('secondi');

// Si fa in modo che solo un'opzione di difficoltà sia attiva in un certo istante cliccando sulla relativa card
const diffLabels = document.querySelectorAll('#list__difficulty .label');
diffLabels.forEach((label, i) => {
    const btns = document.querySelectorAll('#list__difficulty input[type="radio"]');
    label.addEventListener('click', () => {
        btns.forEach((btn, index) => {
            if(index != i)
                btn.checked = false;
            else
                btn.checked = true;
        });
    });
});

// Si fa in modo che solo un'opzione di modalità sia attiva in un certo istante cliccando sulla relativa card
const modeLabels = document.querySelectorAll('#list__mode .label');
modeLabels.forEach((label, i) => {
    const btns = document.querySelectorAll('#list__mode input[type="radio"]');
    label.addEventListener('click', () => {
        btns.forEach((btn, index) => {
            if(index != i)
                btn.checked = false;
            else
                btn.checked = true;
        });
    });
});


/*
    FUNZIONE RICHIAMATA PER CONVALIDARE IL FORM ALL'INVIO
*/
let notifyTimeout;
const notifyTexts = [
    "La larghezza del campo deve essere maggiore di 0.", 
    "La larghezza del campo può essere al massimo 400.", 

    "La lunghezza del campo deve essere maggiore di 0.", 
    "La lunghezza del campo deve essere al massimo 400.", 
    
    "Il numero di mine del campo deve maggiore di 0.", 
    "Il numero il numero massimo di mine è lunghezza X larghezza del campo - 9.", 

    "Il numero di ore deve essere compreso tra 0 e 99.",
    "Il numero di minuti deve essere compreso tra 0 e 59.",
    "Il numero di secondi deve essere compreso tra 0 e 59.",

    "Il tempo non può essere nullo.",

    "Densità delle mine troppo bassa (almeno 10%)." 
];
function validateForm() {

    document.querySelector('.pre-game-notify').className = 'pre-game-notify';
    clearTimeout(notifyTimeout);

    let form = document.forms['game-form'];

    // Si controllano gli input della difficoltà personalizzata se occorre
    if(form['difficolta'].value == 'personalizzato'){

        if(form['larghezza'].value == '')
            form['larghezza'].value = parseInt(document.getElementById('larghezza').placeholder);
            
        if(form['lunghezza'].value == '')
            form['lunghezza'].value = parseInt(document.getElementById('lunghezza').placeholder);
            
        if(form['mine'].value == '')
            form['mine'].value = parseInt(document.getElementById('mine').placeholder);
                
        if(form['larghezza'].value <= 0){
            setPreGameNotify(notifyTexts[0]);
            return false;    
        }
        if(form['larghezza'].value > 400){
            setPreGameNotify(notifyTexts[1]);
            return false;    
        }
        
        if(form['lunghezza'].value <= 0){
            setPreGameNotify(notifyTexts[2]);
            return false;    
        }
        if(form['lunghezza'].value > 400){
            setPreGameNotify(notifyTexts[3]);
            return false;    
        }
        
        if(form['mine'].value <= 0){
            setPreGameNotify(notifyTexts[4]);
            return false;    
        }
        if(form['mine'].value > form['lunghezza'].value * form['larghezza'].value - 9){
            setPreGameNotify(notifyTexts[5]);
            return false;    
        }    
        if(form['mine'].value / (form['lunghezza'].value * form['larghezza'].value) < 0.1){
            setPreGameNotify(notifyTexts[10]);
            return false;    
        }    

    }

    // Si controllano gli input del tempo se occorre
    if(form['mode'].value == 'tempo'){   

        if(form['ore'].value == '' && 
           form['minuti'].value == '' && 
           form['secondi'].value == ''){
        
            form['ore'].value = parseInt(document.getElementById('ore').placeholder);
            form['minuti'].value = parseInt(document.getElementById('minuti').placeholder);
            form['secondi'].value = parseInt(document.getElementById('secondi').placeholder);

        }else{
            if(form['ore'].value == '')
                form['ore'].value = 0;
            
            if(form['minuti'].value == '')
                form['minuti'].value = 0;
            
            if(form['secondi'].value == '')
                form['secondi'].value = 0;
        }
            
        if(form['ore'].value < 0 || form['ore'].value > 99){
            setPreGameNotify(notifyTexts[6]);
            return false;    
        }
        
        if(form['minuti'].value < 0 || form['minuti'].value > 59){
            setPreGameNotify(notifyTexts[7]);
            return false;    
        }
        
        if(form['secondi'].value < 0 || form['secondi'].value > 59){
            setPreGameNotify(notifyTexts[8]);
            return false;    
        }   

        if(form['ore'].value == 0 && 
           form['minuti'].value == 0 &&
           form['secondi'].value == 0){
            setPreGameNotify(notifyTexts[9]);
            return false;
        }

    }

}

/*
    FUNZIONE PER VISUALIZZARE LE NOTIFICHE DI ERRORE NELLA
    COMPILAZIONE DEL FORM DI SETTAGGIO PARTITA
*/
function setPreGameNotify(notify) {
    document.querySelector('.pre-game-notify .notify-text').innerText = notify; 
    document.querySelector('.pre-game-notify').classList.add('notified');
    notifyTimeout = setTimeout(() => document.querySelector('.pre-game-notify').className = 'pre-game-notify', 5000);
}