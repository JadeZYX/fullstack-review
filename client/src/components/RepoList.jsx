import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
   <p>There are {props.repos.length} repos.</p>
   {
    props.repos.map((ele,index)=>(
      <RepoEntry repoName={ele.repoName} key={index}/>
    ))
    }
  </div>
)

export default RepoList;