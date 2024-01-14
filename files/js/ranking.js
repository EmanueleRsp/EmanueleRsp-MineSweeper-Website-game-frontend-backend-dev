/* FUNZIONE CHE INIZIALIZZA UN PODIO RELATIVAMENTE AD UN ATTRIBUTO SPECIFICATO (key)*/
function initRanking(key) {

    // Fetch per il recupero dei dati
    fetch("./redirector/rankRedirector.php?" + new URLSearchParams({
        'action' : 'podium' , 'type' : key
    }), {method : 'GET'})
    .then(data => data.json())
    .then(data => {

        // Se non ci sono errori viene indicato il podio
        if(!data.error){
            data = data['message'];
            data.forEach((elem, index) => {
                document.querySelector('#' + key + '-num-' + (index + 1)).innerHTML = elem['totale'];
                document.querySelector('#' + key + '-usr-' + (index + 1)).innerHTML = elem['user'];
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
function addTableRow(row){
    
    // Nomi dei campi da popolare
    const fields = ['Posizione', 'Utente', 'Modalità', 'Tempo', 'Data'];

    // Nuova riga
    let li = document.createElement('li');
    li.className = 'table-row';

    // Per ciascun elemento della riga...
    fields.forEach((elem, index) => {
        
        // ...viene creata l'apposita cella
        let field = document.createElement('div');
        field.className = 'col col-' + (index + 1);
        field.setAttribute('data-label', elem);

        // I primi 3 della classifica vengono evidenziati
        if(!index){
            switch(row[index]){
                case 1:
                    field.innerHTML = '🥇';
                    break;
                case 2:
                    field.innerHTML = '🥈';
                    break;
                case 3:
                    field.innerHTML = '🥉';
                    break;
                default:
                    field.innerHTML = row[index]; 
            }
        }else{
            field.innerHTML = row[index];
        }

        // La cella è aggiunta alla riga
        li.append(field);

    });

    // La riga è aggiunta alla tabella
    document.getElementById('table-games').append(li);

}

/* FUNZIONE PER ELIMINARE LE RIGHE DELLA TABELLA */
function destroyTable(){
    document.querySelectorAll('.table-row').forEach(elem => elem.remove());
}

/* FUNZIONE PER FORMATTARE IL TEMPO */
function normTime(h, m, s, mm){
    return ((h == 0)? '' : (( h > 9) ? h : ('0' + h)) + ':') + ((h == 0 && m == 0) ? '' : ((m > 9) ? m : ('0' + m)) + ':') + (((s > 9) ? s : ('0' + s)) + '.') + (Math.floor(mm / 100)); 
}

/* VARIABILI DI SUPPORTO PER LA VISUALIZZAZIONE DINAMICA DELLA TABELLA */
let page = 0;
const pageDims = [3, 5, 10, 20];
let pageIndex = 0;
let pageDim = pageDims[pageIndex];

/* FUNZIONE PER AGGIORNARE LA PAGINA DELLA TABELLA DA VISUALIZZARE */
function refreshTable(){
    
    // Rilevo per quale modalità visualizzare le partite
    let target = document.querySelector('input[type="radio"]:checked').id;

    // Prelevo i dati dal database tramite fetch.
    // La fecth mi ritorna un dato in più, se presente, in modo da capire se ne posso richiedere altri o meno 
    fetch("./redirector/rankRedirector.php?" + new URLSearchParams({
        'action' : 'table' , 'difficulty' : target, 'page' : page, 'dimension' : pageDim
    }), {method : 'GET'})
    .then(data => data.json())
    .then(dataAll => {
        
        // Elimino gli elementi visualizzati precedentemente
        destroyTable();

        // Se non ci sono stati errori nel recupero dei dati procedo al popolamento
        if(!dataAll.error){

            data = dataAll['message'][0];

            // Per ciascuna partita trovata...
            data.forEach((elem, index) => {
                
                // Se inseriti già 'pageDim' elementi mi fermo
                if(index == pageDim)
                    return;

                // Formatto i dati nel modo desiderato
                let row = [
                    (index + 1 + pageDim * page), 
                    elem['utente'], 
                    elem['modalita'].charAt(0).toUpperCase() + elem['modalita'].slice(1), 
                    normTime(elem['ore'], elem['minuti'], elem['secondi'], elem['millesimi']), 
                    elem['data'].substring(0,10).replaceAll('-', '/')
                ];
                
                // Li aggiungo alla tabella
                addTableRow(row);
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

            // Se c'è stato un errore o non sono presenti partite inserisco un elemento di default
            // e disabilito lo scorrimento delle pagine della tabella
            let row = ['--', '--', '--', '--', '--'];
            addTableRow(row);
            document.getElementById('next').disabled = true;
            document.getElementById('next').style = 'opacity: .5';
            document.getElementById('page').disabled = true;
            document.getElementById('page').style = 'opacity: .5';
        }

    })
}

/* FUNZIONE PER LA GESTIONE DELLE PAGINE DELLA TABELLA */
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
    refreshTable();
}

/* FUNZIONE CHE RESETTA LA TABELLA QUANDO VIENE CAMBIATA LA MODALITA' PER CUI VISUALIZZARE LE PARTITE */
let resetTable = () => {

    // Resetto di dati per la visualizzazione della pagina (riparto dalla prima pagina)
    page = 0;
    pageIndex = 1;

    // Resetto gli indici visualizzati
    document.getElementById('page').innerText = (pageDim * page + 1) + '-' + (pageDim * (page + 1));
    document.getElementById('page').disabled = false;
    document.getElementById('page').style = '';

    // Disabilito il pulsante per la pagina precedente
    document.getElementById('prev').disabled = true;
    document.getElementById('prev').style = 'opacity: .5';

    // Aggiorno la tabella
    refreshTable();
}


// ---------------------------------------------------- //
//               INIZIALIZZAZIONE PAGINA                //
// ---------------------------------------------------- //

function init() {

    // Aggiungo listeners ai pulsanti per visualizzare la tabella in modo dinamico
    document.querySelectorAll('.table-scroll-btn button').forEach(elem => {
        elem.addEventListener('click', pageNavigator);
    });

    // Disabilito inizialmente il pulsante 'prev'
    document.getElementById('prev').disabled = true;
    document.getElementById('prev').style = 'opacity: .5';

    // Inizializzo tutti i podi
    document.querySelectorAll('.podium').forEach(elem => initRanking(elem.className.replaceAll('podium ', '')));

    // Inizializzo la tabella delle migliori partite
    refreshTable();

    // Aggiungo listener per cambiare modalità per cui visualizzo le migliori partite
    document.querySelectorAll('.storico input[type="radio"]').forEach(elem => elem.addEventListener('click', resetTable));
}

init();