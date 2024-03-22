---
title: "About"
# Populates the `meta description` for a page
summary: "Bruce is originally from South Africa and grew up on a dairy farm in a very beautiful part of the country. I now live in West Sussex, England with my family and build websites for a living."
# Populates the opening / `lead` text on a page
lead:
  - I'm originally from South Africa and grew up on a dairy farm in a very <a href="https://youtu.be/bGQbM3QfA5w" rel="external">beautiful part of the country</a>.
  - I now live in West Sussex, England with <a href="/photos/2022-03-30/photo_202203300012">my family</a> and <a href="/projects">build websites</a> for a living.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    .profile {
        max-width: 300px;
        width: auto;
    }
  </style>
"

bodyClass: "about"

date: 2024-03-22T14:51:27.631Z
---

{% from "components/core/images/images.njk" import imageNormal %}
{{ imageNormal(
  "/assets/images/pages/home/broo_profile_home.jpg",
  "Profile headshot of myself, Bruce Taylor",
  "767",
  "767",
  "img-right | profile",
  "shadow",
  "lazy")
}}

Before ever touching a computer at the end of the 90's, my life revolved around *‘teasing’* cows &mdash; *(on our dairy farm)*. Off-road motorbiking, hiking and wild camping in the mountains, stargazing, canoeing, fishing, photography, drumming, playing a bunch of team and individual sports, training as a chef, and aspiring to be a pilot.

*Maaan*, that all feels like a lifetime ago...

---

## What I do now

I'm a Frontend Web Developer and UI Engineer.

I specialise in the "[front-of-the-front-end](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/){rel=external}" &mdash; the somewhat broad and *fuzzy* intersection between design and back-end engineering. From time to time, you'll also find me tinkering around in the “*back-of-the-front-end*”.

I'm quite good at picking up new skills and programming languages, as well as problem solving. I've been fortunate enough to work with some really talented, kind and supportive people, and much of the success I've enjoyed during <span id="fnref:career" rel="doc-noteref"><a href="#fn:career" rel="footnote">my career <sup>1</sup></a></span> is thanks to them.

### My skill set

Here are some of the skills I've picked up over the 20 years I've been building websites:

<div class="call-out">
  <ul>
    <li>HTML</li>
    <li>CSS / SCSS</li>
    <li>JavaScript <small><em>(ES5 & ES6+)</em></small></li>
    <li>Responsive, Device-agnostic, and Progressively Enhanced Web Development</li>
    <li>CSS Architecture / Component-based Frontend Architecture</li>
    <li>Static Site Generators <em>(SSGs)</em> & Web frameworks <small><em>(11ty, Jekyll, Astro, Svelte, Vue)</em></small></li>
    <li>Templating languages & Libraries <small><em>(Nunjucks, Liquid, Handlebars, jQuery, Bootstrap, GSAP)</em></small></li>
    <li>Themeable Design System Configuration</li>
    <li>Web Performance Optimisation</li>
    <li>Web Accessibility</li>
    <li>Cross Browser Compatibility</li>
    <li>Data Source / <abbr title="Application Programming Interface.">API</abbr> Configuration</li>
    <li><abbr title="Content Management System.">CMS</abbr> Configuration and Integration <small><em>(WordPress, Decap CMS)</em></small></li>
    <li>JavaScript Bundlers & Deployment Tooling <small><em>(Node.js, Vite, Rollup.js, Webpack, Netlify, Azure DevOps)</em></small></li>
    <li>Version Control <small><em>(GitHub, GitLab, Bitbucket)</em></small></li>
    <li>Continuous Integration <em>(CI)</em> & Continuous Deployment <em>(CD)</em></li>
  </ul>
</div>

### My approach

I thrive in roles that ***strike a balance between user and developer experiences***, empowering teams to write great code that aligns with their needs and preferences while ensuring a positive user experience.

