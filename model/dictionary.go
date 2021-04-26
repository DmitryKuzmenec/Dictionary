package model

type Dictionary struct {
	ID     uint   `json:"id"`
	UserID uint   `json:"userID"`
	Total  uint   `json:"total"`
	Done   uint   `json:"done"`
	Status uint   `json:"status"`
	Name   string `json:"name"`
}

type Word struct {
	ID            uint   `json:"id"`
	Date          string `json:"date"`
	Word          string `json:"word"`
	Translation   string `json:"translation"`
	Transcription string `json:"transcription"`
	Done          bool   `json:"done"`
}
type DictionaryCreateGroupReq struct {
	Name string `json:"name"`
}
type DictionaryRemoveReq struct {
	UserID uint `json:"userID"`
	ID     uint `json:"id"`
}
type WordAddReq struct {
	DictionaryID  uint   `json:"dictionaryID"`
	Word          string `json:"word"`
	Translation   string `json:"translation"`
	Transcription string `json:"transcription"`
}
type WordRemoveReq struct {
	DictionaryID uint `json:"dictionaryID"`
	WordID       uint `json:"wordID"`
}
type WordAdd struct {
	Word          string `json:"word"`
	Translation   string `json:"trnsl"`
	Transcription string `json:"trnsr,omitempty"`
	Done          bool   `json:"done,omitempty"`
}
