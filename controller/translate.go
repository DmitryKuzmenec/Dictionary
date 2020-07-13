package controller

import (
	"context"
	"net/http"

	"github.com/davecgh/go-spew/spew"
)

func Translate(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		spew.Dump(ctx)
		w.Write([]byte("Hi!"))
	}
}
