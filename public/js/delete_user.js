


document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  const deleteButton = document.getElementById("delete-account");

  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
          const response = await fetch(`http://localhost:3000/api/auth/delete/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (response.ok) {
            alert(result.msg || "Account deleted successfully.");
            localStorage.clear();
            window.location.href = "/views/login.html";
          } else {
            alert(result.msg || "Failed to delete account.");
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("An error occurred while attempting to delete the account.");
        }
      }
    });
  }
});