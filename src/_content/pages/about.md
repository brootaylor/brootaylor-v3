---
title: "About"
# Populates the `meta description` for a page
summary: "Bruce is originally from South Africa and grew up on a dairy farm in a very beautiful part of the country. He now lives in England with his family and builds websites for a living."
# Populates the opening / `lead` text on a page
lead:
  - I'm originally from South Africa and grew up on a dairy farm in a very <a href="https://youtu.be/bGQbM3QfA5w">beautiful part of the country</a>.
  - I now live in England with <a href="/photos/2022-03-30/photo_202203300012">my family</a> and <a href="/projects">build websites</a> for a living.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    .profile {
        max-width: 300px;
        width: auto;
    }

    .full-bleed ul {
      columns: 2 300px;
      column-gap: 2.5em;
      max-width: inherit;
    }

    .full-bleed p {
      max-width: inherit;
    }
  </style>
"

bodyClass: "about"

date: 2025-05-09T19:08:27.631Z
---

<img src="/assets/images/pages/about/broo_profile_about_bw.jpg" alt="Profile headshot of myself, Bruce Taylor." width="800" height="1000" class="img-normal | img-right | profile | shadow" loading="lazy" decoding="async">

## The work I do

I’m a front-end web developer, ui engineer/designer and generalist &mdash; *meaning I also do some visual design, back-end, and devops if needs be*.

All things impacting the user experience on the web matters to me. This is where I'm most comfortable and where I've ended up specialising. Which is why you'll mostly find me tinkering around in the "[front-of-the-front-end](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/)" &mdash; the somewhat broad and *fuzzy* intersection between design and back-end engineering.

I'm quite good at picking up new skills and programming languages, as well as problem solving. I've been fortunate enough to work with some really talented, kind and supportive people over the years, and much of the success I've enjoyed during <span id="fnref:career" rel="doc-noteref"><a href="#fn:career" rel="footnote">my career <sup>1</sup></a></span> is thanks to them.

### Am I a "[full-stack] developer"?

I've resisted calling myself a "[[full-stack] developer](https://bradfrost.com/blog/post/full-stack-developers/)" &mdash; regardless of what some of my roles and experience may indicate. I do know how to do full-stack development, not because I've necessarily wanted to, but <span id="fnref:fullstack" rel="doc-noteref"><a href="#fn:fullstack" rel="footnote">because I've had to <sup>2</sup></a></span>.

---

## My technical skill set

Some of the technical skills I've picked up over the 21 years I've been building websites:

