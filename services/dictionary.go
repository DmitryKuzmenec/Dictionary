package services

import (
	"github.com/DmitryKuzmenec/dictionary/model"
)

type ServiceDictionary struct {
	repo RepositoryDictionaryInterface
}

func NewDictionaryService(repo RepositoryDictionaryInterface) *ServiceDictionary {
	return &ServiceDictionary{
		repo: repo,
	}
}

func (s *ServiceDictionary) CreateGroup(userID uint, name string) error {
	return s.repo.CreateGroup(userID, name)
}

func (s *ServiceDictionary) GetGroups(userID uint) (interface{}, error) {
	return s.repo.GetGroups(userID)
}

func (s *ServiceDictionary) Add(data model.DictionaryAddReq) error {
	return s.repo.Add(data)
}

func (s *ServiceDictionary) Dump() (interface{}, error) {
	return s.repo.Dump()
}
