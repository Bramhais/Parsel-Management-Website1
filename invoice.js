document.addEventListener("DOMContentLoaded", function () {
    let parcelData = JSON.parse(localStorage.getItem("parcelInvoice"));

    if (parcelData) {
        document.getElementById("receiverName").textContent = parcelData.receiverName;
        document.getElementById("receiverAddress").textContent = parcelData.receiverAddress;
        document.getElementById("receiverPin").textContent = parcelData.receiverPin;
        document.getElementById("receiverMobile").textContent = parcelData.receiverMobile;
        document.getElementById("parcelWeight").textContent = parcelData.parcelWeight;
        document.getElementById("parcelContents").textContent = parcelData.parcelContents;
        document.getElementById("deliveryType").textContent = parcelData.deliveryType;
        document.getElementById("packingPreference").textContent = parcelData.packingPreference;
        document.getElementById("pickupTime").textContent = parcelData.pickupTime;
        document.getElementById("dropoffTime").textContent = parcelData.dropoffTime;
        document.getElementById("serviceCost").textContent = parcelData.serviceCost;
        document.getElementById("paymentTime").textContent = parcelData.paymentTime;
    } else {
        console.log("No parcel data found.");
    }
});