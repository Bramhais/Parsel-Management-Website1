function validateForm() {
    const senderName = document.getElementById('senderName').value.trim();
    const receiverName = document.getElementById('receiverName').value.trim();
    const senderContact = document.getElementById('senderContact').value.trim();
    const receiverContact = document.getElementById('receiverContact').value.trim();
    const receiverPin = document.getElementById('receiverPin').value.trim();
    const parcelSize = document.getElementById('parcelSize').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    
    if (!/^[A-Za-z ]+$/.test(senderName) || !/^[A-Za-z ]+$/.test(receiverName)) {
        alert("Names should contain only letters and spaces.");
        return false;
    }

    if (!/^\d{10}$/.test(senderContact) || !/^\d{10}$/.test(receiverContact)) {
        alert("Enter a valid 10-digit contact number.");
        return false;
    }

    if (!/^\d{6}$/.test(receiverPin)) {
        alert("Enter a valid 6-digit PIN code.");
        return false;
    }

    // Calculate cost before submission
    calculateCost();
    let cost = document.getElementById("costDisplay").innerText.replace("Cost: $", "");

    // Show success message
    alert("Booking successfully submitted!");

    // Redirect to invoice page with booking details
    window.location.href = `invoice.html?sender=${senderName}&receiver=${receiverName}&cost=${cost}&date=${pickupDate}&time=${pickupTime}`;
    
    return false; // Prevent default form submission
}

document.getElementById("parcelForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let parcelData = {
        receiverName: document.getElementById("receiverName").value,
        receiverAddress: document.getElementById("receiverAddress").value,
        receiverPin: document.getElementById("receiverPin").value,
        receiverMobile: document.getElementById("receiverContact").value,
        parcelWeight: document.getElementById("parcelSize").value,
        parcelContents: document.getElementById("parcelDescription").value,
        deliveryType: document.getElementById("deliverySpeed").value,
        packingPreference: document.getElementById("packaging").value,
        pickupTime: document.getElementById("pickupDate").value + " " + document.getElementById("pickupTime").value,
        dropoffTime: "TBD",
        serviceCost: document.getElementById("costDisplay").innerText.replace("Cost: $", ""),
        paymentTime: "TBD"
    };

    localStorage.setItem("parcelInvoice", JSON.stringify(parcelData));

    // Redirect to invoice.html
    window.location.href = "invoice.html";
});

document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default navigation

    let confirmLogout = confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
        // Clear session storage or authentication tokens
        localStorage.clear(); // Clear stored user data
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = "/user/loginindex.html";
    }
});
