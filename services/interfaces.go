package services

import "github.com/DmitryKuzmenec/dictionary/model"

type RepositoryDictionaryInterface interface {
	CreateGroup(userID uint, name string) error
	GetGroups(userID uint) ([]model.DictionaryGroup, error)
	Add(data model.DictionaryAddReq) error
	Dump() (interface{}, error)
}

type RepositoryUsersInterface interface {
	Create(user model.UserSignup) error
	GetByEmail(email string) (*model.UsersDB, error)
}
