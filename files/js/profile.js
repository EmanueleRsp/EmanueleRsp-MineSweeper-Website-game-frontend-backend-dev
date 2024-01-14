// -------------------------------------------- //
//               GESTIONE LOGOUT                //
// -------------------------------------------- //

/* FUNZIONE PER IL LOGOUT */
let logout = () => {
    
    let data = new FormData();
    data.append('action', 'logout');

    // Fetch per eliminare i dati di sessione, rimanda poi alla home
    fetch("./redirector/authRedirector.php", {
        method: 'POST',
        body: data
    })
    .then(() => document.location.href = './');
} 

/* AGGIUNTA LISTENER AL PULSATE DI LOGOUT */
document.querySelector('.disconnection').addEventListener('click', logout);


/* FUNZIONE DI SUPPORTO PER LE TABELLE */
function destroyTable(target){
    document.querySelectorAll('#' + target + ' .table-row').forEach(elem => elem.remove());
}


// ------------------------------------------------------- //
//               GESTIONE DELLE STATISTICHE                //
// ------------------------------------------------------- //

/* FUNZIONE CHE AGGIUNGE UNA RIGA ALLA TABELLA DELLE STATISTICHE DETTAGLIATE */
function addStatsRow(row){
    
    // Nomi dei campi da popolare
    const fields = ['Difficoltà', 'Partite giocate', 'Percentuale vittorie', 'Campi scoperti', 'Obiettivi trovati'];

    // Nuova riga
    let li = document.createElement('li');
    li.className = 'table-row';

    // Per ciascun elemento della riga...
    fields.forEach((elem, index) => {
        
        // ...viene creata l'apposita cella
        let field = document.createElement('div');
        field.className = 'col col-' + (index + 1);
        field.setAttribute('data-label', elem);

        // Formatto la percentuale
        if(index == 2){
            if(isNaN(row[index]))
                field.innerText = '--%';
            else
                field.innerText = row[index] + '%';

        }else{
            field.innerText = row[index];
        }

        // La cella è aggiunta alla riga
        li.append(field);

    });

    // La riga è aggiunta alla tabella
    document.getElementById('table-stats').append(li);

}


/* FUNZIONE PER INIZIALIZZARE LE STATISTICHE GENERALI */
function stats(){
    
    // Recupero i dati
    fetch("./redirector/profileRedirector.php?" + new URLSearchParams({
        'action' : 'stats'
    }), {method : 'GET'})
    .then(data => data.json())
    .then(data => {
        
        // Se non ci sono errori inserisco i dati
        if(!data.error){

            data = data['message'];
            document.querySelector('.number.partite-fatte').innerText = data['partiteGiocate'];
            if(data['partiteGiocate'] != 0){
                document.querySelector('.number.percentuale-vittorie').innerText = Math.floor(data['partiteVinte'] / data['partiteGiocate'] * 100) + '%';
            }
            document.querySelector('.number.campi-scoperti').innerText = data['campiScoperti'];
            document.querySelector('.number.obiettivi-scoperti').innerText = data['obiettiviTrovati'];

        }else{
            // console.info(data.error);
        }

    })


}

/* FUNZIONE PER INIZIALIZZARE LA TABELLA DELLE STATISTICHE DETTAGLIATE */
function detailedStats(){
    
    // Fetch per recuperare i dati
    fetch("./redirector/profileRedirector.php?" + new URLSearchParams({
        'action' : 'detailedStats'
    }), {method : 'GET'})
    .then(data => data.json())
    .then(data => {
        
        // Se non ci sono errori popolo la tabella
        if(!data.error){
    
            // Elimino le righe di default
            destroyTable('table-stats');

            // Per ogni difficoltà preparo i dati e aggiungo la relativa riga
            data = data['message'];
            data.forEach(elem => {

                let row = [
                    elem['difficolta'].charAt(0).toUpperCase() + elem['difficolta'].slice(1),
                    elem['partiteGiocate'],
                    Math.floor((elem['partiteVinte'] / elem['partiteGiocate']) * 100),
                    elem['campiScoperti'],
                    elem['obiettiviTrovati']
                ];

                addStatsRow(row);
            });

        }else{
            // console.info(data.error);
        }

    })

}


// ----------------------------------------------------------- //
//               GESTIONE TABELLA DELLE PARTITE                //
// ----------------------------------------------------------- //

/* FUNZIONE CHE AGGIUNGE UNA RIGA ALLA TABELLA DELLE PARTITE */
function addGameRow(row){
    
    // Nomi dei campi da popolare
    const colFields = ['Data', 'Modalità', 'Difficoltà', 'Risultato', 'Tempo'];
    const moreFields = ['params', 'campiScoperti', 'obiettiviTrovati'];
    const moreTexts = ['Parametri: ', 'Campi scoperti: ', 'Obiettivi trovati: '];

    // Nuova riga
    let li = document.createElement('li');
    li.className = 'table-row';
    
    // Contenuto principale: popolo con i relativi dati
    let coldiv = document.createElement('div');
    coldiv.className = 'col-content';
    colFields.forEach((elem, index) => {
        
        let field = document.createElement('div');
        
        field.className = 'col col-' + (index + 1);
        field.setAttribute('data-label', elem);
        field.innerHTML = row[index];

        coldiv.append(field);

    });
    li.append(coldiv);

    // Separo le parti tramite uno span
    li.append(document.createElement('span'));

    // Contenuto addiuntivo: popolo con i relativi dati
    let morediv = document.createElement('div');
    morediv.className = 'more-content';
    moreFields.forEach((elem, index) => {
        
        let field = document.createElement('div');
        
        field.innerText = moreTexts[index];

        let span = document.createElement('span');
        span.setAttribute('data-label', elem);
        span.innerText = row[(5 + index)];
        field.append(span);

        morediv.append(field);

    });
    li.append(morediv);

    // Aggiungo la riga creata 
    document.getElementById('table-games').append(li);

}

