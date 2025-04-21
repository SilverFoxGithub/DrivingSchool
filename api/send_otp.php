<?php
header("Content-Type: application/json"); // Set response type to JSON

// Read and decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields are present
if (!isset($data['email']) || empty($data['email'])) {
    echo json_encode(["status" => "error", "message" => "Email address is required."]);
    exit;
}

//if (!isset($data['phone']) || empty($data['phone'])) {
//    echo json_encode(["status" => "error", "message" => "Phone number is required."]);
//    exit;
//}

// Assign values
$email = $data['email'];
$phone = isset($data['phone']) ? $data['phone'] : ''; // Optional use if needed later

// Initialize PHPMailer (Make sure you've included PHPMailer library)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

$mail = new PHPMailer(true);
try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'noreplymssb@gmail.com'; // Your Gmail address
    $mail->Password = 'ysnbdwtsvnfifkfp'; // Google App Password (no spaces)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email settings
    $mail->setFrom('noreplymssb@gmail.com', 'Your Name');
    $mail->addAddress($email); // Recipient email

    $mail->isHTML(true);
    $mail->Subject = "Your OTP Code";
    $otp = rand(100000, 999999); // Generate a random OTP
    $mail->Body = "Your OTP code is: <b>$otp</b>";

    if ($mail->send()) {
        echo json_encode(["status" => "success", "message" => "OTP sent successfully.", "otp" => $otp]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Mailer Exception: " . $e->getMessage()]);
}

?>