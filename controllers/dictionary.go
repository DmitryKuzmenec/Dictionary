package controllers

import (
	"net/http"

	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/labstack/echo/v4"
)

type ControllerDictionary struct {
	service ServiceDictionaryInterface
}

func NewDictionaryController(service ServiceDictionaryInterface) *ControllerDictionary {
	return &ControllerDictionary{
		service: service,
	}
}

func (c *ControllerDictionary) Add(ctx echo.Context) error {
	req := model.DictionaryAddReq{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}
	if err := c.service.Add(req); err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, struct{ Error string }{})
}

func (c *ControllerDictionary) Dump(ctx echo.Context) error {
	dump, err := c.service.Dump()
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, dump)
}