<div class="full-bleed | call-out | flow">
  <ul>
    <li>HTML, CSS, SCSS, LESS, JavaScript <small><em>(ES5 & ES6+)</em></small></li>
    <li>Static Site Generators <em>(SSGs)</em> & Web frameworks <small><em>(11ty, Jekyll, Astro, Svelte, Vue)</em></small></li>
    <li>Templating languages & Libraries <small><em>(Nunjucks, Liquid, Handlebars, jQuery, Bootstrap, GSAP)</em></small></li>
    <li>Design tools & UI component library builders <small><em>(Photoshop, Figma, Zeplin, Fractal, Storybook)</em></small></li>
    <li>Responsive, Device-agnostic, and Progressively Enhanced Web Development</li>
    <li>CSS Architecture / Component-based Frontend Architecture</li>
    <li>Themeable Design System Configuration</li>
    <li>Web Performance Optimisation</li>
    <li>Web Accessibility</li>
    <li>Cross Browser Compatibility</li>
    <li>Data Source / <abbr title="Application Programming Interface.">API</abbr> Configuration</li>
    <li><abbr title="Content Management System.">CMS</abbr> Configuration and Integration <small><em>(WordPress, Decap CMS)</em></small></li>
    <li>JavaScript Bundlers & Deployment Tooling <small><em>(Vite, Rollup.js, Webpack, Netlify, Docker, Azure DevOps)</em></small></li>
    <li>Back-end & <em>"back-of-the-frontend"</em> <small><em>(PHP, Twig, Node.js)</em></small></li>
    <li>Version Control <small><em>(GitHub, GitLab, Bitbucket)</em></small></li>
    <li>Continuous Integration <em>(CI)</em> & Continuous Deployment <em>(CD)</em></li>
    <li>Analytics <small><em>(Google Analytics, Google Tag Manager)</em></small></li>
  </ul>
  <h3 id="cv" tabindex="-1" class="visually-hidden">Need a copy of my CV? <a class="header-anchor" href="#cv">#</a></h3>
  <p><small><em>(Need to see a copy of my CV for some reason? You're welcome to <a href="/BruceTaylorCV">download a copy</a>.)</em></small></p>
</div>

---

## A little more about me

If you're interested, here's a bit of a longer read on [who I am personally](/about/me).

---

## About this website

This website has been the home of my personal blog for a fair few years. Everything written here represents my opinions and perspectives on various things. It *doesn't* reflect or represent the views of anyone I work for or with.

I also use it as a platform for experimenting with newer frontend web technologies & techniques &mdash; so there's every chance it may look a little 'wonky' now and then. Please forgive me if something doesn't look quite right or work properly on your screen at the moment.

I resonate with Ethan when he says, [let a website be a worry stone](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/). {.call-out}

If you have any issues, questions or spot any spelling mistakes(!), I'd appreciate it if you could let me know by submitting a [GitHub issue](https://github.com/brootaylor/brootaylor-v3/issues), or by [emailing me directly](/contact).

I've also written about my decision to [redesign & develop my website in the open](/writing/2022-02-22/redesigning-in-the-open) which has both been fun and scary. Not least because I'm a bit of a perfectionist and doing it this way has helped wean me off the need to have things completely polished before showing them.

### &ldquo;Ai&rdquo; crawlers and tracking

Even though it's more than likely [too late & doesn't work anyway](https://blog.jim-nielsen.com/2023/robots-txt/), I attempted to opt `brootaylor.com` out of its content being used to train AI models. By disallowing known web crawlers used for training AI models in my [<code>robots.txt</code> file](https://brootaylor.com/robots.txt).

I wrote a bit about this initial approach to [opting out of "Ai" crawlers](/writing/2025-01-01/robots-txt) &mdash; but soon realised this wasn't going to work in the slightest. So I decided to try a different approach by [*attempting*] to make it trickier for them to scrape my content.

[I wrote about this](/writing/2025-01-05/ai-bot-blocker) and you're welcome to nick the code and use it on your website if you think it'll work for you.

This all really does feel like a game of whack-a-mole though.

I also added an ["Ai" *'manifesto'* page](/ai) in an attempt to put a stake in the ground &mdash; *(for my website anyhow)* &mdash; and to let folks know that nothing published on this website and on my blog was written by an "Ai".

It's probably worth mentioning that [I don't use any tracking technologies](/privacy#analytics-%26-tracking) &mdash; (*home-grown or third-party*) &mdash; to collect information about what you read or click on this website.

---

More information about the technology used to make this website is available in this [<code>humans.txt</code> file](https://brootaylor.com/humans.txt).


---

<div role="doc-endnotes">
  <ol>
    <li id="fn:career" role="doc-endnote">
      <small>When I say "<em>my career</em>", it isn't something I planned or aimed at. Retrospectively, much of it has been <em>right-place-right-time</em> kinda stuff &mdash; and fortunate enough to have been around some talented, kind and supportive people. <a href="#fnref:career" role="doc-backlink">↩</a></small>
    </li>
    <li id="fn:fullstack" role="doc-endnote">
      <small>I resonate with <a href="https://www.ellyloel.com/blog/front-end-development-s-identity-crisis/#:~:text=I%20know%20how%20to%20do%20full%2Dstack%20development%2C%20not%20because%20I%20wanted%20to%20but%20because%20I%20had%20to.%20My%20title%20was%20%E2%80%9Cdeveloper%E2%80%9D%2C%20as%20was%20everyone%20else%E2%80%99s.%20According%20to%20our%20titles%20there%20were%20no%20front%2Dend%20or%20back%2Dend%20developers.%20We%20had%20to%20do%20it%20all.">Elly Loel's sentiment on this</a>. <a href="#fnref:fullstack" role="doc-backlink">↩</a></small>
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
