build:
	export GO111MODULE="on"; \
	go mod download; \
	go mod vendor; \
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -mod=vendor -a -ldflags '-s' -o main dictionary.go

install:
	go mod download

run:
	go run dictionary.go

test:
	go test ./...