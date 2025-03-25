document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);

    // Extract booking details from URL or localStorage
    const bookingDetails = {
        type: params.get("type") || "Not Specified",
        name: params.get("name") || "Not Specified",
        from: params.get("from") || "Not Specified",
        to: params.get("to") || "Not Specified",
        date: params.get("date") || "Not Specified",
        time: params.get("time") || "Not Specified",
        duration: params.get("duration") || "Not Specified",
        price: params.get("price") || "0",
        meals: params.get("meals") || "No Meal Selected",
        seat: `S-${Math.floor(1 + Math.random() * 40)}`,
        bookingID: `TRP${Math.floor(10000 + Math.random() * 90000)}` // Generate a unique Booking ID
    };

    // Store in localStorage for confirmation page
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

    // ✅ Fill in the Booking Details in the Payment Page
    document.getElementById("transport-type").textContent = bookingDetails.type;
    document.getElementById("from").textContent = bookingDetails.from;
    document.getElementById("to").textContent = bookingDetails.to;
    document.getElementById("date").textContent = bookingDetails.date;
    document.getElementById("time").textContent = bookingDetails.time;
    document.getElementById("seatNumber").textContent = bookingDetails.seat;
    document.getElementById("price").textContent = bookingDetails.price;
    document.getElementById("meals").textContent = bookingDetails.meals;
    document.getElementById("bookingID").textContent = bookingDetails.bookingID;

    // ✅ Set Price on "Pay Now" Button
    const payNowButton = document.getElementById("pay-now");
    payNowButton.innerHTML = bookingDetails.price;
    payNowButton.disabled = true; // Disable until payment method is selected

    let selectedPaymentMethod = null;

    // ✅ Handle Payment Method Selection
    document.querySelectorAll(".pay-btn").forEach(button => {
        button.addEventListener("click", function () {
            selectedPaymentMethod = this.getAttribute("data-method");

            // Remove selected class from all buttons & highlight the clicked one
            document.querySelectorAll(".pay-btn").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");

            // Enable the "Pay Now" button
            payNowButton.disabled = false;
        });
    });

    // ✅ Payment Button Click Functionality
    payNowButton.addEventListener("click", function () {
        if (!selectedPaymentMethod) return;

        // Show Confirmation Message
        document.getElementById("confirmation").classList.remove("hidden");

        // Redirect to Booking Confirmation after 2 Seconds
        setTimeout(() => {
            window.location.href = "/public/booking-confirmation.html";
        }, 2000);
    });
});
