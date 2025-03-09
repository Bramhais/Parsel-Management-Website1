document.addEventListener("DOMContentLoaded", () => {
    loadShippedPackages();
});

function loadShippedPackages() {
    // Simulated Data (This should come from your backend/database)
    const packages = [
        { bookingId: "BK12345", customerId: "CUST001", status: "Shipped", lastUpdate: "2025-03-01 12:00 PM" },
        { bookingId: "BK12346", customerId: "CUST002", status: "In Transit", lastUpdate: "2025-03-01 03:30 PM" },
        { bookingId: "BK12347", customerId: "CUST003", status: "Delivered", lastUpdate: "2025-02-28 05:45 PM" },
    ];

    let trackingTable = document.getElementById("trackingTable");
    trackingTable.innerHTML = ""; // Clear table before loading

    packages.forEach(pkg => {
        let row = `<tr>
            <td>${pkg.bookingId}</td>
            <td>${pkg.customerId}</td>
            <td>${pkg.status}</td>
            <td>${pkg.lastUpdate}</td>
        </tr>`;
        trackingTable.innerHTML += row;
    });
}

function searchPackage() {
    let customerId = document.getElementById("customerId").value.trim();
    let bookingId = document.getElementById("bookingId").value.trim();

    if (customerId === "" && bookingId === "") {
        alert("Please enter either Customer ID or Booking ID to search.");
        return;
    }

    // Simulated Data (In real use, fetch from backend)
    const packages = [
        { bookingId: "BK12345", customerId: "CUST001", status: "Shipped", lastUpdate: "2025-03-01 12:00 PM" },
        { bookingId: "BK12346", customerId: "CUST002", status: "In Transit", lastUpdate: "2025-03-01 03:30 PM" },
        { bookingId: "BK12347", customerId: "CUST003", status: "Delivered", lastUpdate: "2025-02-28 05:45 PM" },
    ];

    let trackingTable = document.getElementById("trackingTable");
    trackingTable.innerHTML = ""; // Clear table before displaying results

    let filteredPackages = packages.filter(pkg => 
        (customerId && pkg.customerId === customerId) || (bookingId && pkg.bookingId === bookingId)
    );

    if (filteredPackages.length > 0) {
        filteredPackages.forEach(pkg => {
            let row = `<tr>
                <td>${pkg.bookingId}</td>
                <td>${pkg.customerId}</td>
                <td>${pkg.status}</td>
                <td>${pkg.lastUpdate}</td>
            </tr>`;
            trackingTable.innerHTML += row;
        });
    } else {
        trackingTable.innerHTML = "<tr><td colspan='4'>No records found.</td></tr>";
    }
}