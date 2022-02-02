const serveur = 'https://musicstoreapi.herokuapp.com';


window.onload = load();

function load() {
    fetch(serveur + "/artistes")
    .then(rep => {
        return rep.json();
    })
    .then(resJSON => {
        for(let artiste of resJSON) {
            let x = document.createElement("option");
            x.innerHTML = artiste.nom;
            document.getElementById("artistes").appendChild(x);
        }
    })
    .then(getAllAlbum);
}


function getAllAlbum() {

    fetch(serveur + "/albums")
    .then(rep => {
        return rep.json();
    })
    .then(resJSON => {
        for(let album of resJSON) {
            
            
        
            let div = document.createElement("div");
            div.classList.add("column");
            div.classList.add("is-3");
            let element = `
                <div class="card large">
                    <div class="card-image">
                        <figure class="image is-square">
                            <img src="${album.cover}" alt="${album.titre}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding">${album.titre}</p>
                                <p class="subtitle is-6">${album.artiste.nom}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            div.innerHTML = element;
            let albums = document.getElementById("albums");
            albums.appendChild(div);
}
})
}


function filtrer() {
    let titre = document.getElementById("titre").value;
    let artiste = document.getElementById("artistes").value;

    fetch(serveur + "/albums")
    .then(rep => {
        return rep.json();
    })
    .then(resJSON => {
        let albums = document.getElementById("albums");
        albums.innerHTML="";
        for(let album of resJSON) {
            
            
            if((artiste == album.artiste.nom || artiste == "") && album.titre.toLowerCase().includes(titre.toLowerCase())) {
                let div = document.createElement("div");
                div.classList.add("column","is-3");
                let element = `
                    <div class="card large">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="${album.cover}" alt="${album.titre}">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 no-padding">${album.titre}</p>
                                    <p class="subtitle is-6">${album.artiste.nom}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                div.innerHTML = element;
                
                
                albums.appendChild(div);
            }
        }
    })
}

filtrer()