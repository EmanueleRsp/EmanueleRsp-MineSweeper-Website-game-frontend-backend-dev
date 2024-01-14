// ---------------------------------------------- //
//                     AUDIO                      //
// ---------------------------------------------- //

/* INIZIALIZZAZIONE TRACCE AUDIO */
const cellClickAudio = new Audio('../aud/click.mp3');
let flagAudio = new Audio('../aud/flag.mp3');
let unflagAudio = new Audio('../aud/unflag.mp3');

let recordAudio = new Audio('../aud/newRecord.mp3');
let victoryAudio = new Audio('../aud/victory.mp3');
let defeatAudio = new Audio('../aud/defeat.mp3');

flagAudio.volume = 0.3;
unflagAudio.volume = 0.3;


// ---------------------------------------------- //
//               FUNZIONI DI GIOCO                //
// ---------------------------------------------- //

// Parametri di gioco
let jsonString;
let data;
let DIFFICULTY; 
let MODE;
let ORE;
let MINUTI;
let SECONDI;

// Classe che memorizza le informazioni di una cella
class Cella{
    constructor(){
        this.flagged = false;
        this.clicked = false;
        this.mine = false;
    }
}

// Array bidimensionale che rappresenta il tavolo di gioco
let board = [];

// Impostazioni tavola di gioco
// Indici: 
//  0-> numero di righe
//  1-> numero di colonne
//  2-> numero di mine
const PARAMS = {
    'principiante':     [9,   9,   10], 
    'intermedio':       [16,  16,  40], 
    'avanzato':         [16,  30,  99], 
    'superman':         [50,  50,  500], 
    'extraterrestre':   [100, 100, 2000], 
    'divino':           [210, 250, 10000]
};
let ROWS;
let COLUMNS;
let MINECOUNT;

// Icone flag e mina
const bombIcons = {
    'tempo': '💣',
    'classica': '🌼'
}
const flagIcon = '🚩';
let currentBomb;

// Variabili per il timer
let timer;
let mm;
let s;
let m;
let h;

// Altre variabili di stato del gioco
let cellToBeClicked;
let flagRemained;
let flagEnabled;
let gameOver;
let gameStarted;
let restart = false;
let firstGame = true;
let victory;
let minesFound;

/*
    Al caricamento della pagina
*/
window.onload = function(){

    jsonString = document.querySelector("meta[name='data']").content;
    data = JSON.parse(jsonString);

    DIFFICULTY = data["difficolta"];
    MODE = data["mode"];

    handlers();
    startGame();

}


/*
    Funzione che inizializza il gioco
*/
function startGame(){

    // Setto il tipo di mina
    currentBomb = bombIcons[MODE];

    // Setto i parametri del gioco (larghezza, lunghezza, mine)
    if(DIFFICULTY == 'personalizzato'){

        ROWS = data['lunghezza'];
        COLUMNS = data['larghezza'];
        MINECOUNT = data['mine'];
    
    }else{

        ROWS = PARAMS[DIFFICULTY][0];
        COLUMNS = PARAMS[DIFFICULTY][1];
        MINECOUNT = PARAMS[DIFFICULTY][2];
    
    }

    //Setto il tempo    
    mm = 0;
    if(MODE == 'classica'){
        s = 0;
        m = 0;
        h = 0;
    }else{
        SECONDI = parseInt(data['secondi']);
        MINUTI = parseInt(data['minuti']);
        ORE = parseInt(data['ore']);
        
        s = SECONDI;
        m = MINUTI;
        h = ORE;
    }
    visualizzaTempo();
    document.getElementById('time').style = '';


    // Inizializzo le variabili di stato
    cellToBeClicked = ROWS * COLUMNS - MINECOUNT;
    flagRemained = MINECOUNT;
    flagEnabled = false;
    gameOver = false;
    gameStarted = false;

    // Imposto dati del controller
    document.getElementById('minesLeft').innerText = cellToBeClicked;
    document.getElementById('mine').innerText = flagRemained;

    // Preparo il tavolo da gioco
    if(firstGame){
        popolaTavolo();
    }
    else
        ricopriTavolo();
    
}

function handlers() {
    
    // Imposto handlers bottoni flag e zoom
    document.getElementById('btn-flag').addEventListener('click', setFlag);
    zoomF();

    // Impostro handlers pulsanti menù
    document.getElementById('restartGame').addEventListener('click', restartGame);
    document.getElementById('newGame').addEventListener('click', newGame);
    document.getElementById('changeGame').addEventListener('click', changeGame);
    document.getElementById('btn-menu').addEventListener('click', menuOpener);
}

