console.log("login.js has loaded!");

function login() {
    console.log("Login function is running!");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        console.error("Email or password is missing!");
        alert("Please enter both email and password.");
        return;
    }

    console.log(`Attempting login with email: ${email}`);

    fetch("api/login.php", { // Updated path
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Login successful:", data.success);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = data.redirect; // Redirect based on response
        } else {
            console.error("Login failed:", data.error);
            alert(data.error);
        }
    })
    .catch(error => {
        console.error("Network error:", error);
        alert("An error occurred during login. Please try again.");
    });
}