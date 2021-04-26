package main

import (
	"fmt"

	"github.com/DmitryKuzmenec/dictionary/controllers"
	"github.com/DmitryKuzmenec/dictionary/middleware"
	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/DmitryKuzmenec/dictionary/repositories"
	"github.com/DmitryKuzmenec/dictionary/services"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/labstack/echo/v4"
)

func main() {

	db, err := gorm.Open("sqlite3", "./dictionary.db")
	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %s", err))
	}
	defer db.Close()
	db.AutoMigrate(
		&model.UsersDB{},
		&model.DictionariesDB{},
	)

	repoDictionary := repositories.NewDictionaryRepository(db)
	serviceDictionary := services.NewDictionaryService(repoDictionary)
	controllerDictionary := controllers.NewDictionaryController(serviceDictionary)

	repoUser := repositories.NewUsersRepository(db)
	serviceUser := services.NewUserService(repoUser)
	controllerUser := controllers.NewUsersController(serviceUser)

	e := echo.New()
	e.Static("/", "frontend/dictionary/build/")
	e.Static("/public", "frontend/public/")

	d := e.Group("/dictionary")
	d.Use(middleware.JWTAuth)
	d.POST("/create", controllerDictionary.CreateDictionary)
	d.DELETE("/remove/:dictionaryID", controllerDictionary.RemoveDictionary)
	d.GET("/list", controllerDictionary.ListDictionaries)
	d.GET("/dump", controllerDictionary.Dump)
	d.POST("/words", controllerDictionary.WordAdd)
	d.DELETE("/words", controllerDictionary.WordRemove)
	d.GET("/words/:dictionaryID", controllerDictionary.GetDictionary)

	u := e.Group("/user")
	u.POST("/signup", controllerUser.Signup)
	u.POST("/signin", controllerUser.Signin)
	u.GET("/jwt", controllerUser.CheckJWT, middleware.JWTAuth) //for test JWT only

	e.Logger.Fatal(e.Start(":8090"))
}
