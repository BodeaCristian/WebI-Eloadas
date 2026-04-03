<?php
$host = "localhost";
$port = "3306";
$db   = "egyetem";
$user = "root";
$pass = "";
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=UTF8",$user,$pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}
