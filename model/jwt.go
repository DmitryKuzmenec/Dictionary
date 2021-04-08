package model

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type DataJWT struct {
	UserID    uint   `json:"id"`
	Role      uint   `json:"role"`
	Time      uint   `json:"time"`
	Email     string `json:"email"`
	FirstName string `json:"fName"`
	LastName  string `json:"lName"`
	jwt.StandardClaims
}
