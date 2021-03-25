package utils

import (
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
