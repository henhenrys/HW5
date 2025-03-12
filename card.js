import { getMyComponentCSS } from './my-component-css.js';
class MyProjects extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = getMyComponentCSS();

        const title = this.getAttribute('Title') || 'Unknown Title';
        const description = this.getAttribute('Description') || 'Unknown Description';
        const imageUrl = this.getAttribute('image-url') || '';
        const alter = this.getAttribute('alt') || '';

        this.innerHTML = '';
        this.appendChild(style);
        this.innerHTML += `
            <div class="simple-card">
                <hgroup>
                <h2 class="model">${title}</h2>
                <p class="year">${description}</p>
                </hgroup>
                <picture>
                    <img src="${imageUrl}" alt="${alter}">
                </picture>
                <a href=/${title.split(' ').join('_')}.html>Read More Here!</a>
            </div>
        `;
    }
}

customElements.define('project-card', MyProjects);