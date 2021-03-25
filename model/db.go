package model

type DictionaryDB struct {
	ID            uint   `sql:"size:10;primaryKey;autoIncrement;"`
	UserID        uint   `sql:"size:10;"`
	GroupID       uint   `sql:"size:10;"`
	Score         uint   `sql:"size:1024;"`
	Date          uint   `sql:"size:1024;"`
	Word          string `sql:"size:1024;"`
	Transcription string `sql:"size:1024;"`
	Translate     string `sql:"size:1024;"`
	Done          bool   `sql:"size:1024;"`
}
type UsersDB struct {
	ID        uint   `sql:"size:10;primaryKey;autoIncrement;"`
	Role      uint   `sql:"size:10;"`
	FirstName string `sql:"size:50;"`
	LastName  string `sql:"size:50;"`
	Email     string `sql:"size:100;unique"`
	Password  string `sql:"size:256;"`
}

type GroupsDB struct {
	ID   uint   `sql:"size:10;primaryKey;autoIncrement;"`
	Name string `sql:"size:50;"`
}
