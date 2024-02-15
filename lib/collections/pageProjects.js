module.exports = (collection) => {
  // Get all the projects
  let projects = collection.getFilteredByTag('projects');

  // Sort the projects by the "order" key
  projects.sort((a, b) => a.data.project.order - b.data.project.order);

  return projects;
};
