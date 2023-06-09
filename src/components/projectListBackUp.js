import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import { Link } from "react-router-dom";
import images from '../index';
import 'react-loading-skeleton/dist/skeleton.css'
import './ProjectList.css'

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    // This method fetches the projects from the database.
    const getProjects = () => {
      fetch(`http://localhost:5050/project`)
      .then((res) => res.json())
      .then((json) => setProjects(json))
      .catch((e) => console.log(e))
  }
    useEffect(() => {
      setTimeout(() => {
        getProjects()
      }, 5000)
    }, [])

    const Project = () => {
      return (
        <>
          {projects.map((project) => {
            return (
              <Link to={`/project/${project._id}`}>
                <div className="inline-block snap-start">
                    <div className="translate-x-[calc(max(1600px,100vw)/_2_-_790px)]">
                        <div className="cardsScroller mr-5 w-[350px] sm:w-[460px] flex overflow-hidden relative rounded-2xl shadow-[0_2px_10px_-1px_rgba(0,0,0,0.1)] whitespace-normal">
                            <img src={images[`${project.images}`]} alt={project.title} loading="lazy" width="480" height="610"/>
                            <div className="absolute p-10 bottom-0">
                                <span style={{color: project.color}} className={'font-body px-3 py-1 bg-white font-black text-sm uppercase rounded-full'}>{project.tags}</span>
                                <h2 className="font-body text-white font-bold text-3xl max-w-[285px]">{project.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
              </Link>
              )
            })}
          </>
        )
      }
      const showSkeleton = () => {
        return (
          <>
            {Array(4)
              .fill()
              .map((project,index) => {
                return (
                  <div className="inline-block snap-start" key={index}>
                    <div className="translate-x-[calc(max(1600px,100vw)/_2_-_790px)]">
                        <div className="cardsScroller mr-5 w-[350px] sm:w-[460px] flex overflow-hidden relative rounded-2xl shadow-[0_2px_10px_-1px_rgba(0,0,0,0.1)] whitespace-normal">
                          <Skeleton />
                        </div>
                    </div>
                </div>
                )
              })}
          </>
        )
      }
    return(
        <section id="projects">
            <div className="container mx-auto mb-12 flex px-2.5 pt-20 flex-col items-left">
                <h1 className="flex flex-col items-start sm:flex-row sm:items-center"><span className='font-body text-grey-gx font-black text-5xl sm:text-7xl uppercase'>Projets.</span><span className='font-title text-lightGrey-gx font-regular text-2xl sm:text-4xl'>Designed with passion</span></h1>
            </div>
            <div id="scollerContent">
                <div className="w-full whitespace-nowrap inline-flex overflow-x-scroll snap-mandatory snap-x align-top overscroll-x-contain" id="scrollerPlatter">
                  {projects.length > 0 ? Project() : showSkeleton()}
                </div>
            </div>
        </section>
    );
}