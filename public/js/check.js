// Handles search logic for checking if a phishing report already exists.
// Attached to the form in search.html and communicates with the /api/reports/check endpoint.

// Wait for the DOM to load before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the form and result container
  const form = document.getElementById('check-form');
  const resultContainer = document.getElementById('check-result');

  // Handle form submission to search for reports
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('query').value.trim();

    if (!query) {
      resultContainer.innerHTML = '<p class="text-warning">Please enter a subject or URL to search.</p>';
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/reports/check?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      // Display result if a matching report is found
      if (response.ok && data.found) {
        resultContainer.innerHTML = `
          <p class="text-danger">⚠️ This item has been reported before.</p>
          <p><strong>Subject:</strong> ${data.report.subject}</p>
          <p><strong>Reported Date:</strong> ${new Date(data.report.createdAt).toLocaleDateString()}</p>
        `;
      } 
      // Display message if no report matches the query
      else {
        resultContainer.innerHTML = '<p class="text-success">✅ No reports found for this subject or URL.</p>';
      }
    } 
    // Handle and log any errors during the fetch
    catch (err) {
      console.error('Search error:', err);
      resultContainer.innerHTML = '<p class="text-danger">❌ An error occurred while searching. Please try again.</p>';
    }
  });
});
