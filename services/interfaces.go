package services

import "github.com/DmitryKuzmenec/dictionary/model"

type RepositoryDictionaryInterface interface {
	Add(data model.DictionaryAddReq) error
	Dump() (interface{}, error)
}

type RepositoryUsersInterface interface {
	Create(user model.UserSignup) error
	GetByEmail(email string) (*model.UsersDB, error)
}
