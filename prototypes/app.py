from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import json
import re

app = FastAPI(debug=True)

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

#update books and edit the book and data
@app.put("/Books")
async def updateBooks(books: str, update: str):
  file = open(filename, "r")
  filedata = file.readlines()
  index = 0
  for idx, val in enumerate(filedata):
    if books in val:
      index = idx
      break
  file.close()
  update_num = re.findall("\d+", update)[0]
  filedata[index] = "Book" + update_num + ";Data" + update_num + "\n"
  new_file = open(filename, "w+")
  for line in filedata:
    new_file.write(line)
  new_file.close()
  return

value = 3
#post add books to books.csv
@app.post("/Books")
async def postBooks():
  global value
  file = open(filename, "a")
  file.write("Book{}".format(value) + ";Data{}".format(value) + "\n")
  file.close()
  value += 1
  return

#delete books from books.csv
@app.delete("/Books")
async def deleteBooks(books: str):
  file = open(filename, "r")
  filedata = file.readlines()
  index = 0
  for idx, val in enumerate(filedata):
    if books in val:
      index = idx
      break
  file.close()
  del filedata[index]
  new_file = open(filename, "w+")
  for line in filedata:
    new_file.write(line)
  new_file.close()
  return
