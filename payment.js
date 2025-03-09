document.addEventListener("DOMContentLoaded", function () {
    // Logout functionality
    document.getElementById("logout").addEventListener("click", function () {
        if (confirm("Are you sure you want to log out?")) {
            sessionStorage.clear();
            alert("Logout successful!");
            window.location.href = "../login.html";
        }
    });

    // Navigate to payment processing page
    document.getElementById("payNow")?.addEventListener("click", function () {
        window.location.href = "card_payment.html";
    });

    // Navigate back to booking service
    document.getElementById("backToHome")?.addEventListener("click", function () {
        window.location.href = "../booking_service/booking.html";
    });

    // Payment form validation and processing
    document.getElementById("cardForm")?.addEventListener("submit", function (event) {
        event.preventDefault();

        let cardNumber = document.getElementById("cardNumber").value.trim();
        let cardHolderName = document.getElementById("cardHolderName").value.trim();
        let expiryDate = document.getElementById("expiryDate").value.trim();
        let cvv = document.getElementById("cvv").value.trim();
        let errorMsg = document.getElementById("errorMsg");

        // Clear previous error messages
        errorMsg.innerText = "";

        // Validate Card Number (16 digits)
        if (!/^\d{16}$/.test(cardNumber)) {
            errorMsg.innerText = "Invalid Card Number! It must be 16 digits.";
            return;
        }

        // Validate Card Holder Name (not empty)
        if (cardHolderName === "") {
            errorMsg.innerText = "Card Holder Name cannot be empty.";
            return;
        }

        // Validate Expiry Date (MM/YY format and not expired)
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            errorMsg.innerText = "Invalid Expiry Date! Use MM/YY format.";
            return;
        }

        let [month, year] = expiryDate.split("/").map(Number);
        let currentYear = new Date().getFullYear() % 100;
        let currentMonth = new Date().getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            errorMsg.innerText = "Card Expired! Enter a valid expiry date.";
            return;
        }

        // Validate CVV (3 digits)
        if (!/^\d{3}$/.test(cvv)) {
            errorMsg.innerText = "Invalid CVV! It must be 3 digits.";
            return;
        }

        // Simulate payment processing
        let bookingID = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("bookingID", bookingID); // Store in localStorage for invoice

        alert(`Payment Successful!\nBooking ID: ${bookingID}`);
        window.location.href = "invoice.html";
    });
});