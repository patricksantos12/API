<?php
if($_SERVER['REQUEST_METHOD'] = 'POST'){
	$output = shell_exec('python ../RpiConnect/textentry.py');
	echo $output;
}else{
	http_response_code(400);
}

$res = $_POST['res'];

$escaped_res = escapeshellarg($res);
$output = exec("python textentry.py $escaped_res");
echo $output;
?>
