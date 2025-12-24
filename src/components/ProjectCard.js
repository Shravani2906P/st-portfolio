export function ProjectCard({ image, title, tech, description, github, live}) {
    return `
    <article class="project-card">
        <img src="${image}" alt="${title}" class="project-card__img" />

        <div class="project-card__content">

        <div class="project-card__header">
          <h3 class="project-card__title">${title}</h3>
        </div>

        <div class="project-card__tech">
          ${tech.map(t => `<span>${t}</span>`).join("")}
        </div>

        <p class="project-card__description">${description}</p>

        <div class="project-card__buttons">
          <a href="${github}" target="_blank" class="btn btn--github">
          <svg viewBox="0 0 24 24" width="23" height="18" fill="currentColor">
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17.8 6 18.7 6.3 18.7 6.3c.6 1.5.2 2.7.1 3 .8.9 1.2 2 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/>
          </svg>
          GitHub</a>
          <a href="${live}" target="_blank" class="btn btn--live">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5Z"/>
          </svg>
          Live Demo</a>
        </div>
      </div>
    </article>
    `;
}