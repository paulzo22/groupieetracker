package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
)



type Artist struct {
    Name         string   `json:"name"`
    Image        string   `json:"image"`
    CreationDate int      `json:"creationDate"`
    FirstAlbum   string   `json:"firstAlbum"`
    Members      []string `json:"members"`
}

type Data []Artist

func handlerartist(w http.ResponseWriter, r *http.Request) {
    // Récupérer les données depuis l'API
    resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
    if err != nil {
        log.Printf("Erreur lors de la récupération des données : %v", err)
        http.Error(w, "Erreur lors de la récupération des données", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    // Décoder les données JSON
    var data Data
    err = json.NewDecoder(resp.Body).Decode(&data)
    if err != nil {
        log.Printf("Erreur lors du parsing des données JSON : %v", err)
        http.Error(w, "Erreur lors du parsing des données JSON", http.StatusInternalServerError)
        return
    }

    // Charger le template
    tmpl, err := template.ParseFiles("index.html")
    if err != nil {
        log.Printf("Erreur lors du chargement du template : %v", err)
        http.Error(w, "Erreur lors du chargement du template", http.StatusInternalServerError)
        return
    }

    // Définir le type de contenu
    w.Header().Set("Content-Type", "text/html; charset=utf-8")

    // Générer la page HTML
    err = tmpl.Execute(w, data)
    if err != nil {
        log.Printf("Erreur lors de la génération de la page : %v", err)
        http.Error(w, "Erreur lors de la génération de la page", http.StatusInternalServerError)
    }
}
func main() {
    // Servir les fichiers statiques (CSS, JS, etc.)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    // Servir le handler
	http.HandleFunc("/", handlerartist)
	log.Println("Serveur démarré sur http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8081", nil))
}