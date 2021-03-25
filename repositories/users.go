package repositories

import (
	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/jinzhu/gorm"
)

type RepositoryUsers struct {
	db *gorm.DB
}

func NewUsersRepository(db *gorm.DB) *RepositoryUsers {
	return &RepositoryUsers{
		db: db,
	}
}

func (r *RepositoryUsers) Create(user model.UserSignup) error {
	userDB := model.UsersDB{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Password:  user.Passwd,
		Role:      user.Role,
	}
	res := r.db.Model(&model.UsersDB{}).Create(&userDB)
	return res.Error
}

func (r *RepositoryUsers) GetByEmail(email string) (*model.UsersDB, error) {
	user := model.UsersDB{}
	res := r.db.Model(&model.UsersDB{}).Where("email=?", email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, res.Error
	}
	return &user, nil
}
