package model

type UserSignup struct {
	FirstName string `json:"fName"`
	LastName  string `json:"lName"`
	Passwd    string `json:"passwd"`
	Email     string `json:"email"`
	Role      uint   `json:"role,omitempty"`
}

type UserSignin struct {
	Email  string `json:"email"`
	Passwd string `json:"passwd"`
}
