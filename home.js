document.addEventListener('DOMContentLoaded', function() {
    // Get username from localStorage
    const currentUser = localStorage.getItem("currentUser");
    
    // Display username if available
    if (currentUser) {
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = currentUser;
        }
    }
    
    // Handle logout link
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear localStorage
            localStorage.removeItem("currentUser");
            
            // Redirect to login page
            window.location.href = "index.html"; // Change this to your login page filename
        });
    }
});
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "login.html";
});

// Display username
document.getElementById("username").innerText = localStorage.getItem("username") || "User";