package main

import (
	"html/template"
	"net/http"
)


func main ()  {
	// Servir les fichiers statiques (CSS, JS, etc.)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/" , page)
	http.ListenAndServe(":8080", nil)
	
}
func page(w http.ResponseWriter, r *http.Request) { 
	tmpl := template.Must(template.ParseFiles("index.html"))
	tmpl.Execute(w, nil)
}