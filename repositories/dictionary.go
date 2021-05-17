package repositories

import (
	"fmt"
	"time"

	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/jinzhu/gorm"
)

const (
	dictionaryTablePrefix = "dictionary"
)

type RepositoryDictionary struct {
	db *gorm.DB
}

func NewDictionaryRepository(db *gorm.DB) *RepositoryDictionary {
	return &RepositoryDictionary{
		db: db,
	}
}

func (r *RepositoryDictionary) CreateDictionary(userID uint, name string) (*model.DictionariesDB, error) {
	item := model.DictionariesDB{
		UserID: userID,
		Name:   name,
	}
	rez := r.db.Model(&model.DictionariesDB{}).Create(&item)
	if rez.Error != nil {
		return nil, rez.Error
	}

	tableName := dictionaryTableName(userID, item.ID)

	res := r.db.Table(tableName).AutoMigrate(&model.DictionaryDB{})

	return &item, res.Error
}

func (r *RepositoryDictionary) GetDictionary(userID, dictionaryID uint) (*model.DictionariesDB, error) {
	var dictionary model.DictionariesDB
	rez := r.db.Model(&model.DictionariesDB{}).Where("user_id = ? and id = ?", userID, dictionaryID).Find(&dictionary)
	return &dictionary, rez.Error
}

func (r *RepositoryDictionary) RemoveDictionary(userID, dictionaryID uint) error {
	rez := r.db.Model(&model.DictionariesDB{}).Delete(&model.DictionariesDB{ID: dictionaryID, UserID: userID})
	if rez.Error != nil {
		return rez.Error
	}

	tableName := dictionaryTableName(userID, dictionaryID)

	rez = r.db.Table(tableName).DropTable(&model.DictionaryDB{})

	return rez.Error
}

func (r *RepositoryDictionary) ListDictionaries(userID uint) ([]model.Dictionary, error) {
	data := []model.DictionariesDB{}
	rez := r.db.Model(&model.DictionariesDB{}).Where("user_id = ?", userID).Find(&data)
	if rez.Error != nil && rez.Error != gorm.ErrRecordNotFound {
		return nil, rez.Error
	}
	groups := []model.Dictionary{}
	for _, item := range data {
		groups = append(groups, model.Dictionary{
			ID:     item.ID,
			UserID: item.UserID,
			Status: item.Status,
			Total:  item.Total,
			Name:   item.Name,
			Done:   item.Done,
		})
	}
	return groups, nil
}

func (r *RepositoryDictionary) WordAdd(data model.WordAdd, userID, dictionaryID uint) (*model.DictionaryDB, error) {
	tableName := dictionaryTableName(userID, dictionaryID)

	r.db.Table(tableName).AutoMigrate(&model.DictionaryDB{})

	item := model.DictionaryDB{
		Word:          data.Word,
		Translation:   data.Translation,
		Transcription: data.Transcription,
		Date:          uint(time.Now().Unix()),
	}
	if rez := r.db.Model(&model.DictionaryDB{}).Table(tableName).Create(&item); rez.Error != nil {
		return nil, rez.Error
	}

	if err := r.DictionaryWordsCounterInc(userID, dictionaryID); err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *RepositoryDictionary) RemoveWord(userID, dictionaryID, wordID uint) error {
	tableName := dictionaryTableName(userID, dictionaryID)
	if rez := r.db.Table(tableName).
		Where("id = ?", wordID).
		Delete(&model.DictionaryDB{}); rez.Error != nil {
		return rez.Error
	}
	return r.DictionaryWordsCounterDecr(userID, dictionaryID)
}

func (r *RepositoryDictionary) Dump() (interface{}, error) {
	data := []model.DictionaryDB{}
	if rez := r.db.Model(&model.DictionaryDB{}).Find(&data); rez.Error != nil {
		return nil, rez.Error
	}
	return data, nil
}

func (r *RepositoryDictionary) DictionaryWordsCounterInc(userID, dictionaryID uint) error {
	var dictinary model.DictionariesDB
	if rez := r.db.Model(&model.DictionariesDB{}).
		Where("id = ? and user_id=?", dictionaryID, userID).
		First(&dictinary); rez.Error != nil {
		return rez.Error
	}
	dictinary.Total += 1
	if rez := r.db.Model(&dictinary).Update("total", dictinary.Total); rez.Error != nil {
		return rez.Error
	}
	return nil
}

func (r *RepositoryDictionary) DictionaryWordsCounterDecr(userID, dictionaryID uint) error {
	var dictinary model.DictionariesDB
	if rez := r.db.Model(&model.DictionariesDB{}).
		Where("id = ? and user_id=?", dictionaryID, userID).
		First(&dictinary); rez.Error != nil {
		return rez.Error
	}
	if dictinary.Total == 0 {
		return nil
	}
	dictinary.Total -= 1
	if rez := r.db.Model(&dictinary).Update("total", dictinary.Total); rez.Error != nil {
		return rez.Error
	}
	return nil
}

func (r *RepositoryDictionary) GetWords(userID, dictionaryID uint) ([]model.DictionaryDB, error) {
	tableName := dictionaryTableName(userID, dictionaryID)
	var words []model.DictionaryDB
	rez := r.db.Model(&model.DictionaryDB{}).Table(tableName).Find(&words)

	return words, rez.Error
}

func dictionaryTableName(userID, dictionaryID uint) string {
	return fmt.Sprintf("%s_%d_%d", dictionaryTablePrefix, userID, dictionaryID)
}
