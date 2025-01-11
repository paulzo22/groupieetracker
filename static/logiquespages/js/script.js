




//PAGES D'INDEX





if (!window.location.pathname.endsWith("Artistes.html") && !window.location.pathname.endsWith("Membres.html") && !window.location.pathname.endsWith("Concerts.html")) {
  // On récupère le main
  var main = document.getElementById("main");
  // Faire la requête fetch pour récupérer les artistes
  fetch('https://thingproxy.freeboard.io/fetch/https://groupietrackers.herokuapp.com/api/artists')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(artists => {
      console.log(artists); // Vérifiez les données des artistes dans la console

      // Parcourir chaque artiste
      for (let artist of artists) { // Utiliser "let" pour une portée correcte
        // Créer les éléments principaux pour l'affichage
        const cadre = document.createElement("div");
        const wr = document.createElement("div");
        const text1 = document.createElement("h3");
        const text2 = document.createElement("p");
        const text3 = document.createElement("p");
        const text4 = document.createElement("p") ; 
        const text5 = document.createElement("p") ;
        const lien1 = document.createElement("a") 
        const lien2 = document.createElement("a") ; 
        const lien3 = document.createElement("a") ; 

        // Remplir les informations de l'artiste
        text1.innerText = artist.name;
        text2.innerText = "Beginning : " + artist.creationDate;
        text4.innerText = "First album : " + artist.firstAlbum ;
        text5.innerText = `Members : ${Object.keys(artist.members).length} members`

        // Créer l'image de l'artiste
        const img = document.createElement("img");
        img.setAttribute("src", artist.image);
        img.setAttribute("alt", artist.name);

        // Ajouter une classe pour le style
        cadre.setAttribute("class", "cont");
        //créer les liens 
        lien1.setAttribute("href","/static/logiquespages/Artistes.html")
        lien2.setAttribute("href", `/static/logiquespages/Membres.html?artistId=${artist.id}`);
        //ajouter les textes aux lien 
        lien1.appendChild(text1)
        lien2.appendChild(text5)
        // Ajouter les éléments au cadre
        cadre.appendChild(img);
        wr.appendChild(lien1);
        wr.appendChild(text2);
        wr.appendChild(text4)
        wr.appendChild(lien2)

        // Récupérer les relations de l'artiste
        fetch('https://thingproxy.freeboard.io/fetch/' + artist.relations)
          .then(response => response.json())
          .then(relations => {
            console.log(relations); // Vérifiez les relations dans la console
            if (relations.datesLocations) {
              text3.innerText = `Upcoming concerts: ${Object.keys(relations.datesLocations).length} locations`;
              lien3.setAttribute("href",`/static/logiquespages/Concerts.html?artistId=${artist.id}`)
            } else {
              text3.innerText = "No relations found.";
            }
            lien3.appendChild(text3)
            wr.appendChild(lien3); // Ajouter les relations après les avoir récupérées
          })
          .catch(error => {
            console.error("Error fetching relations:", error);
            text3.innerText = "Error fetching relations.";
            wr.appendChild(text3); // Afficher une erreur dans l'interface utilisateur
          });

        // Ajouter le wrapper au cadre
        cadre.appendChild(wr);

        // Ajouter le cadre au DOM
        main.appendChild(cadre);
      }
    })
    .catch(error => {
      console.error("Error fetching artists:", error);
      const errorText = document.createElement("p");
      errorText.innerText = "Error loading artists.";
      main.appendChild(errorText);
    })

}





//PAGES DESCRIPTIFS DE CHAQUE ARTISTE





if (window.location.pathname.endsWith("Artistes.html")) { 
  console.log("artistes")
}




//PAGES AFFICHANTS LES MEMBRES




