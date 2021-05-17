package controllers

import (
	"github.com/DmitryKuzmenec/dictionary/model"
)

type ServiceDictionaryInterface interface {
	CreateDictionary(userID uint, name string) (*model.Dictionary, error)
	RemoveDictionary(userID, dictionaryID uint) error
	WordAdd(data model.WordAdd, userID, dictionaryID uint) (*model.Word, error)
	WordRemove(userID, dictionaryID, wordID uint) error
	GetWords(userID, dictionaryID uint) ([]model.Word, error)
	ListDictionaries(userID uint) (interface{}, error)
	Dump() (interface{}, error)
}
type ServiceTranslateInterface interface {
}
type ServiceUsersInterface interface {
	Create(user model.UserSignup) error
	Verify(u model.UserSignin) (*model.DataJWT, error)
}
