package controllers

import "github.com/DmitryKuzmenec/dictionary/model"

type ServiceDictionaryInterface interface {
	CreateGroup(userID uint, name string) error
	GetGroups(userID uint) (interface{}, error)
	Add(data model.DictionaryAddReq) error
	Dump() (interface{}, error)
}
type ServiceTranslateInterface interface {
}
type ServiceUsersInterface interface {
	Create(user model.UserSignup) error
	Verify(u model.UserSignin) (*model.DataJWT, error)
}
