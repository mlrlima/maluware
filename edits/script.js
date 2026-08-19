const edits = [
    /*
    {
        imagem: "db/ano/nome.png",
        titulo: "",
        tags: [],

        ano: 0,
        mes: 0,
        dia: 0,
    },
    */

/* 
DEC 2025 
*/
    
    {
        imagem: "db/2025/lay-still-restless.jpg",
        titulo: "Lay still, restless",
        tags: ["song: My Ordinary Life - The Living Tombstone"],

        ano: 2025,
        mes: 12,
        dia: 5,
    },

/* 
NOV 2025 
*/

    {
        imagem: "db/2025/primeiro_hamster.png",
        titulo: "Primeiro feito no Affinity",
        tags: [],

        ano: 2025,
        mes: 11,
        dia: 16,
    },

/* 
APR 2019
*/

    {
        imagem: "db/2019/theme-bright-ariana.png",
        titulo: "",
        tags: ["Ariana Grande", 
            "song: One Last Time - Ariana Grande"],

        ano: 2019,
        mes: 4,
        dia: 23,
    },

    {
        imagem: "db/2019/when-you-left-i-felt-like-dying.png",
        titulo: "when you left I felt like dying",
        tags: [],

        ano: 2019,
        mes: 4,
        dia: 11,
    },

/*
AUG 2018
*/

    {
        imagem: "db/2018/complex-white-ariana.png",
        titulo: "",
        tags: ["Ariana Grande", 
            "song: sweetener - Ariana Grande",
            "complex"
        ],

        ano: 2018,
        mes: 8,
        dia: 22,
    },
];

/* =====================================
   Script
===================================== */

const EDITS_PER_PAGE = 12;
let paginaAtual = 1;
let anoSelecionado = "todos";
let buscaAtual = "";

const galeria = document.querySelector(".colagens");
const seletorAno = document.querySelector("#ano");
const campoBusca = document.querySelector("#busca");
const botaoAnterior = document.querySelector("#anterior");
const botaoProximo = document.querySelector("#proximo");
const paginaTexto = document.querySelector("#pagina-atual");


function criarAnos() {

    const anos = [
        ...new Set(
            edits.map(edit => edit.ano)
        )
    ];

    anos.sort((a, b) => b - a);

    anos.forEach(ano => {
        const option = document.createElement("option");
        option.value = ano;
        option.textContent = ano;
        seletorAno.appendChild(option);
    });

}
criarAnos();


function obterEditsFiltrados() {

    return edits.filter(edit => {

        /* Ano */
        const correspondeAno =
            anoSelecionado === "todos" ||
            edit.ano === Number(anoSelecionado);


        /* Pesquisa */
        const texto = buscaAtual
            .toLowerCase()
            .trim();

        if (texto === "") {
            return correspondeAno;
        }

        const titulo= edit.titulo.toLowerCase();

        const tags=edit.tags.join(" ").toLowerCase();

        const correspondeBusca =
            titulo.includes(texto) ||
            tags.includes(texto);


        return correspondeAno && correspondeBusca;

    });
}

function mostrarGaleria() {

    const filtrados = obterEditsFiltrados();

    const totalPaginas =Math.ceil(
            filtrados.length / EDITS_PER_PAGE
            );


    /*
    If current page doesn't exist
    */
    if(paginaAtual > totalPaginas &&
    totalPaginas > 0){
        paginaAtual = totalPaginas;
    }

    /*
    If there are no results
    */
    if(filtrados.length === 0){
        galeria.innerHTML = `
            <p class="sem-resultados">
                Nenhuma colagem encontrada.
            </p>
        `;

        paginaTexto.textContent = "0";
        botaoAnterior.disabled = true;
        botaoProximo.disabled = true;
        
        return;
    }

    /*
    Get only the artworks
    for this page
    */

    const inicio=(paginaAtual - 1)* EDITS_PER_PAGE;
    const fim=inicio + EDITS_PER_PAGE;

    const editsDaPagina =filtrados.slice(inicio, fim);
    
    /* Clear gallery */
    galeria.innerHTML = "";

    /*Create cards*/
    editsDaPagina.forEach(edit => {
        const card = document.createElement("article");
        card.classList.add("colagem");

        /*Tags*/
        const tags =
            edit.tags.length > 0
                ? edit.tags.join(" • ")
                : "Sem tags";


        card.innerHTML = `
            <img
                src="${edit.imagem}"
                alt="${edit.titulo}"
                loading="lazy"
            >
        `;


        galeria.appendChild(card);
    });

    /*Pagination*/

    paginaTexto.textContent=`${paginaAtual} / ${totalPaginas}`;

    botaoAnterior.disabled = paginaAtual === 1;

    botaoProximo.disabled = paginaAtual === totalPaginas;

}

/* =====================================
   YEAR CHANGE
===================================== */
seletorAno.addEventListener(
    "change",
    () => {
        anoSelecionado =seletorAno.value;
        paginaAtual = 1;
        mostrarGaleria();
    }
);



/* =====================================
   SEARCH
===================================== */

campoBusca.addEventListener(
    "input",
    () => {
        buscaAtual =campoBusca.value;
        paginaAtual = 1;
        mostrarGaleria();
    }
);

/* =====================================
   PREVIOUS PAGE
===================================== */
botaoAnterior.addEventListener(
    "click",
    () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            mostrarGaleria();
        }
    }
);
/* =====================================
   NEXT PAGE
===================================== */
botaoProximo.addEventListener(
    "click",
    () => {
        const filtrados =obterEditsFiltrados();

        const totalPaginas =Math.ceil(
                filtrados.length / EDITS_PER_PAGE
                );

        if(paginaAtual < totalPaginas){
            paginaAtual++;
            mostrarGaleria();
        }
    }
);

mostrarGaleria();