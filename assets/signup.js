// Function to send OTP
function sendOTP() {
    const email = document.querySelector("#email").value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    fetch("http://localhost/NewDrivingSchoolSystem/api/send_otp.php", { // Updated API path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            alert(result.message);
        } else {
            alert(result.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    });
}

// Function to check password strength
function checkPasswordStrength() {
    const password = document.querySelector("#password").value;
    const strengthText = document.querySelector("#password-strength");

    if (!password) {
        strengthText.textContent = "";
        return;
    }

    if (password.length < 8) {
        strengthText.textContent = "Weak (Min. 8 characters required)";
        strengthText.style.color = "red";
    } else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "green";
    }
}

// Function to handle signup
function handleSignup() {
    const fullName = document.querySelector("#full-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;
    const role = document.querySelector("#role").value;
    const otp = document.querySelector("#otp").value; // Added OTP field

    if (!fullName || !email || !password || !confirmPassword || !role || !otp) {
        alert("Please fill out all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    fetch("http://localhost/NewDrivingSchoolSystem/api/verify_otp.php", { // Updated API path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, confirmPassword, role, otp }), // Send OTP along with user details
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            alert(result.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    });
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const otpButton = document.querySelector("#send-otp");
    const passwordInput = document.querySelector("#password");
    const signupButton = document.querySelector("#signup-btn");

    if (otpButton) otpButton.addEventListener("click", sendOTP);
    if (passwordInput) passwordInput.addEventListener("keyup", checkPasswordStrength);
    if (signupButton) signupButton.addEventListener("click", handleSignup);
});