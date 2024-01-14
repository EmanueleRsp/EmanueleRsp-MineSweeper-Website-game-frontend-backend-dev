// --------------------------------------------- //
//               GESTIONE SLIDERS                //
// --------------------------------------------- //

/* PRIMO SLIDER */
const slides1 = document.querySelectorAll('.slide1');
const btns1 = document.querySelectorAll('.btn1');

// Funzione per mettere il risalto la slide relativa al bottone premuto
var manualNav1 = function(manual){
    slides1.forEach((slide) => {
        slide.classList.remove('risalto');
    });

    btns1.forEach((btn) => {
        btn.classList.remove('risalto');
    });

    slides1[manual].classList.add('risalto');
    btns1[manual].classList.add('risalto');
}

// Listener al click del bottone
btns1.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        manualNav1(i);
    })
})

/* SECONDO SLIDER */
const slides2 = document.querySelectorAll('.slide2');
const btns2 = document.querySelectorAll('.btn2');

// Funzione per mettere il risalto la slide relativa al bottone premuto
var manualNav2 = function(manual){
    slides2.forEach((slide) => {
        slide.classList.remove('risalto');
    });

    btns2.forEach((btn) => {
        btn.classList.remove('risalto');
    });

    slides2[manual].classList.add('risalto');
    btns2[manual].classList.add('risalto');
}

// Listener al click del bottone
btns2.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        manualNav2(i);
    })
})


// ----------------------------------------------- //
//               GESTIONE MOVIMENTO                //
// ----------------------------------------------- //

// Seleziono gli elementi che devono scorrere
const pages = document.querySelectorAll('.scroll');

// Allo scroll della pagina...
window.addEventListener('scroll', () => {
    
    // Altezza della finestra
    const triggerBottom = window.innerHeight;

    // ...per ciascun elemento che deve scorrere...
    pages.forEach((page) => {

        // Distanza dell'elemento dal bordo superiore della finestra
        const topPage = page.getBoundingClientRect().top;
        
        // ...controllo se entra in visualizzazione
        if(topPage < triggerBottom){
            page.classList.add('show');
        }else{
            page.classList.remove('show');
        }
    })
})