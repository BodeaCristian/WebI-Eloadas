<?php
header("Content-Type: application/json");
require "db.php";
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':  
        try {
      $stmt = $pdo->query("SELECT * FROM mozi ORDER BY id");
            $readData=$stmt->fetchAll();
            echo json_encode(['status' => 'Read success!', "readData"=>$readData]);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Read error!']);
        }
        break;
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO mozi (nev, varos, ferohely) VALUES (?, ?, ?)");
        $stmt->execute([$data['nev'], $data['varos'], (int)$data['ferohely']]);
            echo json_encode(['status' => 'Create success!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Create error!']);
        }
        break;
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE mozi SET nev=?, varos=?, ferohely=? WHERE id=?");
        $stmt->execute([$data['nev'], $data['varos'], (int)$data['ferohely'], $data['id']]);
            echo json_encode(['status' => 'Update success!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Update error!']);
        }
        break;

    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            $deleteEloadasStmt = $pdo->prepare("DELETE FROM eloadas WHERE moziid=?");
            $deleteEloadasStmt->execute([$id]);

            $stmt = $pdo->prepare("DELETE FROM mozi WHERE id=?");
            $stmt->execute([$data['id']]);

            echo json_encode(['status' => 'Delete success!']);
        }
        catch(PDOException $e) {
          echo json_encode(['status' => 'Delete error!']);
        }
        break;
}
