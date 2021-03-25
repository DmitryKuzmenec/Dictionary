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

func (s *ServiceDictionary) Add(data model.DictionaryAddReq) error {
	return s.repo.Add(data)
}

func (s *ServiceDictionary) Dump() (interface{}, error) {
	return s.repo.Dump()
}
