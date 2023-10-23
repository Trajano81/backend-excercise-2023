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
const items = [
  {
    id:1,
    name:'Java',
    imageUrl:'https://salvatore.academy/devmon/1_java.png'
  },
  {
    id:2,
    name:'Kotlin',
    imageUrl:'https://salvatore.academy/devmon/2_kotlin.png'
  }

]

// CREATE - [POST] /items
app.post('/items', function(req, res){
  const item=req.body

  //Request body validated to guarantee
  //the correct properties
  if (!item || !item.name || !item.imageUrl ){
    return res.status(400).send({
      message: "name and imageUrl are required"
    })
  }
  //Create the id for the new object considering
  //the length of the list
  item.id=items.length+1

  //Insert into list
  items.push(item)

  // res.send("Item inserted succesfully")
  // Whehn working with objects is better to return the object
  res.status(201).send(item)
})

// READ ALL - [GET] /items
app.get('/items', function(req, res){
  res.send(items.filter(Boolean))
})

// READ BY ID - [GET] /items/:id
app.get("/items/:id", function(req, res){
  //Access the path parameter ID
  //Substracting one 
  const id= +req.params.id //+ is to transform the id into number

  // Access the item from the list
  const item= items.find(function(element){
    return element.id===id
  })

  //Show item value
  res.send(item)
})

// UPDATE - [PUT] /items/:id
app.put("/items/:id", function(req, res){
  //Access the path parameter and fix the index
  const id = +req.params.id
  
  //Obtain the new item from the request body
  const newItem = req.body

  //Set new item in a previous position
  const index = items.findIndex(function(element){
    return element.id===id
  })
  // Clone all the properties and
  // keep the id from the object
  items[index] = {
    ...newItem, // 3 points clone element
    id
  }

  //Send a success message
  res.send(items[index])
})

// DELETE - [DELETE] /items/:id
app.delete("/items/:id", function(req, res){
  //Access the path parameter and fix the index
  const id = +req.params.id
  //Find the index from the items list
  const index=items.findIndex(function(element){
    return element.id===id
  })
  // Deleting item with id
  delete items[index]
  //Send a success message
  res.send("Item deleted succesfully")
})



app.listen(3000, function(){
  console.log('App running on http://localhost:3000')
})