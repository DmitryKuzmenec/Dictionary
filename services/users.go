package services

import (
	"errors"
	"time"

	"github.com/DmitryKuzmenec/dictionary/model"
	"golang.org/x/crypto/bcrypt"
)

type ServiceUsers struct {
	repo RepositoryUsersInterface
}

func NewUserService(repo RepositoryUsersInterface) *ServiceUsers {
	return &ServiceUsers{
		repo: repo,
	}
}

func (s *ServiceUsers) Create(user model.UserSignup) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Passwd), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Passwd = string(hash)
	return s.repo.Create(user)
}

func (s *ServiceUsers) Verify(u model.UserSignin) (*model.DataJWT, error) {
	if u.Email == "" {
		return nil, errors.New("empty email")
	}
	user, err := s.repo.GetByEmail(u.Email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("пользователь не найден")
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Passwd))
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return nil, errors.New("wrong password")
	}
	jwt := model.DataJWT{
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
		Time:      uint(time.Now().Unix()),
	}
	return &jwt, err
}
