# Motorcycle-Crud
  
This react application is a simple crud to manage motorcycles.
  
## Setup
  
Clone the application:
  
```bash
git clone https://github.com/matigrzegor/motorcycle-crud.git
```
  
Get into the app directory and install dependencies:
  
```bash
cd motorcycle-crud
npm install
```
  
Install local server [packege](https://github.com/typicode/json-server):
  
```bash
npm install -g json-server
```
  
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
  
```bash
json-server --watch motorcycle-crud-db.json
```
  
Launch react application:
  
```bash
npm start
```