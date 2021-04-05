# Build the Go API
FROM golang:1.14 as builder

ARG BITBUCKET_USERNAME
ARG BITBUCKET_TOKEN
WORKDIR /main
ADD . /main/
RUN make build
RUN make test

# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /main/frontend/dictionary ./
RUN npm install
RUN npm run build

FROM golang:1.14
EXPOSE 8090
COPY --from=builder /main ./
COPY --from=node_builder /build ./build
RUN chmod +x ./main
RUN pwd; ls -al
CMD ["./main"]
