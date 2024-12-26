package main

import (
	"html/template"
	"net/http"
)

type mot struct { 
	word string 
}

var data mot 

func main ()  {
	data.word = "Bonjour"
	http.HandleFunc("/" , page)
	http.ListenAndServe(":8080", nil)
	
}
func page(w http.ResponseWriter, r *http.Request) { 
	tmpl := template.Must(template.ParseFiles("index.html"))
	tmpl.Execute(w, data)
}