<?php
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$api_key = "AIzaSyBYt7lczLeGw-O6-J0e5BeM3dCI9zFnyBs"; // Your Gemini API key

$data = json_decode(file_get_contents("php://input"), true);
$user_message = $data['message'] ?? '';

if (!$user_message) {
    error_log("No message received from the client.");
    echo json_encode(["response" => "No message received."]);
    exit;
}

$api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . $api_key;

$request_data = [
    "contents" => [
        [
            "parts" => [
                ["text" => $user_message]
            ]
        ]
    ]
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\n",
        "method" => "POST",
        "content" => json_encode($request_data),
    ],
];

$context = stream_context_create($options);
$response = @file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    error_log("API request failed. Check your API key or network connection.");
    echo json_encode(["response" => "API request failed. Check your API key or network connection."]);
    exit;
}

$response_data = json_decode($response, true);

if (isset($response_data['candidates'][0]['content']['parts'][0]['text'])) {
    $ai_reply = $response_data['candidates'][0]['content']['parts'][0]['text'];
    echo json_encode(["response" => $ai_reply]);
} else {
    error_log("Gemini service returned an unexpected response: " . print_r($response_data, true));
    echo json_encode(["response" => "AI service returned an unexpected response.", "debug" => $response_data]);
}
?>