---
title: "About"
# Populates the `meta description` for a page
summary: "Bruce is originally from South Africa and grew up on a dairy farm in a very beautiful part of the country. He now lives in the south east of England with his family and builds websites for a living."
# Populates the opening / `lead` text on a page
lead:
  - I'm originally from South Africa and grew up on a dairy farm in a very <a href="https://youtu.be/bGQbM3QfA5w" rel="external">beautiful part of the country</a>.
  - I now live in the south east of England with <a href="/photos/2022-03-30/photo_202203300012">my family</a> and <a href="/projects">build websites</a> for a living.
  - If you're interested, here's a <a href="/about/me">bit more about me</a>.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    .profile {
        max-width: 300px;
        width: auto;
    }

    /* Custom element */
    my-tech-skill-set {
      display: block;
    }

    .full-bleed ul {
      columns: 2 300px;
      column-gap: 2.5em;
      max-width: inherit;
    }

    .full-bleed p {
      max-width: inherit;
    }
  </style>"

# Page-specific JS added just before the closing `</body>`
foot: "
  <script type=\"module\">
    class MyTechSkillSet extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        console.log(`The ${this.nodeName.toLowerCase()} web component has been created just for fun. Just cause I wanted to call it that. So there! 😄`);
      }
    }
    customElements.define('my-tech-skill-set', MyTechSkillSet);
  </script>"

bodyClass: "about"

date: 2026-09-19T13:27:27.631Z
---

{% from "components/core/images/images.njk" import imageFigure %}
{{ imageFigure(
  "/assets/images/pages/about/broo_profile_about.jpg",
  "Profile headshot of myself, Bruce Taylor",
  "800",
  "1000",
  "Tis me 👋",
  "img-normal | img-right | profile",
  "shadow",
  "lazy")
}}

## The work I do

I’m a web developer and UI engineer at heart, though I can turn my hand to visual design, back-end, and devops work when a project calls for it.

Anything that impacts the user experience on the web matters to me. This is where I’m most comfortable and where I’ve naturally ended up specialising. As a result, you’ll mostly find me tinkering around in the “[front-of-the-front-end](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/){rel="external"}” &mdash; the somewhat broad and slightly *fuzzy* intersection between design and back-end engineering.

I have experience creating frontend solutions that support design systems and design token architecture, ensuring components are consistent, scalable, and themeable &mdash; without tying developers to any single tech stack. It’s work I really enjoy and would like to do more of. To me, a good design system should be a stable foundation: flexible and tech-agnostic enough to remain useful as technologies come and go.

