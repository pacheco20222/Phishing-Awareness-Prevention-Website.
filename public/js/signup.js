// Handles user signup and 2FA setup.
// Sends user registration data to backend and displays a QR code and secret on success.
// Used in signup.html and communicates with /api/auth/signup.

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Reference the signup form and the result display container
  const form = document.getElementById('signup-form');
  const resultContainer = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data from the input fields
    const formData = {
      name: form.name.value,
      second_name: form.second_name.value,
      last_name: form.last_name.value,
      second_lastname: form.second_lastname.value,
      email: form.email.value,
      password: form.password.value,
      phone_number: form.phone_number.value,
      country: form.country.value,
      job: form.job.value
    };

    // Send a POST request with the form data to the backend
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // On success, show success message and 2FA QR code + secret
      if (response.ok) {
        resultContainer.innerHTML = `
          <p class="text-success"> ${data.msg}</p>
          <p>Scan this QR code with your 2FA app:</p>
          <img src="${data.qr}" alt="2FA QR Code" style="max-width: 200px;">
          <p><strong>Manual 2FA Secret:</strong> ${data.two_factor_secret}</p>
          <a href="/views/login.html" class="btn btn-success mt-3">Go to Login</a>
        `;
      } else {
        // Display any error messages returned from the server
        resultContainer.innerHTML = `<p class="text-danger"> ${data.msg || 'Signup failed.'}</p>`;
      }
    } catch (error) {
      // Handle any unexpected errors such as network issues
      console.error('Signup error:', error);
      resultContainer.innerHTML = `<p class="text-danger"> An error occurred. Please try again later.</p>`;
    }
  });
});
