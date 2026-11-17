# Collections

[Collection scripts](https://www.11ty.dev/docs/collections/) live in this directory. Each one is registered in `.eleventy.js` and used by a landing page in `src/_content/landings/`:

* `postWriting`, `postNotes`, `postBookmarks` and `postPhotos` list that type of post, newest first.
* `pageProjects` lists the projects in the order set by each project's `project.order` value.

The feed (`src/feed.njk`) and service worker use Eleventy's built-in `post` tag collection instead, which holds every type of post.
