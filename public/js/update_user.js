// Script for displaying and updating user profile information.
// Fetches the current user's data and populates the form.
// Submits updates to the backend using a PUT request and handles the result.
// Requires the user to be authenticated with a valid token.

document.addEventListener("DOMContentLoaded", () => {
  // Get the authentication token from localStorage
  const token = localStorage.getItem('token');

  // Redirect to login page if token is not found
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  // Fetch current user profile data and populate the page and form fields
  fetch("http://localhost:3000/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const user = data.user;
      localStorage.setItem('user', JSON.stringify(user));

      document.getElementById('profile-details').innerHTML = `
        <p><strong>Name:</strong> ${user.name} ${user.second_name || ''} ${user.last_name} ${user.second_lastname || ''}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone_number || 'N/A'}</p>
        <p><strong>Country:</strong> ${user.country || 'N/A'}</p>
        <p><strong>Job:</strong> ${user.job || 'N/A'}</p>
      `;

      document.getElementById('email').value = user.email;
      document.getElementById('phone_number').value = user.phone_number;
      document.getElementById('job').value = user.job;
      document.getElementById('country').value = user.country;
    });

  // Attach submit handler to the update form
  document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    // Collect updated user data from the form fields
    const updateData = {
      email: document.getElementById('email').value,
      phone_number: document.getElementById('phone_number').value,
      job: document.getElementById('job').value,
      country: document.getElementById('country').value
    };

    // Send updated data to backend using a PUT request
    const res = await fetch(`http://localhost:3000/api/auth/update/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    const result = await res.json();
    const message = result.msg || 'Update failed.';
    document.getElementById('update-result').textContent = message;

    // If update is successful, refresh localStorage and reload the page
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(result.user));
      setTimeout(() => {
        location.reload();
      }, 800);
    }
    // Handle failed update attempts
    else {
      // You can add additional error handling here if needed
    }
  });
});