/*
    Funzione per popolare il tavolo di gioco alla prima partita
*/
function popolaTavolo() {
      
    destroyBoard();

    for(let i = 0; i < ROWS; i++){

        let row = [];
        let span = document.createElement('span');

        for(let j = 0; j < COLUMNS; j++){

            let cell = document.createElement('div');
            cell.id = i + '-' + j;
            cell.addEventListener("contextmenu", e => e.preventDefault());
            cell.addEventListener('mousedown', clickCell);
            span.append(cell);

            row.push(new Cella());
        
        }

        document.getElementById('board').append(span);

        board.push(row);

    }

}


/*
    Funzione per riavviare il tavolo con le stesse mine
*/
function ricopriTavolo() {
    
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLUMNS; j++){
            board[i][j].flagged = false;
            board[i][j].clicked = false;
            if(!restart)
                board[i][j].mine = false;
            let cell = document.getElementById(i + '-' + j);
            cell.style = '';
            cell.className = '';
            cell.innerText = '';
        }
    }

}


/*
    Funzione che rimuove gli elementi dalla tavola di gioco
*/
function destroyBoard(){
    let table = document.getElementById('board');
    while(table.firstChild)
        table.removeChild(table.firstChild);
}

/*
    Funzione che inizializza le celle contenenti mine
*/
function setMines(id) {

    // Le mine non devono essere inserite nella prima cella cliccata né adiacente
    let coords = id.split('-');
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);
    
    let minesLeft = MINECOUNT;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * ROWS);
        let c = Math.floor(Math.random() * COLUMNS);

        if(board[r][c].mine || ((r == row || r == row - 1 || r == row + 1) && (c == col || c == col - 1 || c == col +1)))
            continue;

        board[r][c].mine = true;
        minesLeft--;

    }

}


/*
    Funzioni per gestire il timer
*/
function incClock() {
    mm += 50;

    if(!(mm %= 1000)){
        s++;
        if(!(s %= 60)){
            m++;
            if(!(m %= 60)){
                if(h < 9999)
                    h++;
            }
        }
    }

    visualizzaTempo();
}

function decClock() {

    mm -= 50;

    if(!(h || m || s || mm))
        sconfitta();

    if(mm < 0){
        mm = 950;
        --s;
        if(s < 0){
            s = 59;
            --m;
            if(m < 0){
                m = 59;
                --h;
            }
        }
    }

    if(!(h || m || mm) && s <= 10)
        document.getElementById('time').style = 'transform: scale(1.2); color: red';
    else if(!(h || m) && s <= 10 && mm == 500)
        document.getElementById('time').style = '';

    

    visualizzaTempo();
}


/*
    Funzione per mostrare il tempo trascorso o quello rimanente
*/
function visualizzaTempo() {
    document.getElementById('time').innerText = ((h == 0)? '' : (( h > 9) ? h : ('0' + h)) + ':') + ((h == 0 && m == 0) ? '' : ((m > 9) ? m : ('0' + m)) + ':') + (((s > 9) ? s : ('0' + s)) + '.') + (Math.floor(mm / 100)); 
}


/*
    Funzione per impostare la modalità flag
*/
function setFlag() {
    if(flagEnabled){
        flagEnabled = false;
        document.getElementById('btn-flag').style = 'background-color: lightgray';

    }else{
        flagEnabled = true;
        document.getElementById('btn-flag').style = 'background-color: darkgray; border-top: 0.1rem solid lightgray; border-left: 0.1rem solid lightgray; border-right: 0.1rem solid whitesmoke; border-bottom: 0.1rem solid whitesmoke;';         
        
    }
}


