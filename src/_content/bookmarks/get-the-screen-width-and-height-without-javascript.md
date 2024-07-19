---
title: 'Get The Screen Width & Height Without JavaScript'
summary: 'Get the screen width and height as pixel values using a few lines of CSS.'
bookmarkExternal: https://css-tip.com/screen-dimension/
bookmarkLabel: css-tip.com
bookmarkAuthor: Temani Afif
date: 2024-07-19T14:15:04.180Z
updated: ""
location:
  locality: Crawley
  country_name: UK
category:
  - web
  - frontend
  - css
  - gems
eleventyExcludeFromCollections: false
---

Very neat and clever.

```css
@property --_w {
  syntax: '<length>';
  inherits: true;
  initial-value: 100vw;
}
@property --_h {
  syntax: '<length>';
  inherits: true;
  initial-value: 100vh;
}
:root {
  --w: tan(atan2(var(--_w),1px)); /* screen width */
  --h: tan(atan2(var(--_h),1px)); /* screen height*/
  /* The result is an integer without unit  */
}
```
