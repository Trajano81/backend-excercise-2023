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

// READ ALL - [GET] /items
app.get('/items', function(req, res){
  res.send(items)
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

// CREATE - [POST] /items
app.post('/items', function(req, res){
  const item=req.body.nome

  //Insert into list
  items.push(item)

  res.send("Item inserted succesfully")
})

app.listen(3000, function(){
  console.log('App running on http://localhost:3000')
})