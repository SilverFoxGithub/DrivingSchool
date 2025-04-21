<?php
include '../db/db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 0) {
        echo "Email not found!";
        exit();
    }

    // Generate a reset token
    $token = bin2hex(random_bytes(50));
    $stmt = $conn->prepare("UPDATE users SET reset_token = ? WHERE email = ?");
    $stmt->bind_param("ss", $token, $email);
    $stmt->execute();

    // Send email with reset link (Replace with actual email sending logic)
    $resetLink = "http://localhost/NewDrivingSchoolSystem/dashboard/reset_password.html?token=$token";
    echo "Password reset link: <a href='$resetLink'>$resetLink</a>";

    $stmt->close();
    $conn->close();
}
?>