
import React from "react";
import Banner from "./Banner";
import { TabTitle } from "./TabTitle";
const About = React.lazy(() => import("./About"));
const ProjectList = React.lazy(() => import("./ProjectList"));
const Skills = React.lazy(() => import("./Skills"));
const Footer = React.lazy(() => import("./Footer"));

export default function Home() {
  TabTitle('Xavier Geslin - Portfolio');
  return (
    <div id="home">
      <Banner />
      <About />
      <Skills />
      <ProjectList />
      <Footer />
    </div>
  );
}
