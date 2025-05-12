// Script to handle submission of phishing reports via the report.html form.
// Sends a POST request to the backend with the provided subject, details, and URL.
// Requires a valid user token stored in localStorage for authentication.

// Wait until the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Grab references to the form and the result container
  const form = document.getElementById('report-form');
  const resultContainer = document.getElementById('report-result');

  // Handle the form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extract values from input fields and trim whitespace
    const subject = document.getElementById('subject').value.trim();
    const details = document.getElementById('details').value.trim();
    const url = document.getElementById('url').value.trim();
    // Ensure the user is logged in by checking for a token
    const token = localStorage.getItem('token');

    if (!token) {
      resultContainer.innerHTML = '<p class="text-warning">You must be logged in to submit a report.</p>';
      return;
    }

    // Send the POST request to the backend with the report data
    try {
      const response = await fetch('http://localhost:3000/api/reports/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, details, url })
      });

      const data = await response.json();

      // Display a success message if the report is created
      if (response.ok) {
        resultContainer.innerHTML = `<p class="text-success">${data.msg}</p>`;
        form.reset();
      } else {
        // Display an error message if the report failed
        resultContainer.innerHTML = `<p class="text-danger">${data.msg || 'Failed to submit report.'}</p>`;
      }
    } 
    // Handle and log any network or unexpected errors
    catch (error) {
      console.error('Report submission error:', error);
      resultContainer.innerHTML = '<p class="text-danger">An error occurred. Please try again later.</p>';
    }
  });
});
