try {
  const colourScheme = localStorage.getItem('colour-scheme');
  if (colourScheme === 'light' || colourScheme === 'dark') {
    document.querySelector('meta[name="color-scheme"]').content = colourScheme;
  }
} catch {}
