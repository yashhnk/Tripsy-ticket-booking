// Redirect to login if user is not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "signin.html"; // Redirect to login page
});

// Set minimum date to today
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    document.querySelectorAll("input[type='date']").forEach(dateInput => {
        dateInput.setAttribute("min", formattedDate);
    });

    // Auto-scrolling offers carousel
    const track = document.querySelector(".offers-track");
    let currentPosition = 0;
    const speed = 0.8; // Adjust scrolling speed (lower is faster)

    function autoScroll() {
        currentPosition -= speed;
        if (currentPosition <= -track.scrollWidth / 2) {
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(autoScroll);
    }

    autoScroll();
});

// Search functionality
function searchTransport(type) {
    const from = document.getElementById(`${type}-from`).value.trim();
    const to = document.getElementById(`${type}-to`).value.trim();
    const date = document.getElementById(`${type}-date`).value.trim();

    if (!from || !to || !date) {
        alert("Please fill in all fields.");
        return;
    }

    // Encode user input for URL safety
    const formattedFrom = encodeURIComponent(from.toLowerCase());
    const formattedTo = encodeURIComponent(to.toLowerCase());
    const formattedDate = encodeURIComponent(date);

    // Redirect with parameters in URL
    window.location.href = `/public/searchresult.html?from=${formattedFrom}&to=${formattedTo}&date=${formattedDate}&type=${type}`;
}

// Copy Coupon Code Function
function copyCoupon(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`Coupon code ${code} copied to clipboard!`);
    }).catch(err => {
        console.error("Failed to copy coupon:", err);
    });
}
