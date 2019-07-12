const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 4001;


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.post('/', (req,res)=>{
    console.log(req.body.PM , " IN RASP A")
    res.send("Received your packet successfully : RASP-A");
})




app.listen(port, () => console.log(`::: Example app listening on port ${port}!`))