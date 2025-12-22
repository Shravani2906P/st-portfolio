import '../styles/modern-normalise.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/hero.css'
import '../styles/components/about.css'
import '../styles/components/featured.css'

import "./components/project-card.css";
import "./components/projects.css";

import { projects } from "./data/projects";
import { ProjectCard } from "./components/ProjectCard";

import '../styles/utils.css'

const projectsGrid = document.getElementById("projects-grid");

projectsGrid.innerHTML = projects
  .map(project => ProjectCard(project))
  .join("");