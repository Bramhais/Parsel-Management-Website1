
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get username from localStorage (if available)
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('username').textContent = storedUsername;
    }
    
    // Logout functionality
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        // Clear any stored user data
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        // Redirect to login page
        window.location.href = '../login.html';
    });
    
    // Set minimum date for pickup to be tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    document.getElementById('pickupDate').min = tomorrowFormatted;
    
    // Calculate price based on form selections
    const calculatePrice = function() {
        // Get selected shipping option
        const shippingOption = document.querySelector('input[name="shippingOption"]:checked').value;
        let shippingPrice = 9.99; // Default standard price
        
        if (shippingOption === 'express') {
            shippingPrice = 14.99;
        } else if (shippingOption === 'priority') {
            shippingPrice = 24.99;
        }
        
        // Calculate base price based on parcel type and weight
        let basePrice = 0;
        const parcelType = document.getElementById('parcelType').value;
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        
        if (parcelType === 'document') {
            basePrice = 5.99;
        } else if (parcelType === 'small') {
            basePrice = 8.99 + (weight * 0.5);
        } else if (parcelType === 'medium') {
            basePrice = 12.99 + (weight * 0.75);
        } else if (parcelType === 'large') {
            basePrice = 18.99 + (weight * 1);
        } else if (parcelType === 'fragile') {
            basePrice = 25.99 + (weight * 1.5);
        }
        
        // Round to 2 decimal places
        basePrice = Math.round(basePrice * 100) / 100;
        const totalPrice = basePrice + shippingPrice;
        
        // Update the price display
        document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
        document.getElementById('shippingPrice').textContent = `$${shippingPrice.toFixed(2)}`;
        document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
    };
    
    // Add event listeners to recalculate price when selections change
    document.getElementById('parcelType').addEventListener('change', calculatePrice);
    document.getElementById('weight').addEventListener('input', calculatePrice);
    
    const shippingOptions = document.querySelectorAll('input[name="shippingOption"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', calculatePrice);
    });
    
    // Highlight shipping option when selected
    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove highlight from all options
            document.querySelectorAll('.shipping-option').forEach(el => {
                el.style.borderColor = '#ddd';
                el.style.backgroundColor = 'transparent';
            });
            
            // Add highlight to selected option
            this.closest('.shipping-option').style.borderColor = '#33ff33';
            this.closest('.shipping-option').style.backgroundColor = 'rgba(51, 255, 51, 0.1)';
        });
    });
    
    // Initially highlight the default selected shipping option
    document.querySelector('input[name="shippingOption"]:checked')
        .closest('.shipping-option').style.borderColor = '#33ff33';
    document.querySelector('input[name="shippingOption"]:checked')
        .closest('.shipping-option').style.backgroundColor = 'rgba(51, 255, 51, 0.1)';
    
    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to a server
        // For demo purposes, show an alert
        alert('Booking submitted successfully! A confirmation will be sent to your email.');
        
        // You could redirect to a confirmation page
        // window.location.href = 'booking-confirmation.html';
    });
    
    // Initial price calculation
    calculatePrice();
});

// document.getElementById("bookingForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent default form submission

//     const paymentMethod = document.getElementById("paymentMethod").value;
    
//     if (!paymentMethod) {
//         alert("Please select a payment method.");
//         return;
//     }

//     // Gather form data if needed
//     const formData = new FormData(this);

//     // Redirect to the payment page with query parameters (or send data via session storage)
//     let paymentURL = `payment.html?method=${paymentMethod}`;

//     window.location.href = "payment.html";
// });

document.addEventListener('DOMContentLoaded', function() {
    // Existing code for DOMContentLoaded...

    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const formData = new FormData(this);
        const totalPrice = document.getElementById('totalPrice').textContent;

        // Store the total price in localStorage or sessionStorage
        localStorage.setItem('totalPrice', totalPrice);

        // Redirect to the payment page
        window.location.href = '../payment/payment.html';
    });

    // Initial price calculation
    calculatePrice();
});

document.addEventListener("DOMContentLoaded", function () {
    const shippingOptions = document.querySelectorAll('input[name="shippingOption"]');
    const basePriceElement = document.getElementById("basePrice");
    const shippingPriceElement = document.getElementById("shippingPrice");
    const totalPriceElement = document.getElementById("totalPrice");

    let basePrice = 10.00; // Example base price (modify if needed)

    // Update base price display
    basePriceElement.textContent = `$${basePrice.toFixed(2)}`;

    function updateTotalPrice() {
        let selectedOption = document.querySelector('input[name="shippingOption"]:checked');
        let shippingCost = 0;

        if (selectedOption) {
            switch (selectedOption.value) {
                case "standard":
                    shippingCost = 9.99;
                    break;
                case "express":
                    shippingCost = 14.99;
                    break;
                case "priority":
                    shippingCost = 24.99;
                    break;
            }
        }

        // Update displayed shipping price
        shippingPriceElement.textContent = `$${shippingCost.toFixed(2)}`;

        // Calculate and update total price
        let totalPrice = basePrice + shippingCost;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Attach event listeners to shipping options
    shippingOptions.forEach(option => {
        option.addEventListener("change", updateTotalPrice);
    });

    // Call update function initially in case a default option is pre-selected
    updateTotalPrice();
});
