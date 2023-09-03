import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { JobsCard } from "../component/jobscard/jobscard";

export const JobsNearby = () => {
    const { store, actions } = useContext(Context);
    const [jobsData, setJobsData] = useState([{}])
    const [subjects, setSubjects]= useState([])
    const [subjectLoaded, setSubjectLoaded] = useState(false)


    // console.log(jobsData[0].job_apply_link, jobsData[0].job_title, jobsData[0].job_employment_type, jobsData[0].job_city)
    console.log(jobsData)
    console.log(jobsData[0])
    
    useEffect(() => {
		actions.getAllSubjects()
        setJobsData(store.jobs)
       setSubjectLoaded(true)
	}, [store.token]);

    useEffect(() => {
		setJobsData(store.jobs)
	}, [store.jobs]);

   
    const handleJobTitleData = () => {

        if (jobsData.job_title !== null) {
            return jobsData.job_title
        }
        else return "not available"
        
    }
   
    const handleTypeData = () => {

        if (jobsData.job_employment_type !== null) {
            return jobsData.job_employment_type
        }
        else return "not available"
    }

    const handleCityData= () => {

        if (jobsData.job_city !== null) {
            return jobsData.job_city
        }
        else return "not available"
    }

    const handleRemoteData= () => {

        if (jobsData.job_is_remote === true) {
            return "Yes"
        }
        else return "No"
    }
    const handleLinkData= () => {

        if (jobsData.job_apply_link !== null) {
            return jobsData.job_apply_link
        }
        else return "Not available"
    }
    const handleEmployerData= () => {

        if (jobsData.employer_name !== null) {
            return jobsData.employer_name
        }
        else return "Not available"
    }




    return (
        < div className="mx-auto d-flex flex-column justify-content-center w-80 mt-3  ">
            <p>{subjects}</p>
            <p className="text-white bg-danger">Jobs near you based on your classes</p>
            <button onClick={actions.getJobsNearby}>CARGAR DATOS DE TRABAJOS</button>
            <div className="container mx-auto mt-3">
                <div className="row d-flex flex-wrap justify-content-center gap-3">
                 { jobsData.map(jobsData => (
                <div className="col md-auto" key={jobsData.job_id}>
                  <JobsCard
                    jobTitle={handleJobTitleData}
                    city={handleCityData}
                    remote={handleRemoteData}
                    link={handleLinkData}
                    type={handleTypeData}
                    employer={handleEmployerData}
                   
                  />
                </div>
              ))
                    }   
               
                    
                    
                    
                    {/* <JobsCard jobTitle={handleJobTitleData} city={handleCityData} remote={handleRemoteData} link={handleLinkData} type={handleTypeData}/> */}
                    
                   
                </div>
            </div>
        </div>

    )

  

}

