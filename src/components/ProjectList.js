import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from '../index';


const Project = (props) => (
  <Link to={`/project/${props.project._id}`}>
    <div className="inline-block snap-start" role="listitem">
        <div className="translate-x-[calc(max(1600px,100vw)/_2_-_790px)]">
            <div className="cardsScroller mr-5 w-[350px] sm:w-[460px] flex overflow-hidden relative rounded-2xl shadow-[0_2px_10px_-1px_rgba(0,0,0,0.1)] whitespace-normal">
                <img src={images[`${props.project.images}`]} alt={props.project.title} loading="lazy" width="480" height="610"/>
                <div className="absolute p-10 bottom-0">
                    <span style={{color: props.project.color}} className={'font-body px-3 py-1 bg-white font-black text-sm uppercase rounded-full'}>{props.project.tags}</span>
                    <h2 className="font-body text-white font-bold text-3xl max-w-[285px]">{props.project.title}</h2>
                </div>
            </div>
        </div>
    </div>
  </Link>
);

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    // This method fetches the projects from the database.
    useEffect(() => {
      async function getProjects() {
        const response = await fetch(`https://portfolio-xavier-backend.onrender.com/project`);
   
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
   
        const projects = await response.json();
        setProjects(projects);
      }
   
      getProjects();
   
      return;
    }, [projects.length]);
  
   
    // This method will map out the projects on the table
    function projectList() {
      return projects.map((project) => {
        return (
          <Project
            project={project}
            key={project._id}
          />
        );
      });
    }


    return(
        <section id="projects">
            <div className="container mx-auto mb-12 flex px-2.5 pt-20 flex-col items-left">
                <h1 className="flex flex-col items-start sm:flex-row sm:items-center"><span className='font-body text-grey-gx font-black text-5xl sm:text-7xl uppercase'>Projets.</span><span className='font-title text-lightGrey-gx font-regular text-2xl sm:text-4xl'>Designed with passion</span></h1>
            </div>
            <div id="scollerContent">
                <div className="w-full whitespace-nowrap inline-flex overflow-x-scroll snap-mandatory snap-x align-top overscroll-x-contain" id="scrollerPlatter" role="list">
                  {projectList()}
                </div>
            </div>
        </section>
    );
}
