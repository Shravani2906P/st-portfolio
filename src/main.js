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

import '../styles/components/contact.css'
import { initContactForm } from "./components/contact-form";

import '../styles/components/footer.css'
import '../styles/components/mobile-nav.css'

import '../styles/utils.css'

import mobileNav from './components/mobile-nav';
import darkMode from './components/dark-mode'

const projectsGrid = document.getElementById("projects-grid");

projectsGrid.innerHTML = projects
  .map(project => ProjectCard(project))
  .join("");

initContactForm();

mobileNav();
darkMode();