// Get the current year for copyright
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date of the document
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

// Log to console for verification
console.log('Page loaded successfully');
console.log(`Current year: ${currentYear}`);
console.log(`Last modified: ${lastModified}`);