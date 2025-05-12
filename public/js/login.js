// Script for handling user login and 2FA verification.
// Communicates with backend API at /api/auth/login and stores user session in localStorage.

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Reference to the login form and result container for displaying messages
  const form = document.getElementById('login-form');
  const resultContainer = document.getElementById('result') || document.createElement('div');

  if (!document.getElementById('result')) {
    resultContainer.id = 'result';
    form.appendChild(resultContainer);
  }

  // Attach a submit event handler to the form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prepare login data including 2FA token
    const loginData = {
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      twoFactorToken: form['2fa'].value.trim()
    };

    // Send login request to the backend API
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      // If login is successful, store token and user info, then redirect to profile
      if (response.ok) {
        resultContainer.innerHTML = `<p class="text-success">${data.msg || 'Login successful!'}</p>`;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = '/views/profile.html';
        }, 1000);
      // If login fails, display error message
      } else {
        resultContainer.innerHTML = `<p class="text-danger">${data.msg || 'Login failed.'}</p>`;
      }
    // Handle unexpected errors such as network issues
    } catch (error) {
      console.error('Login error:', error);
      resultContainer.innerHTML = `<p class="text-danger">An error occurred. Please try again later.</p>`;
    }
  });
});
