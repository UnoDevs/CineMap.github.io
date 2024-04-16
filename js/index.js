var listaDeFilmes = new Array(
    {banner: "banner_1full.jpg",nome: "Planeta dos Macacos: O Reinado",id: 0},
    {banner: "banner_2full.jpg",nome: "Oppenheimer",id: 1},
    {banner: "banner_3full.jpg",nome: "Pica-Pau: O Filme",id: 2},
    {banner: "banner_4full.jpg",nome: "Parasita",id: 3},
    {banner: "banner_5full.jpg",nome: "Five Nights at Freddy's",id: 4},
    {banner: "banner_6full.jpg",nome: "Django: Livre", id: 5}
)
var listaDeIngressos = [];

var isEditing = false;
var haveTicketHead = false;
var editingIndex = -1;

function initcatalog(){

    let movie_cont = document.getElementById("catalog-cont");

    listaDeFilmes.forEach(mov => {
        let movie_box = document.createElement('article');
        movie_box.innerHTML = `
            <div onclick="addmaketicket(${mov.id})" class="movie-box">
                <img class="movie-img" src="resources/banners/${mov.banner}">
                <div class="movie-text-container">
                    <span class="rubik-400 movie-text-name">${mov.nome}</span>
                </div>
            </div>
            `;
        movie_cont.append(movie_box);    
    })
}

function addmaketicket(index){
    let ticket_cont = document.getElementById("edit-cont");
    let sel_movie = listaDeFilmes[index];

    ticket_cont.innerHTML = `
    <div class="add-ticket-container">
        <img style="margin-right: 16px;" class="movie-img" src="resources/banners/${sel_movie.banner}">
        <div class="ticket-info">
            <h1 class="rubik-400">${sel_movie.nome}</h1>
            <h2 class="rubik-400 info-subtitle">Dia do Filme:</h2>
            <input id="ticket-date" type="date" class="input-default-style">
            <h2 class="rubik-400 info-subtitle">Poltrona:</h2>
            <input id="ticket-seat" type="text" placeholder="A2,G4..." class="input-default-style">
            <h2 class="rubik-400 info-subtitle">Tudo Pronto?</h2>
            <button onclick="addticket(${sel_movie.id})" type="button" class="info-seat-button">Registrar Ingresso!</button>
        </div>
    </div>
    `;

    ticket_cont.scrollIntoView({behavior: "smooth"});
}

function addticket(index){
    let tkdate = document.getElementById("ticket-date");
    let tkseat = document.getElementById("ticket-seat");

    if(!!tkdate.value && !!tkseat.value){
        if(!isEditing){
        listaDeIngressos.push({
            movieId: index, ticketDt: tkdate.value, ticketSeat: tkseat.value
        });
        } else {
            listaDeIngressos[editingIndex] = {movieId: index, ticketDt: tkdate.value, ticketSeat: tkseat.value}
            isEditing = false;
            editingIndex = -1;
        } 

        if(!haveTicketHead){
            addtickethead();
            haveTicketHead = true;
        }

        updatetable();
        removemaketicket();
    }
}

function updatetable(){
    let tickets = document.getElementById("tickets");
    tickets.innerHTML = ``;
    let row;

    listaDeIngressos.forEach((ticket, ind) => {
        row = document.createElement('tr');
        row.innerHTML =
        `
        <td><img class="movie-img-mini" src="resources/banners/${listaDeFilmes[ticket.movieId].banner}"></td>
        <td>${ticket.ticketDt}</td>
        <td>${ticket.ticketSeat}</td>
        <td>
            <button onclick="editticket(${ind})" type="button" class="material-symbols-outlined custom-icon-table">edit</button>
            <button onclick="removeticket(${ind})"type="button" class="material-symbols-outlined custom-icon-table">delete</button>
        </td>  
        `;
        tickets.append(row);
    })
    if(row){
        row.scrollIntoView({behavior: "smooth"});
    }
}

function editticket(index){
    isEditing = true;
    editingIndex = index;
    
    addmaketicket(listaDeIngressos[index].movieId);
    
    document.getElementById("ticket-date").value = listaDeIngressos[index].ticketDt;
    document.getElementById("ticket-seat").value = listaDeIngressos[index].ticketSeat;
}

function removeticket(index){
    listaDeIngressos.splice(index,1);
    updatetable();
    if(listaDeIngressos.length == 0){
        removetickethead();
        haveTicketHead = false;
    }
}

function removemaketicket(){
    let ticket_cont = document.getElementById("edit-cont");
    ticket_cont.innerHTML = ``
}

function buttonfinal(){
    if(confirm(`Tem certeza que deseja finalizar pedido?`)){
        if(listaDeIngressos.length >= 1){
        removeall();
        } else {
            confirm(`Você ainda não possui ingressos!`)
        }
    }
}

function addtickethead(){
    let table_container = document.getElementById("tickets-container");
    table_container.innerHTML = `
    <table class="rubik-400 table-ticket-container">
        <thead id="tickets-head" class="table-header-text">
            <!--Automatizado Script [CABEÇALHO INGRESSO]-->
        </thead>
        <tbody id="tickets">
            <!--Automatizado Script [INGRESSO CONFIRMADO]-->
        </tbody>
    </table>  
    <h1 class="rubik-400 final-confirm-text">Finalizar Pedido?</h1> 
    <button onclick="buttonfinal()" class="info-seat-button">PARTIU CINEMA!</button>
    `;

    let table_head = document.getElementById("tickets-head");
    table_head.innerHTML = `
    <td>FILME</td>
    <td>DIA</td>
    <td>POLTRONA</td>
    <td>AÇÕES</td>
    `;
}

function removetickethead(){
    let table_container = document.getElementById("tickets-container");
    haveTicketHead = false;
    table_container.innerHTML = ``;
}

function removeall(){
    listaDeIngressos = [];
    updatetable();
    removetickethead();
}