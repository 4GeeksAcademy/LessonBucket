
import React, { Component } from "react";

export const JobsCard = (props)  => (

<>
<div className="col-md-auto  card-job card-footer mx-auto" >
  <div className="card-body text-white ">
    <h5 className="card-title ">{props.jobTitle}</h5>
    <p className="my-2">Employer: {props.employer}</p>
    <p className="my-2">City: {props.city}</p>
    <p className="my-2">Remote: {props.remote}</p>
    <p className="my-2">Type: {props.type}</p>
    
    <a href={props.link} className="btn btn-primary  text-center mx-auto mt-3 w-100">Apply</a>
  </div>
</div>
</>

);