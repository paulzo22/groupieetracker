// On crée la variable ul
var ul = document.createElement('ul');

// Faire la requête fetch
fetch('https://cors-anywhere.herokuapp.com/https://groupietrackers.herokuapp.com/api/artists')
  .then(response => {
    return response.json();  // Convertir la réponse en JSON
  })
  .then(data => {
    console.log(data);  // Afficher la réponse de l'API pour vérifier la structure des données

    // On suppose que la réponse contient un tableau d'artistes dans 'data'
    // Par exemple : data.artists ou simplement data
    var artists = data;  // Si 'data' est déjà le tableau d'artistes, pas besoin de faire un autre accès

    // Si la réponse contient un tableau dans 'data.artists', vous devez le faire comme suit :
    // var artists = data.artists; 

    for (var artist of artists) {  // On parcourt les artistes
      var li = document.createElement("li");  // Créer un élément de liste pour chaque artiste
      li.innerText = artist.name;  // On met le nom de l'artiste dans l'élément <li>
      ul.appendChild(li);  // Ajouter l'élément <li> à la liste <ul>
    }

    // Ajouter la liste <ul> au DOM (par exemple à un élément avec l'id 'artists-list')
    document.body.appendChild(ul);  // Vous pouvez aussi ajouter ceci à un élément spécifique
  })
