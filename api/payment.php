<?php
include '../db/db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $amount = $_POST['amount'];
    $status = $_POST['status'];
    $payment_method = $_POST['payment_method'];

    $stmt = $conn->prepare("INSERT INTO payments (user_id, amount, status, payment_method) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("idss", $user_id, $amount, $status, $payment_method);

    if ($stmt->execute()) {
        echo "Payment recorded successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>