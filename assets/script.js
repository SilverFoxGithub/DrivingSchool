// Select elements
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const confirmMessage = document.getElementById('confirm-message');
const signupButton = document.getElementById('signup-btn');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');
const otpInput = document.getElementById('otp');
const responseMessage = document.getElementById('response-message'); // Element to display server response

// Password rule elements
const lengthRule = document.getElementById('length');
const lettersNumbersRule = document.getElementById('letters-numbers');
const specialCharRule = document.getElementById('special-char');

// Validation functions
function validatePassword(password) {
    const lengthValid = password.length >= 8;
    const lettersNumbersValid = /[A-Za-z]/.test(password) && /\d/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);

    // Update rule status
    lengthRule.classList.toggle('valid', lengthValid);
    lettersNumbersRule.classList.toggle('valid', lettersNumbersValid);
    specialCharRule.classList.toggle('valid', specialCharValid);

    return lengthValid && lettersNumbersValid && specialCharValid;
}

function checkPasswordMatch() {
    if (passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '') {
        confirmMessage.classList.add('hidden');
        return true;
    } else {
        confirmMessage.classList.remove('hidden');
        return false;
    }
}

// Enable/Disable signup button based on validation
function updateSignupButtonState() {
    const isPasswordValid = validatePassword(passwordInput.value);
    const isMatch = checkPasswordMatch();
    signupButton.disabled = !(isPasswordValid && isMatch);
}

// Event listeners for password validation
passwordInput.addEventListener('input', updateSignupButtonState);
confirmPasswordInput.addEventListener('input', updateSignupButtonState);

// Handle sign-up button click
signupButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission (if inside a form)

    // Ensure all fields are filled
    if (
        !fullNameInput.value ||
        !emailInput.value ||
        !passwordInput.value ||
        !confirmPasswordInput.value ||
        !roleInput.value ||
        !otpInput.value
    ) {
        responseMessage.textContent = "Please fill in all fields.";
        responseMessage.style.color = "red";
        return;
    }

    // Prepare the request payload
    const formData = {
        full_name: fullNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        confirm_password: confirmPasswordInput.value,
        role: roleInput.value,
        otp: otpInput.value
    };

    // Send the request to verify_otp.php
    fetch("verify_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            responseMessage.textContent = "Signup successful! Redirecting...";
            responseMessage.style.color = "green";
            setTimeout(() => window.location.href = "dashboard.php", 2000); // Redirect after success
        } else {
            responseMessage.textContent = data.message || "OTP verification failed.";
            responseMessage.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        responseMessage.textContent = "An error occurred. Please try again.";
        responseMessage.style.color = "red";
    });
});