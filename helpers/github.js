const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username,callback) => {
   // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  axios(options)
      .then(function(response){
        //console.log(response.data);
        let repos =  response.data.map(repo=>{
        return {
         repoId:repo.id,
         userName:repo.owner.login,
         repoName:repo.name,
         starCount:repo.stargazers_count
        }
        });
        callback(null,repos)
      })
      .catch((err)=>{
        console.log(err);
        callback(err,null);
      } );


}

module.exports.getReposByUsername = getReposByUsername;
