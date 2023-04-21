<?php
if($_SERVER['REQUEST_METHOD'] = 'POST'){
	$output = shell_exec('python /home/cisco/Desktop/PLATONIXSYSTEM/pLaTOnIXapi.py');
	echo $output;
}else{
	http_response_code(400);
}
?>
