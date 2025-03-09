document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pickupForm").addEventListener("submit", function (event) {
        event.preventDefault();
        savePickupDetails();
    });
});

function searchBooking() {
    let bookingId = document.getElementById("bookingId").value.trim();

    if (!/^\d{12}$/.test(bookingId)) {
        alert("Enter a valid 12-digit Booking ID.");
        return;
    }

    // Simulating an API request (replace with actual database lookup)
    let mockData = {
        "123456789012": { customerName: "John Doe", status: "Pending Pickup" },
        "987654321098": { customerName: "Jane Smith", status: "Dispatched" }
    };

    if (mockData[bookingId]) {
        document.getElementById("customerName").textContent = mockData[bookingId].customerName;
        document.getElementById("parcelStatus").textContent = mockData[bookingId].status;
        document.getElementById("bookingDetails").style.display = "block";
    } else {
        alert("No booking found with the given ID.");
        document.getElementById("bookingDetails").style.display = "none";
    }
}

function savePickupDetails() {
    let pickupDate = document.getElementById("pickupDate").value;
    let pickupTime = document.getElementById("pickupTime").value;

    if (!pickupDate || !pickupTime) {
        alert("Please select both date and time.");
        return;
    }

    // Simulating saving data (replace with actual database saving)
    setTimeout(() => {
        document.getElementById("message").textContent = "Pickup details saved successfully!";
        document.getElementById("message").style.color = "green";
    }, 500);
}