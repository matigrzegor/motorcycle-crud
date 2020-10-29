# Motorcycle-Crud

This react application is a simple crud to manage motorcycles.

## Setup

Clone the application:
    $ git clone https://github.com/matigrzegor/motorcycle-crud.git

Get into the app directory and install dependencies:
    $ cd motorcycle-crud
	$ npm install

Install local server [packege](https://github.com/typicode/json-server):
	$ npm install -g json-server

Create `motorcycle-crud-db.json` with that data:
```json
{
  "motorcycles": [
    {
      "id": 1,
      "brand": "Honda",
      "description": "Some description"
    }
  ]
}
```
Start JSON Server with another tab:
	$ json-server --watch motorcycle-crud-db.json

Launch react application:
	$ npm start
