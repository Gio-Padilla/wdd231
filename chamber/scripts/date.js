// dates

// Get the current year
const currentYear = new Date().getFullYear();

// Get the last time the document was modified
const lastModified = new Date(document.lastModified).toString();

// Insert it into the HTML by ID
document.getElementById("currentYear").textContent = currentYear;
document.getElementById("lastModified").textContent = `Last Updated: ${lastModified}`;