// Script for handling user account deletion.
// Requires the user to be authenticated and confirms before sending a DELETE request.
// Attached to the "delete-account" button in profile.html.

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the user's token from localStorage
  const token = localStorage.getItem("token");

  // Redirect to login if no token is present
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  // Find the delete button on the page
  const deleteButton = document.getElementById("delete-account");

  // Attach click handler to delete button if it exists
  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      // Ask the user to confirm the deletion action
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        try {
          // Send DELETE request to backend API to delete the user account
          const response = await fetch(`http://localhost:3000/api/auth/delete/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          // Handle successful deletion response
          if (response.ok) {
            alert(result.msg || "Account deleted successfully.");
            localStorage.clear();
            window.location.href = "/views/login.html";
          } else {
            // Handle unsuccessful deletion response
            alert(result.msg || "Failed to delete account.");
          }
        } catch (error) {
          // Handle fetch or server errors
          console.error("Error deleting account:", error);
          alert("An error occurred while attempting to delete the account.");
        }
      }
    });
  }
});