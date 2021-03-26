package utils

import (
	"errors"

	"github.com/DmitryKuzmenec/dictionary/model"
	jwt "github.com/dgrijalva/jwt-go"
)

const SecretJWT = "This is secret string"

func CreateJWT(data model.DataJWT) (string, error) {
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), &data)
	tokenString, err := token.SignedString([]byte(SecretJWT))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func CheckJWT(token string) (*model.DataJWT, error) {
	data := model.DataJWT{}
	tokenJWT, err := jwt.ParseWithClaims(token, &data, func(*jwt.Token) (interface{}, error) { return []byte(SecretJWT), nil })
	if err != nil {
		return nil, err
	}
	if !tokenJWT.Valid {
		return nil, errors.New("malformed authentication token")
	}
	return &data, nil
}
