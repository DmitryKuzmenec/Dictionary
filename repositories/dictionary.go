package repositories

import (
	"time"

	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/jinzhu/gorm"
)

type RepositoryDictionary struct {
	db *gorm.DB
}

func NewDictionaryRepository(db *gorm.DB) *RepositoryDictionary {
	return &RepositoryDictionary{
		db: db,
	}
}

func (r *RepositoryDictionary) Add(data model.DictionaryAddReq) error {
	item := model.DictionaryDB{
		Word:          data.Text,
		Translate:     data.Translation,
		Transcription: data.Transcription,
		Date:          uint(time.Now().Unix()),
	}
	rez := r.db.Model(&model.DictionaryDB{}).Create(&item)
	return rez.Error
}

func (r *RepositoryDictionary) Dump() (interface{}, error) {
	data := []model.DictionaryDB{}
	if res := r.db.Model(&model.DictionaryDB{}).Find(&data); res.Error != nil {
		return nil, res.Error
	}
	return data, nil
}
