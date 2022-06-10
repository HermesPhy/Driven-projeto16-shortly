CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE,
	"createAt" TIMESTAMP NOT NULL DEFAULT NOW()
)

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"token" TEXT NOT NULL,
	"createAt" TIMESTAMP NOT NULL DEFAULT NOW()
)

CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"visitCount" integer NOT NULL DEFAULT '0',
	"createAt" TIMESTAMP NOT NULL DEFAULT NOW()
)