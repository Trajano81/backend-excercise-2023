const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/oi', function (req, res) {
  res.send('Olá Mundo')
})


app.listen(3000, function(){
  console.log('App running on http://localhost:3000')
})