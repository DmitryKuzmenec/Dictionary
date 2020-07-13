package model

type Dictionary struct {
	ID            uint   `sql:"size:10;"`
	UserID        uint   `sql:"size:10;"`
	Score         uint   `sql:"size:1024;"`
	Word          string `sql:"size:1024;"`
	Transcription string `sql:"size:1024"`
	Translate     string `sql:"size:1024;"`
	Date          string `sql:"size:1024;"`
	Done          bool   `sql:"size:1024;"`
}
