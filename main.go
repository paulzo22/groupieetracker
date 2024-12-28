package main

import (
	"fmt"
	"html/template"
	"net/http"
)


func main ()  {
	// Servir les fichiers statiques (CSS, JS, etc.)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/" , page)
	// Handler principal
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "CORS configuré avec succès")
	})

	// Appliquer le middleware
	http.ListenAndServe(":8080", enableCORS(http.DefaultServeMux))
	
}
func page(w http.ResponseWriter, r *http.Request) { 
	tmpl := template.Must(template.ParseFiles("index.html"))
	tmpl.Execute(w, nil)
}

// Middleware pour gérer CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Ajouter les en-têtes CORS
		w.Header().Set("Access-Control-Allow-Origin", "*") // Remplacez '*' par un domaine spécifique si nécessaire
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		// Répondre immédiatement pour les requêtes OPTIONS (pré-vol)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		// Appeler le prochain handler
		next.ServeHTTP(w, r)
	})
}


