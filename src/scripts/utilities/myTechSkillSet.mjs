/**
 * `<my-tech-skill-set>` custom element
 * =====================================
 *
 * Used on the About page to wrap the list of tech skills. It doesn't change anything visible
 * (the page styles it like a normal block); it's here just for fun.
 *
 * Loaded on demand from `main-modules.mjs`, only on pages that contain the element.
 */
class MyTechSkillSet extends HTMLElement {
  connectedCallback() {
    console.log(
      `The ${this.nodeName.toLowerCase()} web component has been created just for fun. Just cause I wanted to call it that. So there! 😄`,
    );
  }
}

export default function defineMyTechSkillSet() {
  // Guard against defining it twice, which would throw an error
  if (!customElements.get('my-tech-skill-set')) {
    customElements.define('my-tech-skill-set', MyTechSkillSet);
  }
}
