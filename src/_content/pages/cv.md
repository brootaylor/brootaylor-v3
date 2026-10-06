---
# NOTE: The roles, earlier roles and skills below are rendered from `_data/cv.js` (available in this page as `cv`).
# Edit that file to change them, not this one. The macros doing the rendering live in `components/units/cv/cv.njk`.
title: "My CV"
# Populates the `meta description` for a page
summary: "Bruce Taylor's CV. A web developer and UI engineer with 20+ years building accessible, resilient websites, with strength in design systems and component architecture."
# Populates the opening / `lead` text on a page
lead:
  - I've been building accessible, resilient websites for 20+ years, with strength in design systems and component architecture &mdash; creating consistent, scalable, tech-agnostic components that outlast any single stack.
  - I'm comfortable coaching developers and collaborating across design, engineering and business to ship high quality digital experiences.
  - Prefer a document? You're welcome to <a href="/BruceTaylorCV">download my CV as a PDF</a>.

# Also decides which structured data (schema) file is used. See `schemaMap` in `layouts/base.njk`
bodyClass: "cv"

date: 2026-10-06T17:28:25.000Z
---

{% from "components/units/cv/cv.njk" import cvRoles, cvEarlierRoles, cvSkills, cvProjects %}

## Experience

{{ cvRoles(cv.roles) }}

### Earlier roles

{{ cvEarlierRoles(cv.earlierRoles) }}

## Technical skills

{{ cvSkills(cv.skills) }}

## Personal projects

A few things I've built and shared outside of client work. There's more on [my GitHub profile](https://github.com/brootaylor).

{{ cvProjects(cv.projects) }}

## Away from the keyboard

I grew up on a dairy farm in a beautiful part of South Africa. Before getting into tech in the late '90s, I qualified as a chef and spent much of my time off-road biking, hiking, wild camping, stargazing, canoeing, fishing, drumming, and playing a bunch of team and individual sports.

Some of these things I still do. If you'd like to know more, there's [a bit more about me](/about/me), or you're welcome to [get in touch](/contact).

---

<small><em>This is the web version of my CV. It's also available as a <a href="/BruceTaylorCV">PDF download</a>.</em></small>