/*
    Funzione invocata al click di una cella
*/
let timeoutNotify = null;
function clickCell(e) {

    if((e.button == 2 || flagEnabled) && !gameStarted)
        return;

    // Il gioco inizia alla prima cella cliccata
    if(!gameStarted){
        if(!restart){
            setMines(this.id);
            connectGame();
        }
        
        if(MODE == 'classica')
            timer = setInterval(incClock, 50);
        else
            timer = setInterval(decClock, 50);
        
        gameStarted = true;
        firstGame = false;

    }

    // Recupero le coordinate della cella
    let cell = this;
    let [r,c] = cell.id.split('-');
    let row = parseInt(r);
    let col = parseInt(c);
    
    // Se la partita è terminata o la cella è già stata cliccata non succede nulla
    if(gameOver || board[row][col].clicked)
        return;
    
    // Se clicco con il tasto destro o il bottone della bandierina è attivo piazzo o tolgo il flag
    if(e.button == 2 || flagEnabled){

        // Se flaggato tolgo, altrimenti se non ne ho già messe troppe inserisco
        if(board[row][col].flagged){

            board[row][col].flagged = false;
            document.getElementById('mine').innerText = ++flagRemained;
            cell.innerText = '';
            
            if(localStorage.getItem('audio') == 'high'){
                unflagAudio.pause();
                unflagAudio.currentTime = 0;
                unflagAudio.play();
            }
        }else if(flagRemained){

            board[row][col].flagged = true;
            document.getElementById('mine').innerText = --flagRemained;
            cell.innerText = flagIcon;

            if(localStorage.getItem('audio') == 'high'){

                flagAudio.pause();
                flagAudio.currentTime = 0;
                flagAudio.play();
            }
        }
        return;
    }

    // Altrimenti, se clicco con il tasto sinistro e la bandierina è fleggata non succede nulla  
    if(e.button == 0 && board[row][col].flagged)
        return;

    // Altrimenti, se la cella è minata ho perso: fermo il timer e termino la partita
    if(board[row][col].mine){
        sconfitta([row, col]);
        return;
    }

    // Altrimenti scopro la cella.
    try{
        if(localStorage.getItem('audio') == 'high'){
            cellClickAudio.pause();
            cellClickAudio.currentTime = 0.4;
            cellClickAudio.play();
        }
        minesNearby(row, col);
    }catch(e){
        document.querySelector('.game-notify').classList.add('notified');

        if(timeoutNotify)
            clearTimeout(timeoutNotify);

        timeoutNotify = setTimeout(() => {
            document.querySelector('.game-notify').classList.remove('notified');
        }, 5000);

    }
}


/*
    Funzione che, al termine della partita, scopre le celle con le mine.
*/
function rivelaMine(win, coords = ''){
    minesFound = 0;
    for (let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLUMNS; j++){
            if(board[i][j].mine){
                let cell = document.getElementById(i + '-' + j);
                
                if(i == coords[0] && j == coords[1])
                    cell.innerText = '☠️';
                else
                    cell.innerText = currentBomb;
                
                if(win || board[i][j].flagged){
                    cell.style.backgroundColor = 'green';
                    minesFound++;
                }else
                    cell.style.backgroundColor = 'red';
            
            }else if(board[i][j].flagged){
                let cell = document.getElementById(i + '-' + j);
                cell.innerText = '❌';
            }
                
        }
    }
}


/*
    Funzione che verifica quante mine sono intorno ad una cella: 
    se 0 si propaga alle celle adiacenti.
*/
function minesNearby(r, c) {

    // Se le coordinate non sono valide o la cella è flaggata non faccio nulla.
    if(r < 0 || r >= ROWS || c < 0 || c >= COLUMNS || board[r][c].flagged || board[r][c].clicked){
        return;
    }

    // Setto la cella su cliccata.
    board[r][c].clicked = true;
    document.getElementById(r + '-' + c).classList.add('clicked');
    cellToBeClicked--;
    document.getElementById('minesLeft').innerText = cellToBeClicked;


    // Cerco il numero di mine che ha attorno
    let minesFound = 0;

    minesFound += checkCella(r-1, c-1); // tl
    minesFound += checkCella(r-1, c);   // tc
    minesFound += checkCella(r-1, c+1); // tr

    minesFound += checkCella(r, c-1);   // cl
    minesFound += checkCella(r, c+1);   // cr

    minesFound += checkCella(r+1, c-1); // bl
    minesFound += checkCella(r+1, c);   // bc
    minesFound += checkCella(r+1, c+1); // br


    // Se ci sono mine attorno indico il numero, altrimenti cerco nelle celle adiacenti
    if(minesFound > 0){
        let cell = document.getElementById(r + '-' + c);
        cell.innerText = minesFound;
        cell.classList.add('x' + minesFound.toString());
    }else{

        minesFound += minesNearby(r-1, c-1);
        minesFound += minesNearby(r-1, c);
        minesFound += minesNearby(r-1, c+1);
    
        minesFound += minesNearby(r, c-1);
        minesFound += minesNearby(r, c+1);
    
        minesFound += minesNearby(r+1, c-1);
        minesFound += minesNearby(r+1, c);
        minesFound += minesNearby(r+1, c+1);
    
    }

    if(!cellToBeClicked){
        vittoria();
    }

}


