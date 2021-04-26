package dError

const DERR = {
	"InternalServerErro": iota,
	"qqq",
}

type DError struct {
}

func New() *DError {
	err := new(DError)
	return err
}
