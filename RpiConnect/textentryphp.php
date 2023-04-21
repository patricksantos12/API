<?php

$res = $_GET['res'];

$result = shell_exec("python textentry.py " . escapeshellarg($res));

echo $result;

?>