if (window.location.pathname.endsWith("Membres.html")) {
  // Récupérer l'ID de l'artiste depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('artistId');
  // Vérifier si un ID d'artiste est présent dans l'URL
  if (artistId) {
      // Faire une requête pour récupérer les détails de l'artiste
      fetch(`https://thingproxy.freeboard.io/fetch/https://groupietrackers.herokuapp.com/api/artists/${artistId}`)
          .then(response => response.json())
          .then(artist => {
              // Vérifier que l'artiste existe
              if (artist) {
                  // Créer un titre pour afficher l'artiste
                  const title = document.createElement("h2");
                  title.innerText = `Membres de l'artiste : ${artist.name}`;
                  document.body.appendChild(title);

                  // Créer un conteneur pour les membres
                  const membresList = document.getElementById("membres-list");

                  // Vérifier si des membres existent
                  if (artist.members) {
                      // Parcourir les membres et les afficher
                      for (let [memberName, memberRole] of Object.entries(artist.members)) {
                          const memberDiv = document.createElement("div");
                          memberDiv.classList.add("membre");

                          // Ajouter le nom et le rôle du membre
                          const name = document.createElement("p");
                          name.innerText = `Nom: ${memberName}`;
                          const role = document.createElement("p");
                          role.innerText = `Rôle: ${memberRole}`;

                          memberDiv.appendChild(name);
                          memberDiv.appendChild(role);
                          membresList.appendChild(memberDiv);
                      }
                  } else {
                      membresList.innerHTML = "<p>Aucun membre trouvé pour cet artiste.</p>";
                  }
              }
          })
          .catch(error => {
              console.error("Erreur lors de la récupération des informations de l'artiste:", error);
              document.getElementById("membres-list").innerHTML = "<p>Erreur lors de la récupération des membres.</p>";
          });
  } else {
      document.getElementById("membres-list").innerHTML = "<p>Aucun artiste sélectionné.</p>";
  }

}




//PAGES AFFICHANT LES LIEUX ET DATES DE CONCERTS 




if (window.location.pathname.endsWith("Concerts.html")) {
  // Récupérer l'ID de l'artiste depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('artistId');

  // Vérifier si un ID d'artiste est présent dans l'URL
  if (artistId) {
      // Faire une requête pour récupérer les relations de l'artiste, notamment les concerts
      fetch(`https://thingproxy.freeboard.io/fetch/https://groupietrackers.herokuapp.com/api/artists/${artistId}`)
          .then(response => response.json())
          .then(artist => {
              // Vérifier que l'artiste existe
              if (artist) {
                  // Créer un titre pour afficher l'artiste
                  const title = document.createElement("h2");
                  title.innerText = `Concerts de l'artiste : ${artist.name}`;
                  document.body.appendChild(title);

                  // Créer un conteneur pour les concerts
                  const concertsList = document.getElementById("concerts-list");

                  // Vérifier si des concerts existent dans les relations
                  if (artist.relations && artist.relations.datesLocations) {
                      const concerts = artist.relations.datesLocations;

                      // Parcourir les concerts et les afficher
                      for (let concertLocation of Object.entries(concerts)) {
                          const concertDiv = document.createElement("div");
                          concertDiv.classList.add("concert");

                          // Ajouter la date et le lieu du concert
                          const date = document.createElement("p");
                          date.innerText = `Date: ${concertLocation[0]}`; // date du concert
                          const location = document.createElement("p");
                          location.innerText = `Lieu: ${concertLocation[1].location}`; // lieu du concert

                          concertDiv.appendChild(date);
                          concertDiv.appendChild(location);
                          concertsList.appendChild(concertDiv);
                      }
                  } else {
                      concertsList.innerHTML = "<p>Aucun concert trouvé pour cet artiste.</p>";
                  }
              }
          })
          .catch(error => {
              console.error("Erreur lors de la récupération des concerts de l'artiste:", error);
              document.getElementById("concerts-list").innerHTML = "<p>Erreur lors de la récupération des concerts.</p>";
          });
  } else {
      document.getElementById("concerts-list").innerHTML = "<p>Aucun artiste sélectionné.</p>";
  }
}






