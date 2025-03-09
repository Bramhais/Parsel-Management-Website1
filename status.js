document.addEventListener("DOMContentLoaded", function () {
    loadAllPackages();
    
    // Search button event listener
    document.getElementById("searchBtn").addEventListener("click", function () {
        let bookingId = document.getElementById("bookingId").value.trim();
        if (bookingId === "") {
            alert("Please enter a Booking ID.");
            return;
        }
        searchPackage(bookingId);
    });
    
    // Update status button event listener
    document.getElementById("updateStatusBtn").addEventListener("click", function() {
        let bookingId = document.getElementById("bookingId").value.trim();
        let newStatus = document.getElementById("statusSelect").value;
        updatePackageStatus(bookingId, newStatus);
    });
});

// Initial package data (simulated database)
let packagesData = [
    { bookingId: "B123", customerId: "C001", weight: "2kg", deliveryType: "Express", status: "Picked up" },
    { bookingId: "B124", customerId: "C002", weight: "1.5kg", deliveryType: "Standard", status: "Delivered" },
    { bookingId: "B125", customerId: "C003", weight: "3kg", deliveryType: "Express", status: "In Transit" },
    { bookingId: "B126", customerId: "C004", weight: "5kg", deliveryType: "Express", status: "Returned" },
    { bookingId: "B127", customerId: "C005", weight: "1kg", deliveryType: "Standard", status: "Picked up" }
];

// Function to load all packages
function loadAllPackages() {
    let tableBody = document.querySelector("#packageTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows
    
    // Sort by booking ID (newest first)
    packagesData.sort((a, b) => b.bookingId.localeCompare(a.bookingId));
    
    packagesData.forEach(pkg => {
        let row = document.createElement("tr");
        
        // Determine status class for color coding
        let statusClass = getStatusClass(pkg.status);
        
        row.innerHTML = `
            <td>${pkg.bookingId}</td>
            <td>${pkg.customerId}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.deliveryType}</td>
            <td class="${statusClass}">${pkg.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search for a specific package
function searchPackage(bookingId) {
    let result = packagesData.find(pkg => pkg.bookingId === bookingId);
    let statusDiv = document.getElementById("statusResult");
    let updateContainer = document.getElementById("statusUpdateContainer");
    
    if (result) {
        // Show the package details
        let statusClass = getStatusClass(result.status);
        
        statusDiv.innerHTML = `
            <p><strong>Booking ID:</strong> ${result.bookingId}</p>
            <p><strong>Customer ID:</strong> ${result.customerId}</p>
            <p><strong>Parcel Weight:</strong> ${result.weight}</p>
            <p><strong>Delivery Type:</strong> ${result.deliveryType}</p>
            <p><strong>Current Status:</strong> <span class="${statusClass}">${result.status}</span></p>
        `;
        
        // Show the status update container
        updateContainer.style.display = "block";
        
        // Set the current status in the dropdown
        let statusSelect = document.getElementById("statusSelect");
        for (let i = 0; i < statusSelect.options.length; i++) {
            if (statusSelect.options[i].value === result.status) {
                statusSelect.selectedIndex = i;
                break;
            }
        }
    } else {
        statusDiv.innerHTML = "<p>No package found with the given Booking ID.</p>";
        updateContainer.style.display = "none";
    }
}

// Function to update a package status
function updatePackageStatus(bookingId, newStatus) {
    // Find the package in our data
    let packageIndex = packagesData.findIndex(pkg => pkg.bookingId === bookingId);
    
    if (packageIndex !== -1) {
        // Update the status
        packagesData[packageIndex].status = newStatus;
        
        // Show success message
        alert(`Status for package ${bookingId} has been updated to "${newStatus}".`);
        
        // Refresh the display
        searchPackage(bookingId);
        loadAllPackages();
    } else {
        alert("No package found with the given Booking ID.");
    }
}

// Helper function to get status class for color coding
function getStatusClass(status) {
    switch(status) {
        case "Picked up":
            return "status-picked-up";
        case "In Transit":
            return "status-in-transit";
        case "Delivered":
            return "status-delivered";
        case "Returned":
            return "status-returned";
        default:
            return "";
    }
}