/*
    Se la cella è valida, verifica se è presente una mina o no.
*/
function checkCella(r, c){

    if(r < 0 || r >= ROWS || c < 0 || c >= COLUMNS)
        return 0;

    if(board[r][c].mine)
        return 1;
    else
        return 0;
    
}

/* FUNZIONE RICHIAMATA SE SI CLICCA SU UNA MINA */
function sconfitta(coords) {

    // Blocca il timer
    clearInterval(timer);

    gameOver = true;

    // Fa vedere dove stanno le mine
    rivelaMine(false, coords);

    victory = false;

    // Apre il menù
    menuOpener(true);

    // Se era una nuova partita segnala l'esito
    if(!restart){
        disconnectGame('Sconfitta');
    }

}

/* FUNZIONE RICHIAMATA SE SI SCOPRONO TUTTE LE CELLE SENZA MINA */
function vittoria() {

    // Blocca il timer e lo evidenzia
    document.getElementById('time').style = 'transform: scale(1.2); color: green';
    clearInterval(timer);

    gameOver = true;
    
    rivelaMine(true);
    
    victory = true;

    // Apre il menù
    menuOpener(true);
    
    // Se era una nuova partita segnala l'esito
    if(!restart){
        disconnectGame('Vittoria');
    }

}


// -------------------------------------------------------------- //
//               FUNZIONI PER IL RIAVVIO DEL GIOCO                //
// -------------------------------------------------------------- //

/* FUNZIONE PER INIZIARE UNA NUOVA PARTITA */
function newGame() {

    if(gameStarted || restart){

        if(!gameOver){

            // Se la partita era iniziata ma non terminata stoppa il timer
            clearInterval(timer);

            // Se la partita era iniziata ma non terminata (e non era una riavviata) segnala la terminazione
            if(!restart){
                disconnectGame();
            }

        }
        
        // Se era iniziata oppure riavviata ne avvia una nuova
        restart = false;
        startGame();
    
    }

    // Chiudo il menù
    menuOpener();
}

/* FUNZIONE PER RIAVVIARE LA STESSA PARTITA */
function restartGame() {

    if(gameStarted){

        if(!gameOver){

            // Se era già inizia ma non ancora terminata stoppa il timer
            clearInterval(timer);
            
            // Se la partita era iniziata ma non terminata (e non era una riavviata) segnala la terminazione
            if(!restart){
                disconnectGame();
            }
            
        }
        
        // Se era iniziata riavvia la stessa
        restart = true;
        startGame();
    }

    // Chiudo il menù
    menuOpener();

}

/* FUNZIONE PER CAMBIARE SETTAGGIO DELLA PARTITA */
function changeGame() {
    location.href = 'newGame.php';
}

/* VARIABILE PER CALCOLARE IL TEMPO DELLA PARTITA */
let resultTime = {
    'h': 0,
    'm': 0,
    's': 0,
    'mm': 0
}

