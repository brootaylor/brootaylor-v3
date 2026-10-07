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

Every build scans `package-lock.json` against a denylist of known-bad npm packages (`.known-bad.locklist`, checked by `scan-locks.mjs`) and fails if anything matches. A second check (`check-locklist-review.mjs`) warns if that list hasn't been reviewed in the last week, and `npm audit` runs as part of the build. If you know of a compromised package that's missing from the list, please report it the same way.

## What to expect

This is a hobby project, so replies are best effort. I'll aim to acknowledge a report within a week and let you know what I decide. There's no bounty.
