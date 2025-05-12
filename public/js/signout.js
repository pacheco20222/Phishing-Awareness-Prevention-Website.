// Handles user logout functionality.
// Displays the logout option if the user is logged in.
// Clears localStorage and redirects to login page upon logout.
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve stored token and user data from localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Get references to the logout menu item and link
    const logoutItem = document.getElementById("logout-item");
    const logoutLink = document.getElementById("logout-link");

    // Only show the logout option if all necessary elements and session data exist
    if (token && user && logoutItem && logoutLink) {
      logoutItem.style.display = "block";

      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Clear localStorage to sign the user out and redirect to login
        localStorage.clear();
        window.location.href = "/views/login.html";
      });
    }
  });