// Content for the CV page (`/cv`). Rendered by the macros in `components/units/cv/cv.njk`
// and also feeds the page's structured data (`components/chrome/schemas/schema_cv.njk`).
//
// This mirrors the PDF version of my CV (`assets/docs/cv/BruceTaylorCV.pdf`). The two are maintained
// separately, so when one changes, remember to update the other.
//
// Contact details (eg. phone number) are deliberately left out. The PDF has them, but this is a public
// web page so people are pointed to the contact page instead.
export default {
  // Recent roles, newest first. These get highlights and the tech used.
  //
  // - `start` / `end` are ISO year-month values (eg. '2024-04'), used for `<time datetime>`.
  //   The `...Label` values are what people read. A `null` / missing `end` means the role is current.
  // - `note` is optional. Used when the dates alone could mislead.
  // - `url` is optional, on both recent and earlier roles. When set, the organisation's name links to it. Use the
  //   organisation's own site where it still represents them. Otherwise link a web.archive.org snapshot from the time
  //   (eg. Hugo & Cat), or a news story explaining what happened to them (eg. Time Inc. UK).
  //
  // NOTE: The first role is treated as my current role (see `worksFor` in the structured data).
  roles: [
    {
      organisation: 'Admiral Group',
      url: 'https://www.admiralgroup.co.uk/',
      title: 'Full Stack Engineer',
      type: 'Contract, full time',
      start: '2024-04',
      startLabel: 'April 2024',
      end: null,
      highlights: [
        "Delivered UI and functional enhancements to key components and modules across Admiral Group's marketing websites.",
        'Led the technical discovery and implementation of a new Web Messenger (Genesys) solution across previously siloed applications, improving customer support and providing analytics insight.',
        "Led the audit, consolidation, and optimisation of Google Tag Manager (GTM) configurations across the Group's web estate, reducing technical debt and improving data accuracy.",
        'Strengthened GDPR (General Data Protection Regulation) compliance by supporting the Group-wide consent and cookie transformation programme, embedding Cookie Consent Management (Civic & TrustArc).',
        'Took ownership of the NGINX to Istio migration programme, supporting the wider engineering infrastructure transformation.',
        'Led knowledge-sharing sessions and technical walkthroughs, upskilling team members on GTM & custom JavaScript methods, Genesys Web Messenger, and Cookie Consent Manager integrations.',
      ],
      tech: [
        'HTML5',
        'CSS',
        'SCSS',
        'JavaScript',
        'jQuery',
        'PHP',
        'Twig',
        'Drupal',
        'SQL',
        'Gulp',
        'Vite',
        'Docker',
        'GitLab',
        'GitHub',
        'Azure DevOps Services',
        'Azure Kubernetes Services',
        'NGINX',
        'Istio',
        'Google Tag Manager (GTM)',
        'Adobe Launch Tags',
        'Figma',
        'Genesys Web Messenger',
        'Cookie Consent Management (Civic, TrustArc)',
        'Claude Code',
        'CoPilot',
      ],
    },
    {
      organisation: 'Hugo & Cat',
      // Archived, as the site no longer exists (the domain now redirects to a different company's website)
      url: 'https://web.archive.org/web/20231030073800/https://www.hugoandcat.com/',
      title: 'Senior Frontend Developer',
      type: 'Contract, full time',
      start: '2023-10',
      startLabel: 'October 2023',
      end: '2023-12',
      endLabel: 'December 2023',
      highlights: [
        'Delivered a high-performance Umbraco-based website for ECARX, contributing to an existing Storybook-driven component library alongside complex animation and interactivity.',
        'Developed frontend features using GSAP for animation and Handlebars for templating.',
      ],
      tech: [
        'HTML5',
        'CSS',
        'SCSS',
        'JavaScript',
        'GSAP',
        'Handlebars',
        'Storybook',
        'Webpack',
        'Gulp',
        'Cypress',
        'Umbraco',
        '.NET Razor Views',
        'Azure DevOps',
        'Figma',
      ],
    },
    {
      organisation: 'UX Brighton',
      url: 'https://uxbri.org/',
      title: 'Web Developer',
      type: 'Freelance, part time',
      start: '2022-02',
      startLabel: 'February 2022',
      end: '2024-03',
      endLabel: 'March 2024',
      highlights: [
        "Improved UX Brighton's user and developer experience and technical SEO, including clearer site search and filtering.",
        'Introduced a streamlined content management workflow to support non-technical contributors.',
        'Rebuilt the UX Brighton job board as a multi-page application (MPA) instead of a single-page application (SPA), improving accessibility, SEO, and shareability.',
        'Automated structured data generation at build time for job and event pages, increasing organic search visibility and SEO score.',
      ],
      tech: [
        'HTML5',
        'CSS',
        'SCSS',
        'JavaScript',
        'jQuery',
        'Jekyll',
        'Liquid',
        'JSON',
        'GitHub',
        'GitHub Pages',
        'Node.js',
        'Retool',
        'Swagger',
        'Netlify',
        'Netlify CMS',
        'Google Analytics',
        'Figma',
        'Photoshop',
      ],
    },
    {
      organisation: 'Brunswick Group',
      url: 'https://www.brunswickgroup.com/',
      title: 'Frontend Web Developer',
      type: 'Contracts',
      start: '2022-04',
      startLabel: 'April 2022',
      end: '2023-02',
      endLabel: 'February 2023',
      // The two contracts weren't back-to-back, so say so rather than imply a continuous stint.
      // (`start` / `end` span both of them.)
      note: 'In two stints: April to June 2022, and January to February 2023.',
      highlights: [
        'Integrated a headless WordPress CMS and GSAP-based animations under tight deadlines.',
        'Built and optimised brand-aligned corporate communication websites for high profile clients (Naspers / Prosus, Ariel Investments, Varo).',
      ],
      tech: [
        'HTML5',
        'CSS',
        'SCSS',
        'JavaScript',
        'jQuery',
        'Vue.JS',
        'VueX',
        'Vue Router',
        'GSAP',
        'Bootstrap 5',
        'Bitbucket',
        'WordPress (Headless CMS & Advanced Custom Fields)',
        'Umbraco',
        'Figma',
        'JIRA',
        'Confluence',
      ],
    },
  ],

  // Earlier roles, newest first. Kept brief, so `period` is a plain readable string (no `<time>`)
  // as some span multiple, non-contiguous contracts. They take the same optional `url`. One entry covering several
  // organisations uses `organisations` instead, a list of `{ name, url }`.
  earlierRoles: [
    {
      organisation: 'Currys plc',
      url: 'https://www.currysplc.com/',
      title: 'Web Developer',
      type: 'Contract',
      period: 'July 2022 – December 2022',
    },
    {
      organisation: 'IAG Loyalty',
      url: 'https://www.iagloyalty.com/',
      title: 'Senior Frontend Developer',
      type: 'Contract',
      period: 'October 2018 – October 2021',
    },
    {
      organisation: 'Euromoney',
      url: 'https://www.euromoney.com/',
      title: 'Frontend Web Developer',
      type: 'Contract',
      period: 'May 2018 – October 2018',
    },
    {
      organisation: 'MerchantCantos',
      // No site to link to. It was integrated into Brunswick Group (as Brunswick Creative), so this explains what happened to it
      url: 'https://lbbonline.com/news/merchantcantos-to-be-fully-integrated-into-brunswick-group',
      title: 'Frontend Web Developer',
      type: 'Contracts',
      period: '2017 & 2018',
    },
    {
      organisation: 'Time Inc. UK',
      // No site to link to. It became TI Media, then was acquired by Future plc, so this explains what happened to it
      url: 'https://printweek.com/articles/future-to-acquire-ti-media-for-140m',
      title: 'Frontend Web Developer',
      type: 'Contract',
      period: 'July 2016 – November 2016',
    },
    {
      organisation: 'Pegasus Public Relations',
      // Archived, as the original site no longer exists (the domain is now parked)
      url: 'https://web.archive.org/web/20160401193818/http://www.thisispegasus.co.uk/',
      title: 'Frontend Web Developer',
      type: 'Contracts',
      period: 'February – April 2016 & May – June 2016',
    },
    {
      organisation: 'Macmillan Cancer Support',
      url: 'https://www.macmillan.org.uk/',
      title: 'Frontend Web Developer',
      type: 'Contract',
      period: 'September 2015 – December 2015',
    },
    {
      organisation: 'Airmiles & Avios',
      url: 'https://www.avios.com/',
      title: 'Senior Frontend Designer & Developer / Manager',
      type: 'Permanent',
      period: 'December 2004 – September 2015',
    },
    {
      // Several organisations in one entry, so uses `organisations` (each with its own `url`) rather than `organisation`
      organisations: [
        { name: 'Boston T Party', url: 'https://bostontparty.co.za/' },
        { name: 'Charanga Music', url: 'https://charanga.com' },
        { name: 'Analog Implant Laboratory', url: 'http://analog-lab.co.uk/' },
      ],
      title: 'Various brief freelance engagements',
      type: 'Freelance',
      period: 'Between 2016 and 2022',
    },
  ],

  // Personal projects, as listed on my GitHub profile (https://github.com/brootaylor). Kept to a short, curated
  // list. Each has a `name`, a `url` and a one-line `description`.
  //
  // NOTE: The PDF version of my CV doesn't have this section, so there's nothing to keep in sync there (yet).
  projects: [
    {
      name: 'Tech-agnostic, spec-first development scaffold',
      url: 'https://github.com/brootaylor/tech-agnostic-spec-first-dev-scaffold',
      description:
        'A starter template for web projects, supporting both hand-built and AI-assisted development.',
    },
    {
      name: '"Ai" bot blocker',
      url: 'https://gist.github.com/brootaylor/cac258aca4a68746ba99036d7a4e808b',
      description:
        'A Netlify Edge Function, with supporting robots.txt and honeypot, that blocks known AI training crawlers.',
    },
    {
      name: 'Lockfile denylist scanner',
      url: 'https://gist.github.com/brootaylor/72388c711cfb3b610dde23cacd63e5ca',
      description:
        'Node scripts that check npm lockfiles against a denylist, protecting projects from compromised packages.',
    },
    {
      name: 'Service worker',
      url: 'https://gist.github.com/brootaylor/c039f2413874d6b0c399038d6aeaa5cb',
      description:
        'An offline-capable service worker, as an Eleventy (Nunjucks) template and as vanilla JavaScript.',
    },
    {
      name: 'Experimental playground (Astro)',
      url: 'https://github.com/brootaylor/brootaylor-astro-v1',
      description:
        'A playground for testing web development ideas, techniques and features, built on Astro.',
    },
    {
      name: 'This website',
      url: 'https://github.com/brootaylor/brootaylor-v3',
      description:
        'The open source codebase behind this site, built with Eleventy and Nunjucks.',
    },
  ],

  // Skills grouped by category. Every item here is also listed in the structured data's `knowsAbout`.
  skills: [
    {
      label: 'Core Frontend',
      items: ['HTML', 'CSS (SCSS & LESS)', 'JavaScript (ES5 & ES6+)'],
    },
    {
      label: 'Frameworks & Static Site Generators',
      items: ['11ty', 'Astro', 'Jekyll', 'Svelte', 'Vue'],
    },
    {
      label: 'Templating & Libraries',
      items: [
        'Nunjucks',
        'Liquid',
        'Handlebars',
        'jQuery',
        'Bootstrap',
        'Foundation',
        'GSAP',
      ],
    },
    {
      label: 'Build & Workflow',
      items: [
        'Vite',
        'Rollup.js',
        'Webpack',
        'Gulp',
        'PostCSS',
        'Babel',
        'Jest',
        'Cypress',
      ],
    },
    {
      label: 'Version Control & DevOps',
      items: [
        'Git',
        'Bitbucket',
        'Monorepos',
        'Netlify',
        'Docker',
        'Azure DevOps',
      ],
    },
    {
      label: 'CMS',
      items: ['WordPress', 'Drupal', 'Umbraco', 'Decap CMS', 'Contentful'],
    },
    {
      label: 'Back-end & API',
      items: [
        'PHP',
        'Twig',
        'MySQL',
        'Node.js',
        'Data Source / API Configuration',
      ],
    },
    {
      label: 'Component Libraries & Design Systems',
      items: [
        'Fractal',
        'Storybook',
        'Design Tokens',
        'Design System Configuration',
      ],
    },
    {
      label: 'Dev & Design Tools',
      items: [
        'VS Code',
        'Cursor',
        'Claude Code',
        'Codex',
        'CoPilot',
        'Postman',
        'iTerm',
        'Photoshop',
        'Figma',
        'Zeplin',
      ],
    },
    {
      label: 'Frontend Architecture & Standards',
      items: [
        'Tech-agnostic Component-based Frontend Architecture',
        'CSS Architecture',
      ],
    },
    {
      label: 'Best Practices',
      items: [
        'Responsive Design',
        'Progressive Enhancement',
        'PWA',
        'Accessibility / A11y',
        'Cross-Browser Compatibility Testing',
        'Web Components',
        'Service Workers',
      ],
    },
    {
      label: 'SEO, Performance & Compliance',
      items: [
        'Technical & Content-based SEO',
        'Performance optimisation',
        'Lighthouse Auditing',
        'Cookie Consent Management (Civic, TrustArc)',
        'GDPR Setup',
      ],
    },
    {
      label: 'Analytics',
      items: ['Google Analytics', 'Google Tag Manager', 'Adobe Launch Tags'],
    },
  ],
};
