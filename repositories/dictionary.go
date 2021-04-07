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

func (r *RepositoryDictionary) CreateGroup(userID uint, name string) error {
	item := model.GroupsDB{
		UserID: userID,
		Name:   name,
	}
	rez := r.db.Model(&model.GroupsDB{}).Create(&item)
	return rez.Error
}

func (r *RepositoryDictionary) RemoveGroup(userID, id uint) error {
	rez := r.db.Model(&model.GroupsDB{}).Delete(&model.GroupsDB{ID: id, UserID: userID})
	return rez.Error
}

// func (r *RepositoryDictionary) GetGroup(userID, id uint) () {

// }

func (r *RepositoryDictionary) GetGroups(userID uint) ([]model.DictionaryGroup, error) {
	data := []model.GroupsDB{}
	rez := r.db.Model(&model.GroupsDB{}).Where("user_id = ?", userID).Find(&data)
	if rez.Error != nil && rez.Error != gorm.ErrRecordNotFound {
		return nil, rez.Error
	}
	groups := []model.DictionaryGroup{}
	for _, item := range data {
		groups = append(groups, model.DictionaryGroup{
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

func (r *RepositoryDictionary) Add(data model.DictionaryAddReq) error {
	item := model.DictionaryDB{
		UserID:        data.UserID,
		GroupID:       data.GroupID,
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
	if rez := r.db.Model(&model.DictionaryDB{}).Find(&data); rez.Error != nil {
		return nil, rez.Error
	}
	return data, nil
}
