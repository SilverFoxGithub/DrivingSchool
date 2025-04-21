<?php
session_start();
require '../db/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debug: Print received POST data
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    
    // Check if OTP field exists
    if (!isset($_POST['otp']) || empty($_POST['otp'])) {
        die("OTP field is missing. Please ensure you entered the OTP.");
    }

    // Fetch form data
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);
    $role = trim($_POST['role']);
    $entered_otp = trim($_POST['otp']);

    // Debug: Print stored OTP from session
    if (!isset($_SESSION["otp"])) {
        die("Session OTP is missing. Ensure you requested an OTP.");
    }
    echo "Stored OTP: " . $_SESSION["otp"];

    // OTP validation
    if ($entered_otp !== $_SESSION["otp"]) {
        die("Invalid OTP. Please try again.");
    }

    // Password validation
    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $full_name, $email, $hashed_password, $role);

    if ($stmt->execute()) {
        echo "Registration successful!";
        unset($_SESSION["otp"]); // Remove OTP after successful registration
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>