package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type ControllerTranslate struct {
	service ServiceTranslateInterface
}

func NewTranslateController(service ServiceTranslateInterface) *ControllerTranslate {
	return &ControllerTranslate{
		service: service,
	}
}

func (c *ControllerTranslate) Translate(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "Translate")
}
