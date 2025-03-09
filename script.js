document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let mobile = document.getElementById("mobile").value;
            let userID = document.getElementById("userID").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let role = document.getElementById("role").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,30}$/;
            if (!passwordPattern.test(password)) {
                alert("Password must contain at least one uppercase, one lowercase, and one special character.");
                return;
            }

            let userData = { name, email, mobile, userID, password, role };
            localStorage.setItem(userID, JSON.stringify(userData));

            alert("Registration Successful!");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    }
});

function loginAsUser() {
    loginUser("customer");
}

function loginAsOfficer() {
    loginUser("officer");
}

function loginUser(role) {
    let loginUserID = document.getElementById("loginUserID").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let storedData = localStorage.getItem(loginUserID);

    if (storedData) {
        let userData = JSON.parse(storedData);

        if (loginPassword === userData.password && userData.role === role) {
            alert("Login Successful!");
            window.location.href = role === "customer" ? "../customer/customerindex.html" : "../officer/officerindex.html";
        } else {
            document.getElementById("errorMessage").textContent = "Invalid credentials or role!";
        }
    } else {
        document.getElementById("errorMessage").textContent = "User not found. Please register first.";
    }
}

function togglePassword() {
    let passwordField = document.getElementById("loginPassword");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
