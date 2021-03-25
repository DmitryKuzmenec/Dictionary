package controllers

import (
	"net/http"
	"time"

	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/DmitryKuzmenec/dictionary/utils"
	"github.com/labstack/echo/v4"
)

type ControllerUsers struct {
	service ServiceUsersInterface
}

func NewUsersController(service ServiceUsersInterface) *ControllerUsers {
	return &ControllerUsers{
		service: service,
	}
}

func (c *ControllerUsers) Signup(ctx echo.Context) error {
	user := model.UserSignup{}
	if err := ctx.Bind(&user); err != nil {
		return ctx.JSON(http.StatusBadRequest, &model.ErrorRes{Error: err.Error(), Status: "error"})
	}
	if user.Passwd == "" {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: "пароль не указан", Status: "error"})
	}
	if user.Email == "" {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: "почтовый адрес не указан", Status: "error"})
	}
	if err := c.service.Create(user); err != nil {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: err.Error(), Status: "error"})
	}
	return ctx.JSON(http.StatusOK, &model.ErrorRes{Status: "ok"})
}

func (c *ControllerUsers) Signin(ctx echo.Context) error {
	user := model.UserSignin{}
	if err := ctx.Bind(&user); err != nil {
		return ctx.JSON(http.StatusBadRequest, &model.ErrorRes{Error: err.Error(), Status: "error"})
	}
	if user.Passwd == "" {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: "пароль не указан", Status: "error"})
	}
	if user.Email == "" {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: "почтовый адрес не указан", Status: "error"})
	}
	jwt, err := c.service.Verify(user)
	if err != nil {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: err.Error(), Status: "error"})
	}
	token, err := utils.CreateJWT(*jwt)
	if err != nil {
		return ctx.JSON(http.StatusOK, &model.ErrorRes{Error: err.Error(), Status: "error"})
	}
	// Creating cookie with JWT token
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	ctx.SetCookie(cookie)
	return ctx.JSON(http.StatusOK, &model.ErrorRes{Status: "ok"})
}
