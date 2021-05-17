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

func (c *ControllerDictionary) CreateDictionary(ctx echo.Context) error {
	req := model.DictionaryCreateGroupReq{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}
	if req.Name == "" {
		return ctx.String(http.StatusBadRequest, "name is empty")
	}

	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}

	dictionary, err := c.service.CreateDictionary(user.UserID, req.Name)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{Error: err.Error()})
	}

	return ctx.JSON(http.StatusOK, dictionary)
}

func (c *ControllerDictionary) RemoveDictionary(ctx echo.Context) error {
	dictionaryIDStr := ctx.Param("dictionaryID")
	if dictionaryIDStr == "" {
		return ctx.JSON(http.StatusBadRequest, struct{ Error string }{"wrong dictionaryID"})
	}
	dictionaryID, err := strconv.Atoi(dictionaryIDStr)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, struct{ Error string }{"wrong dictionaryID"})
	}
	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}

	if err := c.service.RemoveDictionary(user.UserID, uint(dictionaryID)); err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, struct{ Error string }{})
}

func (c *ControllerDictionary) ListDictionaries(ctx echo.Context) error {
	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}

	dictionaries, err := c.service.ListDictionaries(user.UserID)
	if err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}
	return ctx.JSON(http.StatusOK, dictionaries)
}

func (c *ControllerDictionary) WordAdd(ctx echo.Context) error {
	req := model.WordAddReq{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}

	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}

	data := model.WordAdd{
		Word:          req.Word,
		Translation:   req.Translation,
		Transcription: req.Transcription,
	}

	word, err := c.service.WordAdd(data, user.UserID, req.DictionaryID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{Error: err.Error()})
	}
	return ctx.JSON(http.StatusOK, word)
}

func (c *ControllerDictionary) WordRemove(ctx echo.Context) error {
	req := model.WordRemoveReq{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.String(http.StatusBadRequest, err.Error())
	}

	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}
	if user.UserID == 0 || req.DictionaryID == 0 || req.WordID == 0 {
		return ctx.JSON(http.StatusBadRequest, struct{ Error string }{Error: "wrong input data"})
	}

	if err := c.service.WordRemove(user.UserID, req.DictionaryID, req.WordID); err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, struct{ Error string }{})
}

func (c *ControllerDictionary) GetDictionary(ctx echo.Context) error {
	dictionaryIDStr := ctx.Param("dictionaryID")
	dictionaryID, err := strconv.Atoi(dictionaryIDStr)

	if err != nil {
		return ctx.JSON(http.StatusBadRequest, struct{ Error string }{Error: err.Error()})
	}
	user, ok := ctx.Get("user").(*model.DataJWT)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{"can't unpack user"})
	}

	words, err := c.service.GetWords(user.UserID, uint(dictionaryID))
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, struct{ Error string }{Error: err.Error()})
	}

	return ctx.JSON(http.StatusOK, words)
}

func (c *ControllerDictionary) Dump(ctx echo.Context) error {
	dump, err := c.service.Dump()
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, dump)
}
