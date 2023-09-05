import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { JobsCard } from "../component/jobscard/jobscard";
import '../../styles/index.scss'

export const JobsNearby = () => {
  const { store, actions } = useContext(Context);
  const subject = store.allSubjects
  const [classSubject, setClassSubject] = useState([])
  const [loaded, setLoaded] = useState("loadedEmpty")
  const [select, setSelect] = useState('')
 

  useEffect(() => {
    actions.getAllSubjects();
    setLoaded("fullLoaded")
  }, []);


  useEffect(() => {
    console.log(classSubject)
  }, [classSubject]);



  const handleJobTitleData = (job) => {
    if (job.job_title !== null) {
      return job.job_title;
    } else {
      return "Not available";
    }
  };

  const handleTypeData = (job) => {

    if (job.job_employment_type !== null) {
      return job.job_employment_type
    }
    else return "not available"
  }

  const handleCityData = (job) => {

    if (job.job_city !== null) {
      return job.job_city
    }
    else return "not available"
  }

  const handleRemoteData = (job) => {

    if (job.job_is_remote === true) {
      return "Yes"
    }
    else return "No"
  }
  const handleLinkData = (job) => {

    if (job.job_apply_link !== null) {
      return job.job_apply_link
    }
    else return "Not available"
  }
  const handleEmployerData = (job) => {

    if (job.employer_name !== null) {
      return job.employer_name
    }
    else return "Not available"
  }

  const loadJobs = async (subj) => {
    
    try {
      await actions.getJobsNearby(subj);
    } catch (error) {
      console.error(error);
    }
  };


  const handleChange = event => {
    console.log(event.target.value);
    setSelect(event.target.value);
    loadJobs(event.target.value)
  };


  const jobsDesplegable =    (<select value={select} className="form-select w-25 mx-auto my-4" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                             <option selected>Open this select menu</option>
                             {store.allSubjects?.length>0? store.allSubjects.map((item) => <option value={item.Subject} >{item.Subject}</option>) : 'Cargando...'}
                             </select>)
    
   
     console.log(classSubject)
  



  return (
    <div className="mx-auto d-flex flex-column justify-content-center w-80 mt-3">
  
      <p className="text-white  text-center">Select a subject to find jobs near you based in your classes</p>
    
      {jobsDesplegable}
      <div className="row d-flex flex-wrap justify-content-center gap-3 mx-auto">
      {store.jobs && store.jobs.length > 0 && (
    store.jobs.map((job) => (
      
      <div className="jobsCardContainer col-4  p-0 my-3 mx-3 " key={job.id}>
       
        <JobsCard
          jobTitle={handleJobTitleData(job)}
          city={handleCityData(job)}
          remote={handleRemoteData(job)}
          link={handleLinkData(job)}
          type={handleTypeData(job)}
          employer={handleEmployerData(job)}
          
        />
      </div>
      
    ))
  )}
     
     </div>
    </div>
  );
};









