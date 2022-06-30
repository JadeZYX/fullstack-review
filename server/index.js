const express = require('express');
let app = express();
const {topRepos} = require('../database');
const db=require('../database');
const github =require('../helpers/github.js');
//cors:server-client
//bodyparser client-server in JSON
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
console.log("test",__dirname);

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
 github.getReposByUsername(req.body.username,(err,result)=>{
  if(err){
    res.status(400).send("Failed");
  }
  else{
    db.save(result).then(res.status(201).send("Success")).catch(console.log("Error"));

  }
 })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
     topRepos()
      .then((data)=>{
        res.json(data);
        //res.send(JSON.parse(data));
      })
      /*
  topRepos((err,result)=>{
  if(err){
    res.status(400).send("Couldn't get results");
  }
  else{
    res.status(200).send(result);
  }
  */
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

