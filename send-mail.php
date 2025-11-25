<?php
header('Content-Type: text/html; charset=utf-8');

$to = "rafal@magiclife.pl"; // docelowy e-mail

// Pobierz dane z POST
$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone   = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Tablica błędów
$errors = [];

// Walidacja imienia
if (empty($name)) {
    $errors[] = "Imię jest wymagane";
} elseif (strlen($name) < 2) {
    $errors[] = "Imię musi mieć co najmniej 2 znaki";
} elseif (!preg_match('/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/u', $name)) {
    $errors[] = "Imię może zawierać tylko litery";
}

// Walidacja emaila
if (empty($email)) {
    $errors[] = "Email jest wymagany";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Podaj poprawny adres email";
}

// Walidacja numeru telefonu
if (empty($phone)) {
    $errors[] = "Numer telefonu jest wymagany";
} else {
    // Usuń wszystkie znaki niebędące cyframi do walidacji
    $phoneDigits = preg_replace('/\D/', '', $phone);
    if (strlen($phoneDigits) < 9 || strlen($phoneDigits) > 15) {
        $errors[] = "Numer telefonu musi zawierać od 9 do 15 cyfr";
    } elseif (!preg_match('/^[0-9+\s()-]+$/', $phone)) {
        $errors[] = "Numer telefonu zawiera nieprawidłowe znaki";
    }
}

// Walidacja wiadomości
if (empty($message)) {
    $errors[] = "Wiadomość jest wymagana";
} elseif (strlen($message) < 10) {
    $errors[] = "Wiadomość musi mieć co najmniej 10 znaków";
}

// Jeśli są błędy, zwróć je
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Przygotuj treść wiadomości
$subject = "Nowa wiadomość z formularza Magic Life";
$body  = "Imię: " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n";
$body .= "Email: " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "\n";
$body .= "Numer telefonu: " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "\n\n";
$body .= "Wiadomość:\n" . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "\n";

// Przygotuj nagłówki
$headers  = "From: Formularz Magic Life <no-reply@magiclife.pl>\r\n";
$headers .= "Reply-To: " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Wyślij email
$mailSent = mail($to, $subject, $body, $headers);

if ($mailSent) {
    http_response_code(200);
    echo "Dziękuję, wiadomość została wysłana.";
} else {
    http_response_code(500);
    echo "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.";
}

