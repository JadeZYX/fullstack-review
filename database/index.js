const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //id:{type:Number,unique:true},
  repoId: Number,
  userName:String,
  repoName:String,
  starCount:Number,
  url:String
});

let Repo = mongoose.model('Repo', repoSchema);
//model name          collection name plural

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return Promise.all(repos.map(repo=>{
    return new Repo(repo).save();
  }))
  /*
  const newRepo = new Repo(repo);
  newRepo.save()
  .then(()=>(console.log("saved")))
  .catch(()=>(console.log("error")));
  */
  return Repo.insertMany(repos);
}

let topRepos=()=>{
 return Repo.find({})
     .sort('-starsCount')
     .limit(25)
     .exec()
}

module.exports.save = save;
module.exports.topRepos=topRepos;