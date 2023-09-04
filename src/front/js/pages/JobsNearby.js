import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { JobsCard } from "../component/jobscard/jobscard";

export const JobsNearby = () => {
  const { store, actions } = useContext(Context);
  const [subjects, setSubjects] = useState([]);
  const [subjectLoaded, setSubjectLoaded] = useState(false);

  useEffect(() => {
    actions.getAllSubjects();
    setSubjectLoaded(true);
  }, [store.token]);

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

const handleCityData= (job) => {

    if (job.job_city !== null) {
        return job.job_city
    }
    else return "not available"
}

const handleRemoteData= (job) => {

    if (job.job_is_remote === true) {
        return "Yes"
    }
    else return "No"
}
const handleLinkData= (job) => {

    if (job.job_apply_link !== null) {
        return job.job_apply_link
    }
    else return "Not available"
}
const handleEmployerData= (job) => {

    if (job.employer_name !== null) {
        return job.employer_name
    }
    else return "Not available"
}

  const loadJobs = async () => {
    try {
      await actions.getJobsNearby();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto d-flex flex-column justify-content-center w-80 mt-3">
      <p>{subjects}</p>
      <p className="text-white bg-danger">Trabajos cerca de ti basados en tus clases</p>
      <button onClick={loadJobs}>CARGAR DATOS DE TRABAJOS</button>
      <div className="container mx-auto mt-3">
        <div className="row d-flex flex-wrap justify-content-center gap-3">
          {store.jobs && store.jobs.length > 0 && (
            store.jobs.map((job) => (
              <div className="col md-auto" key={job.id}>
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
    </div>
  );
};
                                 
                    
     {/* <JobsCard jobTitle={handleJobTitleData} city={handleCityData} remote={handleRemoteData} link={handleLinkData} type={handleTypeData}/> */}
                    
                   
    