/* FUNZIONE PER IL MENU' DELLA PARTITA */
function menuOpener(auto = false) {

    const result = document.getElementById('result');
    const stats = document.getElementById('stats');
    const info = document.getElementById('info');
    
    // Se la partita è terminata allora visualizza il risultato
    if (gameOver) {
        
        const tempoImpiegato = document.getElementById('tempo-impiegato');
        const mineTrovate = document.getElementById('mine-trovate');
        const celleScoperte = document.getElementById('celle-scoperte');
        
        // Se è classica il tempo è quello indicato nella barra di stato, altrimenti va calcolato
        if(MODE == 'classica'){
            tempoImpiegato.innerText = document.getElementById('time').innerText;
            resultTime['h'] = h;
            resultTime['m'] = m;
            resultTime['s'] = s;
            resultTime['mm'] = mm;
        }else{

            let millesimi = 0;

            if(mm){
                SECONDI--;
                millesimi = 1000;
            }
            millesimi -= mm;
            
            if(SECONDI < s){
                MINUTI--;
                SECONDI += 60;
            }
            let secondi = SECONDI - s;
            
            if(MINUTI < m){
                ORE--;
                MINUTI += 60;
            }
            let minuti = MINUTI - m;

            let ore = ORE - h;

            resultTime['h'] = ore;
            resultTime['m'] = minuti;
            resultTime['s'] = secondi;
            resultTime['mm'] = millesimi;

            tempoImpiegato.innerText = ((ore == 0)? '' : (( ore > 9) ? ore : ('0' + ore)) + ':') + ((ore == 0 && minuti == 0) ? '' : ((minuti > 9) ? minuti : ('0' + minuti)) + ':') + (((secondi > 9) ? secondi : ('0' + secondi)) + '.') + (Math.floor(millesimi / 10)); 

        }

        // Calcolo le celle scoperte
        celleScoperte.innerText = (ROWS * COLUMNS - MINECOUNT - parseInt(document.getElementById('minesLeft').innerText));        
        
        // Calcolo gli obiettivi individuati
        mineTrovate.innerText = minesFound;

        // Se ho vinto ed ho richiamato tramite l'apposita funzione il menù
        if(victory && auto === true){

            // Indico l'esito
            result.innerText = 'Vittoria!';

            // Se è personalizzato non c'è classifica e quindi applico il contenuto predefinito
            if(DIFFICULTY == 'personalizzato'){
                
                info.innerText = 'Congratulazioni! Puoi iniziare una nuova partita con le stesse impostazioni o con altre.';
                        
                if(localStorage.getItem('audio') == 'mute')
                    return;

                victoryAudio.pause();
                victoryAudio.currentTime = 0;
                victoryAudio.play();

            }else{

                // Se non è personalizzato c'è la classifica e vedo dove mi sono piazzato
                fetch("./redirector/gameRedirector.php?" + new URLSearchParams({

                    'action' : 'record', 
    
                    'difficolta' : DIFFICULTY,
    
                    'ore' : resultTime['h'],
                    'minuti' : resultTime['m'],
                    'secondi' : resultTime['s'],
                    'millesimi' : resultTime['mm']
                
                }), {method : 'GET'})
                .then(data => data.json())
                .then(data => {
    
                    if(!data.error){
    
                        data = data['message']['posizione'];
                        
                        // Se sono in top 5 allora lo indico altrimenti applico il contenuto predefinito
                        if(data < 5){
                            info.innerText = 'CONGRATULAZIONI! Hai ottenuto il miglior ' + ((data) ? ((parseInt(data) + 1) + '° ') : '') + 'tempo nella difficoltà ' + DIFFICULTY + '!';
                            
                            if(localStorage.getItem('audio') == 'mute')
                                return;
    
                            recordAudio.pause();
                            recordAudio.currentTime = 0;
                            recordAudio.play();
    
                        }else{
                            info.innerText = 'Congratulazioni! Puoi iniziare una nuova partita con le stesse impostazioni o con altre.';
                            
                            if(localStorage.getItem('audio') == 'mute')
                                return;
    
                            victoryAudio.pause();
                            victoryAudio.currentTime = 0;
                            victoryAudio.play();
                        }
    
                    }else{
                        // Se c'è stato un'errore applico il contenuto predefinito
                        info.innerText = 'Congratulazioni! Puoi iniziare una nuova partita con le stesse impostazioni o con altre.';
                        
                        if(localStorage.getItem('audio') == 'mute')
                            return;

                        victoryAudio.pause();
                        victoryAudio.currentTime = 0;
                        victoryAudio.play();
                    }
    
                })
            }

        }else if(auto === true){
            // Se ho perso ed ho richiamato tramite l'apposita funzione il menù imposto l'esito
            result.innerText = 'Sconfitta!';
            info.innerText = 'Peccato! Se vuoi, puoi riprovare la stessa partita, ma attenzione: in tal caso potresti perdere anche al primo tentativo.';
        
            if(localStorage.getItem('audio') == 'mute')
                return;

            defeatAudio.pause();
            defeatAudio.currentTime = 0;
            defeatAudio.play();
        }
        
        stats.style = '';
    
    }else{
        // Se la partita non è ancora terminata imposto il relativo contenuto
        stats.style = 'transform: scale(0)';
        result.innerText = 'Non è ancora finita!';
        info.innerText = 'Continua la partita, riparti dall\'inizio o cominciane una nuova.\nAttenzione! Se riavvi la partita, le mine si troveranno nella stessa posizione, quindi è possibile perdere anche al primo click.\nSempre da qui, puoi tornare alla schermata precedente per cambiare impostazioni.';
    }

    // Se era chiuso apro il menù e viceversa
    if(document.getElementById('game-menu-box').className == 'window'){
        setTimeout(() => document.getElementById('game-menu-box').classList.remove('window'), 500);
        document.getElementById('game-menu').classList.remove('window');
    }
    else{
        document.getElementById('game-menu-box').classList.add('window');
        document.getElementById('game-menu').classList.add('window');
    }

}


