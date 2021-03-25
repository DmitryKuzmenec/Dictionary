package model

type DictionaryAddReq struct {
	Text          string `json:"txt"`
	Translation   string `json:"trnsl"`
	Transcription string `json:"trnsr"`
}
