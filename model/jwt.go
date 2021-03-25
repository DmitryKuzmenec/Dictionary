package model

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type DataJWT struct {
	Email     string `json:"email"`
	FirstName string `json:"fName"`
	LastName  string `json:"lName"`
	Role      uint   `json:"role"`
	Time      uint   `json:"time"`
	jwt.StandardClaims
}
