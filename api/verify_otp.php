<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
session_start();
include 'db.php'; // Include your database connection file

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Invalid request method."]);
    exit;
}

// Retrieve form data from JSON input
$full_name = $data['full_name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$confirm_password = $data['confirm_password'] ?? '';
$role = $data['role'] ?? '';
$otp = $data['otp'] ?? '';

// Validate inputs
if (!$full_name || !$email || !$password || !$confirm_password || !$role || !$otp) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill out all fields."]);
    exit;
}

if ($password !== $confirm_password) {
    http_response_code(400);
    echo json_encode(["error" => "Passwords do not match."]);
    exit;
}

// Check if OTP exists for the email
$stmt = $conn->prepare("SELECT otp FROM otp_table WHERE email = ? ORDER BY created_at DESC LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "No OTP found for this email."]);
    exit;
}

$row = $result->fetch_assoc();
$stored_otp = $row['otp'];

if ($otp != $stored_otp) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid OTP."]);
    exit;
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insert user into the database
$stmt = $conn->prepare("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $full_name, $email, $hashed_password, $role);

if ($stmt->execute()) {
    // Delete OTP after successful signup
    $delete_stmt = $conn->prepare("DELETE FROM otp_table WHERE email = ?");
    $delete_stmt->bind_param("s", $email);
    $delete_stmt->execute();

    http_response_code(201);
    echo json_encode(["success" => "Signup successful!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Signup failed. Please try again."]);
}

$stmt->close();
$conn->close();
?>