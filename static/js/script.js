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

      // Remplir les informations de l'artiste
      text1.innerText = artist.name;
      text2.innerText = "Beginning = " + artist.creationDate;

      // Créer l'image de l'artiste
      const img = document.createElement("img");
      img.setAttribute("src", artist.image);
      img.setAttribute("alt", artist.name);

      // Ajouter une classe pour le style
      cadre.setAttribute("class", "cont");

      // Ajouter les éléments au cadre
      cadre.appendChild(img);
      wr.appendChild(text1);
      wr.appendChild(text2);

      // Récupérer les relations de l'artiste
      fetch('https://thingproxy.freeboard.io/fetch/' + artist.relations)
        .then(response => response.json())
        .then(relations => {
          console.log(relations); // Vérifiez les relations dans la console
          if (relations.datesLocations) {
            text3.innerText = `Upcoming concerts: ${Object.keys(relations.datesLocations).length} locations`;
          } else {
            text3.innerText = "No relations found.";
          }
          wr.appendChild(text3); // Ajouter les relations après les avoir récupérées
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
  });
