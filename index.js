const express = require('express')
const app = express()

// The body from thr request is always json
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/oi', function (req, res) {
  res.send('Olá Mundo')
})

// CRUD list of creatures
const items = ['java','android','kotlin']

// CREATE - [POST] /items
app.post('/items', function(req, res){
  const item=req.body.nome

  //Insert into list
  items.push(item)

  res.send("Item inserted succesfully")
})

// READ ALL - [GET] /items
app.get('/items', function(req, res){
  res.send(items.filter(Boolean))
})

// READ - [GET] /items/:id
app.get("/items/:id", function(req, res){
  //Access the path parameter ID
  //Substracting one 
  const id= req.params.id - 1

  // Access the item from the list
  const item=items[id]

  //Show item value
  res.send(item)
})

// UPDATE - [PUT] /items/:id
app.put("/items/:id", function(req, res){
  //Access the path parameter and fix the index
  const id = req.params.id - 1
  
  //Obtain the new item from the request body
  const newItem = req.body.name

  //Set new item in a previous position
  items[id] = newItem

  //Send a success message
  res.send("Items updated by id, succesfully")
})

// DELETE - [DELETE] /items/:id
app.delete("/items/:id", function(req, res){
  //Access the path parameter and fix the index
  const id = req.params.id - 1
  // Deleting item with id
  delete items[id]
  //Send a success message
  res.send("Item deleted succesfully")
})



app.listen(3000, function(){
  console.log('App running on http://localhost:3000')
})