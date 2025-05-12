// Displays the currently logged-in user's name in the navbar.
// Redirects to the login page if no valid token is present.
// Used in pages with dynamic greeting in the top navigation bar.
document.addEventListener("DOMContentLoaded", async () => {
  // Get token from localStorage to verify if user is logged in
  const token = localStorage.getItem("token");

  // Redirect unauthenticated users to login page
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    // Attempt to fetch user profile from the backend
    const response = await fetch("http://localhost:3000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // If token is invalid or expired, handle error
    if (!response.ok) {
      throw new Error("Token validation failed");
    }

    // Parse the user data from the API response
    const data = await response.json();
    const user = data.user;

    // If user data is valid, store it locally and update the navbar greeting
    if (user && user.name) {
      localStorage.setItem("user", JSON.stringify(user));
      const greeting = document.getElementById("user-greeting");
      if (greeting) {
        greeting.textContent = `👤 ${user.name}`;
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // On error, clear any stored credentials and redirect to login
    localStorage.clear();
    window.location.href = "/views/login.html";
  }
});