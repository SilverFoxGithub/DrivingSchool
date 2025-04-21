<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json");

try {
    require_once '../db/db_connect.php';

    if (!$conn) {
        throw new Exception("Database connection failed.");
    }

    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($email) || empty($password)) {
        throw new Exception("Email and password are required.");
    }

    $stmt = $conn->prepare("SELECT id, full_name, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];

            $redirectUrl = "";
            switch ($user['role']) {
                case 'student':
                    $redirectUrl = "dashboard/student.html";
                    break;
                case 'instructor':
                    $redirectUrl = "dashboard/instructor.html";
                    break;
                case 'admin':
                    $redirectUrl = "dashboard/admin.html";
                    break;
                default:
                    $redirectUrl = "index.html";
            }

            echo json_encode(["success" => "Login successful!", "redirect" => $redirectUrl]);
        } else {
            throw new Exception("Invalid email or password.");
        }
    } else {
        throw new Exception("User not found.");
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(["error" => $e->getMessage()]);
}
?>