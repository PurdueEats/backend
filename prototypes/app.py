from fastapi import FastAPI
import json

app = FastAPI()

filename = "books.csv"

@app.get("/Books")
async def getBooks():
	file = open(filename, "r")
	data = {}
	books = {}
	
	for line in file:
		s = line.split(";")
		books[s[0]] = s[1]
	data['books'] = books
	return json.dumps(data)
