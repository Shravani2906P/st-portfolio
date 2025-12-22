export function ProjectCard({ image, title, type, tech, description, link}) {
    return `
    <article class="project-card">
        <img src="${image}" alt="${title}" class="project-card__img" />

        <div class="project-card__content">
        <span class="project-card__type">${type}</span>

        <div class="project-card__header">
          <h3 class="project-card__title">${title}</h3>

          <a
            class="project-card__link"
            href="${link}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
             <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>

        <div class="project-card__tech">
          ${tech.map(t => `<span>${t}</span>`).join("")}
        </div>

        <p class="project-card__description">${description}</p>
      </div>
    </article>
    `;
}