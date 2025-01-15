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
}
func page(w http.ResponseWriter, r *http.Request) { 
	tmpl := template.Must(template.ParseFiles("index.html"))
	tmpl.Execute(w, nil)
}





