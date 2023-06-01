<?php

$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$conn = new mysqli('localhost','root','','login_signup');
if($conn->connect_error){
die('Connection Failed: '.$conn->connect_error);

}else{

$stmt=$conn->prepare("insert into login( email, password) 
values(?, ?)");

$stmt->bind_param("ss", $email, $hashedPassword);

$stmt->execute();

echo "registration Successfully...";

$stmt->close();
$conn->close();

}

?>
