# Security policy

This is my personal website, built with Eleventy and deployed as static files on Netlify. It has no accounts or database. The only server-side code is a single Netlify edge function that blocks AI crawlers (`netlify/edge-functions/aiAgents.js`), and the contact form is handled by Netlify. If you spot a security problem, I'd like to hear about it.

## Supported versions

Only the live site at <https://brootaylor.com>, built from the `main` branch, is supported. There are no older versions to patch.

## Reporting a vulnerability

Please **don't open a public issue** for a security problem.

Use GitHub's private reporting instead: go to the **Security** tab of this repository and choose **Report a vulnerability**.

Things that are in scope include:

- Weaknesses in the security headers or Content Security Policy (see `netlify.toml`)
- Vulnerable dependencies that affect the built site
- Anything that lets someone run script or inject content on the site
- Abuse of the contact form, or ways around the AI crawler blocking in the edge function

## Dependency safeguards

Any install fails if a dependency's install scripts haven't been approved, and npm only installs versions that are at least 7 days old (both set in `.npmrc`). `npm audit` also runs as part of every build. The GitHub Actions used in CI are pinned to exact commits and only updated through reviewed Dependabot pull requests. If you know of a compromised package in this project's dependencies, please report it the same way.

## What to expect

This is a hobby project, so replies are best effort. I'll aim to acknowledge a report within a week and let you know what I decide. There's no bounty.
