import htmlmin from 'html-minifier-terser';

export const minifyHtml = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: false,
      useShortDoctype: true,
    });
    return minified;
  }

  return content;
};
