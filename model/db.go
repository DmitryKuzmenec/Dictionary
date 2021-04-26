package model

type DictionaryDB struct {
	ID            uint   `gorm:"size:10;column:id;primaryKey;autoIncrement;"`
	Date          uint   `gorm:"size:1024;column:date"`
	Word          string `gorm:"size:1024;column:word"`
	Transcription string `gorm:"size:1024;column:transcription"`
	Translation   string `gorm:"size:1024;column:translate"`
	Done          bool   `gorm:"size:1024;column:done"`
}

func (DictionaryDB) TableName() string {
	return "dictionary_db"
}

type UsersDB struct {
	ID        uint   `gorm:"size:10;column:id;primaryKey;autoIncrement;"`
	Role      uint   `gorm:"size:10;column:role"`
	FirstName string `gorm:"size:50;column:first_name"`
	LastName  string `gorm:"size:50;column:last_name"`
	Email     string `gorm:"size:100;column:email;index;unique"`
	Password  string `gorm:"size:256;column:password"`
}

func (UsersDB) TableName() string {
	return "users_db"
}

type DictionariesDB struct {
	ID     uint   `gorm:"size:10;column:id;primaryKey;autoIncrement;"`
	UserID uint   `gorm:"size:10;column:user_id;uniqueIndex:user_id;"`
	Total  uint   `gorm:"size:10;column:total"`
	Status uint   `gorm:"size:10;column:status"`
	Done   uint   `gorm:"size:10;column:done"`
	Name   string `gorm:"size:50;column:name;uniqueIndex:user_id;"`
}

func (DictionariesDB) TableName() string {
	return "dictionaries_db"
}
