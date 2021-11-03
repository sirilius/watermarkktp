FROM golang:alpine

WORKDIR /site
COPY . /site

ENV CGO_ENABLED=0

RUN go get -d -v .
RUN go build -trimpath .

ENV PORT=":80"
CMD ["./watermarkktp"]