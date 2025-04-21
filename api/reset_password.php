<?php
include '../db/db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    $newPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // Verify token and update password
    $stmt = $conn->prepare("SELECT id FROM users WHERE reset_token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 0) {
        echo "Invalid or expired reset token!";
        exit();
    }

    $stmt->bind_result($userId);
    $stmt->fetch();
    $stmt->close();

    $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL WHERE id = ?");
    $stmt->bind_param("si", $newPassword, $userId);
    if ($stmt->execute()) {
        echo "Password updated successfully! <a href='../index.html'>Login Here</a>";
    } else {
        echo "Error updating password!";
    }

    $stmt->close();
    $conn->close();
}
?>