
<?php
if($_SERVER['REQUEST_METHOD'] = 'POST'){
	$input = $_POST['inpuut'];
	$output = [];
	$return_var = 0;
	exec('python ../RpiConnect/testextentry.py', $output, $return_var);
	echo $output;
	if ($return_var = 0){
		header('Content-Type: application/json');
		echo json_encode(['result' => $output]);
	}else{
		header('HTTP/1.1 500 Internal Server Error');
		header('Content-Type: application/json');
		echo json_encode(['error' => 'Failed to execute Python script']);
	}
}
?>
