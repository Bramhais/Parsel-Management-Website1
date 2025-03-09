

// Display username if stored in localStorage
document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username") || "User";
    document.getElementById("username").textContent = username;
});

// Logout function
function logoutUser() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("username");
        window.location.href = "../login.html";  // Redirect to login page
    }
}
