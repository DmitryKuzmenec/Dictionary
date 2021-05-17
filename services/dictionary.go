package services

import (
	"errors"
	"time"

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

func (s *ServiceDictionary) CreateDictionary(userID uint, name string) (*model.Dictionary, error) {
	d, err := s.repo.CreateDictionary(userID, name)
	if err != nil {
		return nil, err
	}
	dictionary := model.Dictionary{
		ID:     d.ID,
		UserID: d.UserID,
		Total:  d.Total,
		Done:   d.Done,
		Status: d.Status,
		Name:   d.Name,
	}
	return &dictionary, nil
}

func (s *ServiceDictionary) RemoveDictionary(userID, dictionaryID uint) error {
	dictionary, err := s.repo.GetDictionary(userID, dictionaryID)
	if err != nil {
		return err
	}
	if dictionary == nil {
		return errors.New("dictionary not exists")
	}
	return s.repo.RemoveDictionary(userID, dictionaryID)
}

func (s *ServiceDictionary) ListDictionaries(userID uint) (interface{}, error) {
	return s.repo.ListDictionaries(userID)
}

func (s *ServiceDictionary) WordAdd(data model.WordAdd, userID, dictionaryID uint) (*model.Word, error) {
	if data.Word == "" {
		return nil, errors.New("word empty")
	}
	if data.Translation == "" {
		return nil, errors.New("translation empty")
	}
	word, err := s.repo.WordAdd(data, userID, dictionaryID)
	if err != nil {
		return nil, err
	}
	var date string
	timeCreated := time.Unix(int64(word.Date), 0)
	date = timeCreated.Format("2006-01-02")
	res := model.Word{
		ID:            word.ID,
		Date:          date,
		Word:          word.Word,
		Translation:   word.Translation,
		Transcription: word.Transcription,
	}
	return &res, nil
}

func (s *ServiceDictionary) WordRemove(userID, dictionaryID, wordID uint) error {
	return s.repo.RemoveWord(userID, dictionaryID, wordID)
}

func (s *ServiceDictionary) GetWords(userID, dictionaryID uint) ([]model.Word, error) {
	wordsDB, err := s.repo.GetWords(userID, dictionaryID)

	if err != nil {
		return nil, err
	}
	var words []model.Word
	for _, w := range wordsDB {
		words = append(words, model.Word{
			ID:            w.ID,
			Word:          w.Word,
			Translation:   w.Translation,
			Transcription: w.Transcription,
			Done:          w.Done,
			Date:          time.Unix(int64(w.Date), 0).Format("2006-01-02"),
		})
	}
	return words, nil
}

func (s *ServiceDictionary) Dump() (interface{}, error) {
	return s.repo.Dump()
}
