package model

type DictionaryAddReq struct {
	UserID        uint   `json:"userID"`
	GroupID       uint   `json:"groupID"`
	Text          string `json:"txt"`
	Translation   string `json:"trnsl"`
	Transcription string `json:"trnsr"`
}

type DictionaryCreateGroupReq struct {
	UserID uint   `json:"userID"`
	Name   string `json:"name"`
}

type DictionaryGroup struct {
	ID     uint   `json:"groupID"`
	UserID uint   `json:"userID"`
	Total  uint   `json:"total"`
	Done   uint   `json:"done"`
	Status uint   `json:"status"`
	Name   string `json:"name"`
}
