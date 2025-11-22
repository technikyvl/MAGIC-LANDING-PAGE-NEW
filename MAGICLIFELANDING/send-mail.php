<?php
$to = "rafal@magiclife.pl"; // docelowy e-mail

$name    = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

$subject = "Nowa wiadomość z formularza Magic Life";
$body  = "Imię: $name\n";
$body .= "Email: $email\n\n";
$body .= "Wiadomość:\n$message\n";

$headers  = "From: Formularz Magic Life <no-reply@magiclife.pl>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

mail($to, $subject, $body, $headers);

echo "Dziękuję, wiadomość została wysłana.";