In short, I try my best to build web solutions that are [resilient](https://resilientwebdesign.com/){rel="external"}, [usable](https://trentwalton.com/2014/03/10/device-agnostic/){rel="external"} and as future-friendly as possible.

I’m fairly quick at picking up new skills and programming languages, and I enjoy problem solving. I’ve been fortunate to work with some really talented, kind, and supportive people over the years, and much of the success I’ve enjoyed in <span id="fnref:career" rel="doc-noteref"><a href="#fn:career" rel="footnote">my career <sup>1</sup></a></span> is thanks to them. You can read some of the [nice things they've said](/projects#projects-testimonials) too.

### Am I a "[full-stack] developer"?

I mostly resist calling myself a "[[full-stack] developer](https://bradfrost.com/blog/post/full-stack-developers/){rel="external"}" &mdash; regardless of what some of my roles and experience may indicate.

However I do know how to do full-stack development. Not because I've always necessarily wanted to, but <span id="fnref:fullstack" rel="doc-noteref"><a href="#fn:fullstack" rel="footnote">because I've often *'had'* to <sup>2</sup></a></span>.

Chris Coyier's article "[The Great Divide Was Indeed Divisive](https://chriscoyier.net/2023/01/12/the-great-divide-was-indeed-divisive/){rel="external"}" resonates with me when trying to make sense of all this job labelling malarkey.

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote(author='Chris Coyier', style='call-out') -%}
  Since there is too much for any web developer to know, what is the most graceful and professionally acceptable way of not knowing things?

  Whatever the answer is, it’s definitely not “ignore, shit on, and downplay the things you don’t know and gatekeep the things you do.”
{%- endcall %}

### Skills & toolbox

<details class="full-bleed">
  <summary>Technical skills picked up over the last 20+ years building for the web&hellip;</summary>
  <my-tech-skill-set class="full-bleed | call-out | flow">
    <ul>
      <li><strong>Core Frontend</strong>: HTML, CSS <small><em>(SCSS & LESS)</em></small>, JavaScript <small><em>(ES5 & ES6+)</em></small></li>
      <li><strong>Frameworks & Static Site Generators</strong>: 11ty, Astro, Jekyll, Svelte, Vue</li>
      <li><strong>Templating & Libraries</strong>: Nunjucks, Liquid, Handlebars, jQuery, Bootstrap, Foundation, GSAP</li>
      <li><strong>Build & Workflow</strong>: Vite, Rollup.js, Webpack, Gulp, PostCSS, Babel, Jest, Cypress</li>
      <li><strong>Version Control & DevOps</strong>: Git, Bitbucket, Monorepos, Netlify, Docker, Azure DevOps Services, Azure Kubernetes Services</li>
      <li><abbr title="Content Management System."><strong>CMS</strong></abbr>: WordPress, Drupal, Umbraco, Decap CMS, Contentful</li>
      <li><strong>Back-end &</strong> <abbr title="Application Programming Interface."><strong>API</strong></abbr>: PHP, Twig, MySQL, Node.js, Data Source / <abbr title="Application Programming Interface.">API</abbr> Configuration</li>
      <li><strong>Component Libraries & Design Systems</strong>: Fractal, Storybook, Design Tokens, Design System Configuration</li>
      <li><strong>Dev & Design Tools</strong>: VS Code, Cursor, Claude Code, Codex, CoPilot, Postman, iTerm, Photoshop, Figma, Zeplin</li>
      <li><strong>Frontend Architecture & Standards</strong>: Tech-agnostic component-based Frontend Architecture, CSS Architecture</li>
      <li><strong>Best Practices</strong>: Responsive Design, Progressive Enhancement, <abbr title="Progressive Web Apps.">PWA</abbr>, Accessibility / A11y, Cross-Browser Compatibility Testing, Web Components, Service Workers</li>
      <li><abbr title="Search Engine Optimisation."><strong>SEO</strong></abbr><strong>, Performance & Compliance</strong>: Technical & Content-based <abbr title="Search Engine Optimisation.">SEO</abbr>, Performance optimisation, Lighthouse Auditing, Cookie Consent Management <small><em>(Civic, TrustArc)</em></small>, <abbr title="General Data Protection Regulation.">GDPR</abbr> Setup</li>
      <li><strong>Analytics</strong>: Google Analytics, Google Tag Manager, Adobe Launch Tags</li>
    </ul>
    <h3 id="cv" tabindex="-1" class="visually-hidden">Need a copy of my CV? <a class="header-anchor" href="#cv">#</a></h3>
    <p><small><em>(Need to see my CV for some reason? You're welcome to <a href="/BruceTaylorCV">download a copy</a>.)</em></small></p>
  </my-tech-skill-set>
</details>

---

## About this website

This site has been home to my personal blog for a fair few years. Everything written here reflects my own opinions and perspectives &mdash; it *doesn't* represent the views of anyone I work for or with.

I also use it to experiment with newer frontend techniques, so expect the odd rough edge now and then. I wrote about my decision to [redesign & develop it in the open](/writing/2022-02-22/redesigning-in-the-open), which has been equal parts fun and scary for a recovering perfectionist.

I resonate with Ethan when he says, [let a website be a worry stone](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/){rel="external"}. {.call-out}

If you spot an issue, a question, or a typo(!), I'd appreciate it if you could let me know by submitting a [GitHub issue](https://github.com/brootaylor/brootaylor-v3/issues){rel="external"}, or by [emailing me directly](/contact).

I don't use any tracking technologies on this site &mdash; more on that [in my privacy policy](/privacy#analytics-%26-tracking). I've also had a go at [opting AI training crawlers out](/ai) of this site. If you're curious about the tech stack this website is built with, take a look at its [<code>humans.txt</code> file](/humans.txt).

---

<div role="doc-endnotes">
  <ol>
    <li id="fn:career" role="doc-endnote">
      <small>When I say "<em>my career</em>", it isn't something I planned or aimed at. Retrospectively, much of it has been <em>right-place-right-time</em> kinda stuff &mdash; and fortunate enough to have been around some talented, kind and supportive people. <a href="#fnref:career" role="doc-backlink">↩</a></small>
    </li>
    <li id="fn:fullstack" role="doc-endnote">
      <small>I resonate with <a href="https://www.ellyloel.com/blog/front-end-development-s-identity-crisis/#:~:text=I%20know%20how%20to%20do%20full%2Dstack%20development%2C%20not%20because%20I%20wanted%20to%20but%20because%20I%20had%20to.%20My%20title%20was%20%E2%80%9Cdeveloper%E2%80%9D%2C%20as%20was%20everyone%20else%E2%80%99s.%20According%20to%20our%20titles%20there%20were%20no%20front%2Dend%20or%20back%2Dend%20developers.%20We%20had%20to%20do%20it%20all." rel="external">Elly Loel's sentiment on this</a>. <a href="#fnref:fullstack" role="doc-backlink">↩</a></small>
    </li>
  </ol>
</div>

<small><em>The last production build was on: {{ site.dateTimeNow }} GMT</em></small>

*[PWAs]: Progressive Web Apps.
*[SSGs]: Static Site Generators.
*[SEO]: Search Engine Optimisation.
*[CMS]: Content Management System.
*[API]: Application Programming Interface.
*[PPL]: Private Pilot Licence.
*[GPL]: Glider Pilot Licence.
*[CI]: Continuous Integration.
*[CD]: Continuous Deployment.
*[BTW]: By the way.
*[KZN]: Kwazulu Natal
