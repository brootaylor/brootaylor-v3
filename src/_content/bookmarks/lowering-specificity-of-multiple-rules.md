---
title: Lowering the specificity of multiple rules at once
summary: Lowering the specificity of multiple rules at once.
bookmarkExternal: https://matuzo.at/blog/2026/lowering-specificity-of-multiple-rules
bookmarkLabel: matuzo.at
bookmarkAuthor: Manuel Matuzović
date: 2026-02-01T13:41:27.631Z
updated: ""
location:
  locality: Crawley
  country_name: UK
category:
  - css
  - specificity
  - layers
  - styles
  - frontend
eleventyExcludeFromCollections: false
---

Nice tip from Manuel to use an anonymous `@layer` for the CSS reset rules, to ensure their specificity is lower than other rules.
