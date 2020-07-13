package main

import (
	"context"
	"log"
	"net/http"

	"github.com/DmitryKuzmenec/dictionary/controller"
	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	db, err := gorm.Open("sqlite3", "/var/tmp/dictionary.go")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	db.AutoMigrate(&model.Dictionary{})

	http.HandleFunc("/translate", controller.Translate(ctx))

	err = http.ListenAndServe("localhost:8090", nil)
	if err != nil {
		log.Fatal(err)
	}
}
