package services

import "github.com/DmitryKuzmenec/dictionary/model"

type RepositoryDictionaryInterface interface {
	CreateDictionary(userID uint, name string) (*model.DictionariesDB, error)
	RemoveDictionary(userID, dictionaryID uint) error
	GetDictionary(userID, dictionaryID uint) (*model.DictionariesDB, error)
	ListDictionaries(userID uint) ([]model.Dictionary, error)
	WordAdd(data model.WordAdd, userID, dictionaryID uint) (*model.DictionaryDB, error)
	RemoveWord(userID, dictionaryID, wordID uint) error
	GetWords(userID, dictionaryID uint) ([]model.DictionaryDB, error)
	GetUnlearnedWords(userID, dictionaryID, limit uint) ([]model.DictionaryDB, error)
	Dump() (interface{}, error)
}

type RepositoryUsersInterface interface {
	Create(user model.UserSignup) error
	GetByEmail(email string) (*model.UsersDB, error)
}
