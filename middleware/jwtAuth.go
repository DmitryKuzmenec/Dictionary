package middleware

import (
	"net/http"

	"github.com/DmitryKuzmenec/dictionary/model"
	"github.com/DmitryKuzmenec/dictionary/utils"
	"github.com/labstack/echo/v4"
)

func JWTAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		log := ctx.Logger()
		token, err := ctx.Cookie("token")
		if err != nil {
			log.Errorf("[middleware] JWTAuth ctx.Cookie error: %s", err)
			return ctx.JSON(http.StatusOK, model.ErrorRes{Error: "access deny", Status: "error"})
		}
		data, err := utils.CheckJWT(token.Value)
		if err != nil {
			log.Errorf("[middleware] JWTAuth utils.CheckJWT error: %s", err)
			return ctx.JSON(http.StatusOK, model.ErrorRes{Error: "access deny", Status: "error"})
		}
		if data == nil {
			log.Error("[middleware] JWTAuth user empty")
			return ctx.JSON(http.StatusOK, model.ErrorRes{Error: "access deny", Status: "error"})
		}
		ctx.Set("user", data)
		return next(ctx)
	}
}
