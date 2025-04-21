<?php
// Force session settings for persistence
ini_set('session.gc_maxlifetime', 3600); // Extend session to 1 hour
session_set_cookie_params(3600, "/"); // Ensure cookie works across subdirectories

// Start session (moved before headers)
session_start();

// Set security headers AFTER session starts
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");

// Debugging session data (check `php_error.log`)
error_log("Session ID: " . session_id());
error_log("User ID: " . ($_SESSION['user_id'] ?? 'Not Set'));
error_log("Role: " . ($_SESSION['role'] ?? 'Not Set'));

// Check if user is logged in
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    $_SESSION['redirect_url'] = $_SERVER['REQUEST_URI']; // Store redirect URL
    header("Location: login.php");
    exit();
}
?>