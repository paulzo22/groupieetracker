// On crée la variable ul
var a = document.createElement('ul');
var b = document.createElement('ul')
var un = document.getElementById('un');
var deux = document.getElementById('deux');  

/*
// Faire la requête fetch
fetch('https://cors-anywhere.herokuapp.com/https://groupietrackers.herokuapp.com/api/artists')
  .then(response => {
    return response.json();  // Convertir la réponse en JSON
  })
  .then(data => {
    console.log(data);  // Afficher la réponse de l'API pour vérifier la structure des données

    var artists = data;  // Si 'data' est déjà le tableau d'artistes, pas besoin de faire un autre accès

   
    for (var artist of artists) {  // On parcourt les artistes
      var li = document.createElement("li");  // Créer un élément de liste pour chaque artiste
      var img = document.createElement("img")
      img.setAttribute("src", artist.image)
      li.appendChild(img)
      a.appendChild(li);  // Ajouter l'élément <li> à la liste <ul>
    }

    // Ajouter la liste <ul> au DOM (par exemple à un élément avec l'id 'artists-list')
    un.appendChild(a);  // Vous pouvez aussi ajouter ceci à un élément spécifique
  })
*/