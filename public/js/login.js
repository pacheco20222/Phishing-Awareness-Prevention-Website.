document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const resultContainer = document.getElementById('result') || document.createElement('div');

  if (!document.getElementById('result')) {
    resultContainer.id = 'result';
    form.appendChild(resultContainer);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginData = {
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      twoFactorToken: form['2fa'].value.trim()
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        resultContainer.innerHTML = `<p class="text-success">${data.msg || 'Login successful!'}</p>`;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = '/views/profile.html';
        }, 1000);
      } else {
        resultContainer.innerHTML = `<p class="text-danger">${data.msg || 'Login failed.'}</p>`;
      }
    } catch (error) {
      console.error('Login error:', error);
      resultContainer.innerHTML = `<p class="text-danger">An error occurred. Please try again later.</p>`;
    }
  });
});
