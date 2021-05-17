package dError

const (
	InternalServerError = iota
	UserNotFound
	WrongPassword
)

const (
	defaultError = InternalServerError
)

var descriptions = map[int]string{
	InternalServerError: "Произошла внутренняя ошибка!",
	UserNotFound:        "Пользователь не найден!",
	WrongPassword:       "Не верный пароль!",
}

type DError struct {
	Code int
}

func New(code int) *DError {
	return new(DError).setCode(code)
}

func (e DError) Error() string {
	descr, ok := descriptions[e.Code]
	if !ok {
		return descriptions[defaultError]
	}
	return descr
}

func (e DError) String() string {
	return e.Error()
}

func (e *DError) setCode(code int) *DError {
	e.Code = code
	return e
}
