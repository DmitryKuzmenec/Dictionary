package controllers

import (
	"net/http"
	"strconv"

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

func (c *ControllerDictionary) CreateGroup(ctx echo.Context) error {
	req := model.DictionaryCreateGroupReq{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}
	if req.UserID == 0 {
		return ctx.String(http.StatusBadRequest, "user unknown")
	}
	if req.Name == "" {
		return ctx.String(http.StatusBadRequest, "name is empty")
	}
	if err := c.service.CreateGroup(req.UserID, req.Name); err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, struct{ Error string }{})
}

func (c *ControllerDictionary) ListGroups(ctx echo.Context) error {
	userIDStr := ctx.Param("userid")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}
	if userID == 0 {
		return ctx.String(http.StatusBadRequest, "user unknown")
	}
	groups, err := c.service.GetGroups(uint(userID))
	if err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusOK, groups)
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