I try my best to build web solutions that are [resilient](https://resilientwebdesign.com/){rel=external}, [usable](https://trentwalton.com/2014/03/10/device-agnostic/){rel=external} and as future-friendly as possible. For this reason I *prefer* a vanilla approach and tend to be fairly tech-agnostic. Choosing the *right* tool for the job seems to be a better approach than using a framework for the sake of it.

---

## Web dev stuff I'm enjoying

[Eleventy](https://www.11ty.io/), [Astro](https://astro.build/), [Svelte](https://svelte.dev/), [Vite](https://vitejs.dev/), [Netlify](https://www.netlify.com/), [Decap CMS](https://decapcms.org/), [Fractal](https://fractal.build/), [Storybook](https://storybook.js.org/), [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) animation using [GreenSock](https://greensock.com/), [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), and [Utopia](https://utopia.fyi/) are proving really enjoyable to work with and have restored some of the magic of building websites again.

---

## Hobbies & other interests

I enjoy [taking photos](/photos), [reading](/reading) and am a [fairly decent drummer](/photos/2022-03-29/photo_202203292358). But, I ended up having to [sell my drumkit](/photos/2022-04-06/photo_202204062304) recently for various reasons. I miss playing *big* time and hope I'll get a chance to play again in the future... 🤞

Fly fishing for trout is something I grew up doing and continue to do. I head to the beautiful [Lakedown Trout Fishery](https://www.lakedowntroutfishery.com/){rel=external} now and then. A gorgeous and tranquil spot away from all the noise.

I absolutely adore aircraft and hope that one day I'll be able to either get my PPL or GPL.

I write now and then &ndash; and have [written a few posts](/writing), [jotted down some notes](/notes), and [bookmarked links to articles](/bookmarks) I've enjoyed and found interesting. Hopefully some of them resonate with you.

{% from "components/core/images/images.njk" import imageFigure %}
{{ imageFigure(
  "/assets/images/pages/about/giants_castle_2022.webp",
  "My mum looking at a beautiful view of the Giants Castle mountain from the Giants Castle Camp's main dining room balcony",
  "2000",
  "1125",
  'My mum looking towards Giants Castle. <abbr title="Kwazulu Natal.">KZN</abbr>, South Africa. Near to where I grew up',
  false,
  "shadow",
  "lazy")
}}

---

## About this website

This website has been the home of my personal blog for a fair few years. Everything written here represents my opinions and perspectives on various things. It *doesn't* reflect or represent the views of anyone I work for or with.

I also use it as a platform for experimenting with newer frontend web technologies & techniques &mdash; so there's every chance it may look a little 'wonky' now and then. Please forgive me if something doesn't look quite right or work properly on your screen at the moment.

I resonate with Ethan when he says, [let a website be a worry stone](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/){rel=external}. {.call-out}

If you have any issues, questions or spot any spelling mistakes(!), I'd appreciate it if you could let me know by submitting a [GitHub issue](https://github.com/brootaylor/brootaylor-v3/issues){rel=external}, or by [emailing me directly](/contact).

I've also written about my decision to [redesign & develop my website in the open](/writing/2022-02-22/redesigning-in-the-open) which has both been fun and scary. Not least because I'm a bit of a perfectionist and doing it this way has helped wean me off the need to have things completely polished before showing them.

### Crawlers & tracking

Even though it's more than likely [too late & doesn't work anyway](https://blog.jim-nielsen.com/2023/robots-txt/){rel=external}, I've attempted to opt `brootaylor.com` out of its content being used to train AI models. Known web crawlers used for training AI models are disallowed in my [<code>robots.txt</code> file](https://brootaylor.com/robots.txt).

I've also set up a machine-readable [<code>ai.txt</code> file](https://brootaylor.com/ai.txt), using [Spawning.ai's proposed format](https://site.spawning.ai/spawning-ai-txt){rel=external}. There's no real evidence that it has any traction in the land-of-the-web *yet* &mdash; but I thought why not.

More information about the technology used to make this website is available in this [<code>humans.txt</code> file](https://brootaylor.com/humans.txt).

It's probably worth mentioning that [I don't use any tracking technologies](/privacy#analytics-%26-tracking) &mdash; (*home-grown or third-party*) &mdash; to collect information about what you read or click on this website.


---

<small><em>The last production build was on: {{ site.dateTimeNow }} GMT</em></small>

<div role="doc-endnotes">
  <ol>
    <li id="fn:career" role="doc-endnote">
      <small>When I say "<em>my career</em>", it isn't something I planned or aimed at. Retrospectively, much of it has been right-place right-time kinda stuff. <a href="#fnref:career" role="doc-backlink">↩</a></small>
    </li>
  </ol>
</div>

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
