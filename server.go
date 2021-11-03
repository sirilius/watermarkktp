package main

import (
	"embed"
	"log"
	"net/http"
	"os"
)

//go:embed *.html *.css *.js *.svg image/* LICENSE
var webUI embed.FS

func main() {
	fs := http.FileServer(http.FS(webUI))
	http.Handle("/", fs)

	port := ":3000"
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}

	log.Println("Listening on " + port + "...")
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