// -------------------------------------------------------- //
//               FUNZIONI PER LO ZOOM IN/OUT                //
// -------------------------------------------------------- //

// Parametri zoom
let zoom = 0;
const MAXZOOM = 4;
const MINZOOM = -7;

function zoomF(){
    
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    
    zoomIn.addEventListener('click', () => {
        if(zoom == MAXZOOM)
            return;

        if(zoom == MAXZOOM - 1)
            zoomIn.style = 'opacity: 0.6';
        zoomOut.style = '';

        zoom++;
    
        document.getElementById('board').style = 'transform: scale(' + (1 + 0.1 * zoom) + ')';
    });
    
    zoomOut.addEventListener('click', () => {
        if(zoom == MINZOOM)
            return;
        
        if(zoom == MINZOOM + 1)
            zoomOut.style = 'opacity: 0.6';
        zoomIn.style = '';

        zoom--;
    
        document.getElementById('board').style = 'transform: scale(' + (1 + 0.1 * zoom) + ')';
    });

}


// ------------------------------------------------------------------ //
//               SINCRONIZZAZIONE PARTITA CON DATABASE                //
// ------------------------------------------------------------------ //
// 
// Quando una nunova partita comincia, viene creato un nuovo record con
// info generali su di essa e stato preimpostato su 'Abbandonata'.
// A fine partita si riconnette alla partita iniziata inserendo l'esito
// e i dettagli. In questo modo si riesce a gestire anche un'interruzione
// inattesa della partita in corso.
// 
// Sono utilizzati username e istante di inizio partita per individuarla
// univocamente.
//

let date;

/* FUNZIONE PER CREARE UNA NUOVA PARTITA NEL DATABASE */
function connectGame(){

    // Creo data nel formato desiderato
    date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Fetch per salvare i settaggi della partita (lo stato è salvato per default come 'Abbandonata')
    fetch("./redirector/gameRedirector.php?" + new URLSearchParams({

        'action' : 'start', 

        'date' : date,
        'difficulty' : DIFFICULTY,
        'mode' : MODE,
        'rows' : ROWS,
        'columns' : COLUMNS,
        'mines' : MINECOUNT
    
    }), {method : 'GET'})
    .then(data => data.json())
    .then(data => {

        if(data.error){
            // console.info(data.error);
        }

    })

}

/* FUNZIONE PER INSERIRE IL RISULTATO DELLA PARTITA E I DETTAGLI */
function disconnectGame(status = 'Abbandonata'){

    // Si alcola il tempo impoegato a terminare la partita e altre info
    let tempo = {
        'ore': 0,
        'minuti': 0,
        'secondi': 0,
        'millesimi': 0
    };
    let campiScoperti = 0;
    let obiettiviTrovati = 0;

    if(status != 'Abbandonata'){
        campiScoperti = document.getElementById('celle-scoperte').innerText;
        obiettiviTrovati = document.getElementById('mine-trovate').innerText;
        tempo['ore'] = resultTime['h'];
        tempo['minuti'] = resultTime['m'];
        tempo['secondi'] = resultTime['s'];
        tempo['millesimi'] = resultTime['mm'];
    }

    // Creazione dati da inviare come esito della partita
    let info = new FormData();
    info.append('action', 'stop');
    info.append('date', date);
    info.append('result', status);
    info.append('ore', tempo['ore']);
    info.append('minuti', tempo['minuti']);
    info.append('secondi', tempo['secondi']);
    info.append('millesimi', tempo['millesimi']);
    info.append('campiScoperti', campiScoperti);
    info.append('obiettiviTrovati', obiettiviTrovati);

    // Fetch con cui inviare i dati
    fetch("./redirector/gameRedirector.php", {
        method: 'POST',
        body: info
    })
    .then(data => data.json())
    .then(data => {

        if(data.error){
            // console.info(data.error);
        }

    })

}