/* FUNZIONE PER FORMATTARE IL TEMPO */
function normTime(h, m, s, mm){
    return ((h == 0)? '' : (( h > 9) ? h : ('0' + h)) + ':') + ((h == 0 && m == 0) ? '' : ((m > 9) ? m : ('0' + m)) + ':') + (((s > 9) ? s : ('0' + s)) + '.') + (Math.floor(mm / 100)); 
}

/* VARIABILI DI SUPPORTO PER LA VISUALIZZAZIONE DINAMICA DELLE ULTIME PARTITE */
let page = 0;
const pageDims = [3, 5, 10, 20];
let pageIndex = 0;
let pageDim = pageDims[pageIndex];
function lastGames(){
    
    // Prelevo i dati dal database tramite fetch.
    // La fecth mi ritorna un dato in più, se presente, in modo da capire se ne posso richiedere altri o meno 
    fetch("./redirector/profileRedirector.php?" + new URLSearchParams({
        'action' : 'lastGames', 'page' : page, 'dimension' : pageDim
    }), {method : 'GET'})
    .then(data => data.json())
    .then(dataAll => {
        
        // Se non ci sono stati errori nel recupero dei dati procedo al popolamento
        if(!dataAll.error){
    
            // Elimino gli elementi visualizzati precedentemente
            destroyTable('table-games');

            data = dataAll['message'][0];

            // Per ciascuna partita trovata...
            data.forEach((elem, index) => {

                // Se inseriti già 'pageDim' elementi mi fermo
                if(index == pageDim)
                    return;
                
                // Formatto i dati nel modo desiderato
                let row = [
                    elem['data'].substring(0,10).replaceAll('-', '/'),  
                    elem['modalita'].charAt(0).toUpperCase() + elem['modalita'].slice(1),
                    elem['difficolta'].charAt(0).toUpperCase() + elem['difficolta'].slice(1),
                    elem['risultato'], 
                    normTime(elem['ore'], elem['minuti'], elem['secondi'], elem['millesimi']),
                    elem['rows'] + 'R x ' + elem['columns'] + 'C (' + elem['mine'] + ' mine)',
                    elem['campiScoperti'], 
                    elem['obiettiviTrovati']
                ];
                
                // Li aggiungo alla tabella
                addGameRow(row);
            });

            // Se le partite recuperate non erano più di quelle visualizzabili in una pagina 
            // allora non ce ne sono altre da recuperare e disabilito il pulsante per richiedere le successive 
            if(dataAll['message'][1] <= pageDim){
                document.getElementById('next').disabled = true;
                document.getElementById('next').style = 'opacity: .5';
                document.getElementById('page').innerText = (pageDim * page + 1) + '-' + (pageDim * page + dataAll['message'][1]);
            }else{
                document.getElementById('next').disabled = false;
                document.getElementById('next').style = '';
                document.getElementById('page').innerText = (pageDim * page + 1) + '-' + (pageDim * (page + 1));
            }


        }else{
            // console.info(dataAll.error);
            
            // Se c'è stato un errore o non sono presenti partite disabilito lo scorrimento delle pagine della tabella
            document.getElementById('next').disabled = true;
            document.getElementById('next').style = 'opacity: .5';
            document.getElementById('page').disabled = true;
            document.getElementById('page').style = 'opacity: .5';
        }

    })

    
}

/* FUNZIONE PER LA GESTIONE DELLE PAGINE DELLA TABELLA DELLE PARTITE */
let pageNavigator = (e) => {

    // Recupero il pulsante cliccato
    let tg = e.target.className;
    if(e.target.id != 'page'){
        tg.replaceAll(' md hydrated', '');
    }

    // Modifico le variabili sul numero e dimensione di pagina corrente a seconda del pulsante cliccato
    switch(tg){
        case 'prev':
                page--;
            break;
        case 'next':
                page++;
            break;
        case 'page':
                pageIndex = (++pageIndex) % pageDims.length; 
                pageDim = pageDims[pageIndex];
                page = 0;
            break;
    }

    // Disabilito/abilito il pulsante per la pagina precedente a seconda della pagina in cui sono
    if(!page){
        document.getElementById('prev').disabled = true;
        document.getElementById('prev').style = 'opacity: .5';
    }else{
        document.getElementById('prev').disabled = false;
        document.getElementById('prev').style = '';
    }

    // Aggiorno la tabella
    lastGames();
}


// ---------------------------------------------------- //
//               INIZIALIZZAZIONE PAGINA                //
// ---------------------------------------------------- //

function init(){

    // Aggiungo listeners ai pulsanti per visualizzare la tabella in modo dinamico
    document.querySelectorAll('.table-scroll-btn button').forEach(elem => {
        elem.addEventListener('click', pageNavigator);
    });

    // Disabilito inizialmente il pulsante 'prev'
    document.getElementById('prev').disabled = true;
    document.getElementById('prev').style = 'opacity: .5';

    // Inizializzo le statistiche principali
    stats();
    
    // Inizializzo le statistiche dettagliate
    detailedStats();
    
    // Inizializzo la tabella delle ultime partite
    lastGames();
}

init();